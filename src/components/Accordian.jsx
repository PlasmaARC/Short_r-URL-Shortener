import { useState } from "react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //Need to change the questions and answers.
  const accordionItems = [
    {
      question: "What is Material Tailwind?",
      answer:
        "Material Tailwind is a framework that enhances Tailwind CSS with additional styles and components.",
    },
    {
      question: "How to use Material Tailwind?",
      answer:
        "You can use Material Tailwind by importing its components into your Tailwind CSS project.",
    },
    {
      question: "What can I do with Material Tailwind?",
      answer:
        "Material Tailwind allows you to quickly build modern, responsive websites with a focus on design.",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto ">
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-slate-200">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center py-5 text-white"
          >
            <span>{item.question}</span>
            <span className="text-slate-800 transition-transform duration-300">
              {openIndex === index ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#fff"
                  className="w-4 h-4"
                >
                  <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#fff"
                  className="w-4 h-4"
                >
                  <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                </svg>
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-40" : "max-h-0"
            }`}
          >
            <div className="pb-5 text-sm text-white">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
