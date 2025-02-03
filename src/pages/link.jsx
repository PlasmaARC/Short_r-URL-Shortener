import { UrlState } from "@/context";

import { getUrl,deleteUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Copy,Trash,Download } from "lucide-react";


const Link = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  const navigate = useNavigate();

  const { user } = UrlState();
  const { id } = useParams();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  // const {
  //   loading: loadingStats,
  //   data: stats,
  //   fn: fnStats,
  // } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrls);

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  useEffect(() => {
    fn();
  }, []);

  // useEffect(() => {
  //   if (!error && loading === false) fnStats();
  // }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  return (
    <>
      {loading && <BarLoader width={"100%"} color="#fff" />}
      <div className="flex justify-center items-center min-h-screen bg-amber-300">
        <div className="flex flex-col gap-8 sm:flex-row justify-between items-center bg-amber-300 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
            <span className="text-6xl font-extrabold hover:underline cursor-pointer">
              {url?.title?.toUpperCase()}
            </span>
            <a
              href={`https://trimrr.in/${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
            >
              https://trimrr.in/{link}
            </a>
            <a
              href={url?.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              {url?.original_url}
            </a>
            <span className="flex items-end font-extralight text-sm">
              {new Date(url?.created_at).toLocaleString()}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`https://trimrr.in/${link}`)
                }
              >
                <Copy />
              </button>
              <button onClick={downloadImage}>
                <Download />
              </button>
              <button
                onClick={() =>
                  fnDelete().then(() => {
                    navigate("/dashboard");
                  })
                }
              >
               
                  <Trash />
                
              </button>
            </div>

            <img
              src={url?.qr}
              className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
              alt="qr code"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Link;
