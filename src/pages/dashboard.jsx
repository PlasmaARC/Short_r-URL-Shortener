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
  }, []);

  //The functionality to filter out the search
  const filteredUrls = urls?.filter((url) => 
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <>
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#fff" />}

      <div className="m-2 bg-white h-[200px] flex p-2 justify-between items-center gap-3">
        <div className="border w-[50%] h-full text-center rouned-lg bg-slate-100 text-black">
          <div>Links Created</div>
          <div>
            <p>{urls?.length}</p>
          </div>
        </div>
        <div className="border w-[50%] h-full text-center rouned-lg bg-slate-100 text-black">
          <div>Total Clicks</div>
          <div>
            <p>{clicks?.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-black flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Links</h1>
        {/* A button to create a Link and can be made a component with a dialog box */}
        {/* <button className="px-3 py-2 bg-red-800 text-white rounded-lg font-bold ">
          Create a Link
        </button> */}
        <CreateLink/>
        </div>

      {/* Creating a Filter */}
      <div>
        <input type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="w-full bg-white rounded-md p-2 text-black "
        />
        {error && <Error message={error.message}/>}
        {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
      </div>
     {/* <LinkCard /> */}
    </>
  );
};

export default Dashboard;
