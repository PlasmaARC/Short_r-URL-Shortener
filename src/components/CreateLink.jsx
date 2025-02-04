import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { createUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { QRCode } from "react-qrcode-logo";
import Error from "./Error";
import { BeatLoader } from "react-spinners";
import { UrlState } from "@/context";

const CreateLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errors, setErrors] = useState({});

  const ref = useRef(); // I am using it to refrence the QR
  const { user } = UrlState();
  const navigate = useNavigate();
  const longLink = searchParams.get("createNew");

  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  useEffect(() => {
    if (longLink) {
      setIsOpen(true);
      setFormValues((prevValues) => ({
        ...prevValues,
        longUrl: longLink,
      }));
    }
  }, [longLink]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  //API call to fetch all the required details
  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {
    ...formValues,
    user_id: user.id,
  });

  useEffect(() => {
    if (!error && data?.length > 0) {
      setIsOpen(false); // Close modal after success
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data, navigate]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-700 text-white rounded-md shadow-lg shadow-black"
      >
        Create New Link
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50">
          <div className="bg-gray-50 p-6 rounded-lg shadow-xl max-w-md w-full ">
            <h2 className="text-2xl font-bold mb-4">Create New</h2>

            {formValues.longUrl && (
              <QRCode size={250} value={formValues.longUrl} ref={ref} />
            )}

            <input
              id="title"
              placeholder="Short Link's Title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-2"
            />
            {errors.title && <Error message={errors.title} />}

            <input
              id="longUrl"
              placeholder="Enter your long URL"
              value={formValues.longUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-2"
            />
            {errors.longUrl && <Error message={errors.longUrl} />}

            <div className="flex items-center gap-2 mt-2">
              <span className="p-2 border rounded">localhost</span> /
              <input
                id="customUrl"
                placeholder="Custom Link (optional)"
                value={formValues.customUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {error && (
              <Error message="Failed to create URL. Please try again." />
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchParams({});
                }}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={createNewLink}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
              >
                {loading ? <BeatLoader size={10} color="white" /> : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateLink;
