import { UrlState } from "@/context";

import { getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Copy,  Download } from "lucide-react";
import banner from "../assets/short_clip.png";

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


  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  useEffect(() => {
    fn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-2 bg-gray-100 p-5 shadow-2xl shadow-black">
        {/* Image Container */}
        <div className="w-full md:w-1/2">
          <img
            src={banner}
            alt="A banner"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details Card */}
        <div className="w-full md:w-auto max-w-md bg-amber-300 p-4 rounded-lg shadow-lg shadow-black">
          <div className="flex flex-col items-start gap-3">
            <span className="text-4xl md:text-6xl font-extrabold hover:underline cursor-pointer break-words whitespace-normal">
              {url?.title?.toUpperCase()}
            </span>
            <a
              href={`http://localhost:5173/${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl text-blue-500 font-bold hover:underline cursor-pointer break-words whitespace-normal"
            >
              https://shtr-one.vercel.app/{link}
            </a>
            <a
              href={url?.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline cursor-pointer text-red-500 break-words whitespace-normal"
            >
              {url?.original_url}
            </a>
            <span className="font-extralight text-sm break-words whitespace-normal">
              {new Date(url?.created_at).toLocaleString()}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`https://shtr-one.vercel.app/${link}`)
                }
              >
                <Copy />
              </button>
              <button onClick={downloadImage}>
                <Download />
              </button>
              
            </div>
            <img
              src={url?.qr}
              alt="qr code"
              className="w-32 md:w-48 ring ring-red-500 p-1 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Link;
