import banner from "../assets/background.png"
import { useState } from "react"

const LandingPage = () => {
  const [input, setInput] = useState('')
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The Only URL Shortener <br /> you&rsquo;ll ever need!
      </h2>
      <div className="w-full flex flex-col justify-center items-center">
      <form className=" sm:h-14 flex flex-col sm:flex-row w-full md:w-[75%] gap-2">
        <input
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        className="w-full p-2 bg-white text-black border-2 border-red"
         type="url" placeholder="Enter your URL" />
        <button
        type="submit"
        disabled={!input}
        className="w-full sm:w-auto px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 bg-red-800 text-white font-bold rounded-md  "
        >Shortern!</button>
      </form>
      <img src={banner} alt="A banner" 
      className="w-full my-11 md:px-11"/>
      </div>
    </div>
  )
}

export default LandingPage