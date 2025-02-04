import Accordion from "@/components/Accordian"
import banner from "../assets/banner_url.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const [longURL, setLongURL] = useState('')
  const navigate = useNavigate()
  const handleShortern = (e) =>{
    e.preventDefault()
    if(longURL) navigate(`/auth?createNew=${longURL}`)
  }
  return (
    <div className="flex flex-col items-center w-full ">
      <h2
      className="bg-gradient-to-r from-white via-[#E94A4A] to-[#FFF1F1] bg-clip-text text-transparent
       my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center font-extrabold">
        The Only URL Shortener <br /> you&rsquo;ll ever need!
      </h2>
      <div className="w-full flex flex-col justify-center items-center">
      <form 
      onSubmit={handleShortern}
      className=" sm:h-14 flex flex-col sm:flex-row w-full md:w-[75%] gap-2">
        <input
        value={longURL}
        onChange={(e)=> setLongURL(e.target.value)}
        className="w-full rounded-lg p-2 bg-white text-black border-2 border-red"
         type="url" placeholder="Enter your URL" />
        <button
        type="submit"
        disabled={!longURL}
        className="w-full sm:w-auto px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 bg-red-800 text-white font-bold rounded-md  "
        >Shortern!</button>
      </form>
      <img
      src={banner} alt="A banner" 
      className="w-full my-11 md:px-11"/>
      </div>
      <div>
        <Accordion/>
      </div>
    </div>
  )
}

export default LandingPage