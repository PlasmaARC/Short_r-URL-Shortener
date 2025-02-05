import { Link } from "react-router-dom";
import { Copy, Download, Trash } from "lucide-react";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { deleteUrls } from "@/db/apiUrls";

/* eslint-disable react/prop-types */
const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    //Creating an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const {loading: loadingDelete, fn:fnDelete} = useFetch(deleteUrls, url.id)
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-white rounded-lg m-2 shadow-2xl shadow-black">
      <img
        className="h-32 object-contain ring ring-red-600 self-start"
        src={url.qr}
        alt="A QR Code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-bold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-500 font-bold hover:underline cursor-pointer">
        https://shtr-one.vercel.app/
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="text-sm text-red-500 font-bold hover:underline cursor-pointer ">
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <button
          onClick={() =>
            navigator.clipboard.writeText(`https://shtr-one.vercel.app/${url?.short_url}`)
          }
        >
          <Copy />
        </button>
        <button onClick={downloadImage}>
          <Download />
        </button>
        <button
         onClick={() => fnDelete().then(() => fetchUrls())}
        //  disable={loadingDelete}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </button>

      </div>
    </div>
  );
};

export default LinkCard;
