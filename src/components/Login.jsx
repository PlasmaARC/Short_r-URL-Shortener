import { login } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import Error from "./Error";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import logo from "../assets/black_logo.png"

const Login = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate("");

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Making a function to handle change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Using Custom Hook
  const { data, loading, error, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    console.log(data);
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  //Making a function for login Handle and using Yuo to validate data
  const handleLogin = async () => {
    //resetting all errors
    setErrors([]);
    try {
      //For the validation to work your input file should have the same anme as schema
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters")
          .required("Password is Required"),
      });

      await schema.validate(formData, { abortEarly: false });

      //api logic to call
      await fnLogin();

    } catch (e) {
      const newErrors = {};


      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <>
      <section className="bg-white min-h-[400px] rounded-md flex items-center justify-center px-4">
        <div className="w-full rounded-md p-4 bg-white ">
          <div className="space-y-4">
            <a
              href="#"
              className="flex items-center justify-center text-2xl font-semibold text-black "
            >
              <img
                className="w-50 h-20 object-cover mr-2"
                src={logo}
                alt="logo"
              />
              
            </a>
            <h1 className=" text-xl md:text-2xl font-bold text-black text-center">
              Sign in to your account
            </h1>
            <form className="space-y-6" action="#">
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
                  className="w-full p-2.5 border rounded-lg bg-none text-black  "
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
                  className="w-full p-2.5 border rounded-lg bg-none text-black"
                />
                {errors.password && <Error message={errors.password} />}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center text-gray-500 dark:text-gray-300">
                  <input type="checkbox" className="mr-2 w-4 h-4" /> Remember me
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleLogin}
                type="button"
                className="w-full py-2.5 text-white bg-black rounded-lg text-sm font-medium hover:bg-primary-700 focus:ring-2"
              >
                {loading ? <ClipLoader size={15} color="#fff" /> : "SignIn"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
