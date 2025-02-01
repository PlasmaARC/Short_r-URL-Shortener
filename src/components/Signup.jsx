import { signup } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import Error from "./Error";
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // Destructure the useFetch hook values
  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      // Create a FormData object and append form fields
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("profile_pic", formData.profile_pic);

      // Trigger the signup API call using the FormData object
      await fnSignup(form);
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <section className="bg-white min-h-[450px] rounded-md flex items-center justify-center px-4">
      <div className="w-full rounded-md p-4 bg-white">
        <div className="space-y-6">
          <a
            href="#"
            className="flex items-center justify-center text-2xl font-semibold text-black"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            My Company Name
          </a>
          <h1 className="text-xl md:text-2xl font-bold text-black text-center">
            Create a New Account
          </h1>
          <form className="space-y-6" action="#">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Enter Your Name
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="name"
                id="name"
                className="w-full p-2.5 border rounded-lg bg-gray-50 text-black "
                placeholder="eg: John Doe"
              />
              {errors.name && <Error message={errors.name} />}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Your email
              </label>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                id="email"
                className="w-full p-2.5 border rounded-lg bg-gray-50 text-black "
                placeholder="name@email.com"
              />
              {errors.email && <Error message={errors.email} />}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                onChange={handleInputChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="w-full p-2.5 border rounded-lg bg-gray-50 text-black "
              />
              {errors.password && <Error message={errors.password} />}
            </div>
            <div>
              <label
                htmlFor="profile_pic"
                className="block text-sm font-medium text-black"
              >
                Upload Your Profile Picture
              </label>
              <input
                onChange={handleInputChange}
                type="file"
                name="profile_pic"
                id="profile_pic"
                accept="image/*"
                className="w-full p-2.5 border rounded-lg bg-gray-50 text-black "
              />
              {errors.profile_pic && <Error message={errors.profile_pic} />}
            </div>
            <button
              onClick={handleSignup}
              type="button"
              className="w-full py-2.5 text-white bg-black rounded-lg text-sm font-medium hover:bg-primary-700 focus:ring-2"
            >
              {loading ? <ClipLoader size={15} color="#fff" /> : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
