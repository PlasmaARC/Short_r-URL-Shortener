import CreateLink from "@/components/CreateLink";
import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";

import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url?.id)
  );

  useEffect(() => {
    fnUrls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //The functionality to filter out the search
  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls?.length]);

  return (
    <>
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#fff" />}

      <div className="m-2 bg-slate-50 h-[150px] flex p-2 justify-between items-center gap-3 s ">
        <div className="border border-white w-[50%]  h-full text-center rouned-lg bg-red-900 text-white flex flex-col items-center justify-center shadow-lg shadow-black">
          <div className="text-xl font-bold underline ">Links Created</div>
          <div>
            <p className="font-bold">{urls?.length}</p>
          </div>
        </div>
        <div className="border border-white w-[50%]  h-full text-center rouned-lg bg-red-900 text-white flex flex-col items-center justify-center shadow-lg shadow-black">
          <div className="text-xl font-bold underline">Total Clicks</div>
          <div >
            <p className="font-bold">{clicks?.length}</p>
          </div>
        </div>
      </div>

      <div className=" p-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Links</h1>
        {/* A button to create a Link and can be made a component with a dialog box */}
        {/* <button className="px-3 py-2 bg-red-800 text-white rounded-lg font-bold ">
          Create a Link
        </button> */}
        <CreateLink />
      </div>

      {/* Creating a Filter */}
      <div className="m-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full border-1 border-red-400 rounded-md p-2 text-black shadow-2xl "
        />
        {error && <Error message={error.message} />}
        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
      {/* <LinkCard /> */}
    </>
  );
};

export default Dashboard;
