import { useState } from "react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //Need to change the questions and answers.
  const accordionItems = [
    {
      question: "What is Short_r?",
      answer:
        "Short_r is a simple and fast URL shortener that helps you shorten long URLs for easier sharing and management.",
    },
    {
      question: "How does Short_r work?",
      answer:
        "You can shorten any URL by pasting it into the Short_r app, and it will generate a unique, short URL for easy sharing.",
    },
    // {
    //   question: "What are the benefits of using Short_r?",
    //   answer:
    //     "Short_r makes sharing links more convenient, keeps URLs neat, and helps track link performance with analytics.",
    // },
    // {
    //   question: "Can I customize my Short_r links?",
    //   answer:
    //     "Yes! With Short_r, you can create custom short links to match your brand or purpose.",
    // },
    {
      question: "Is Short_r free to use?",
      answer:
        "Yes, Short_r offers a free version with basic features. Premium plans are available for advanced features.",
    },
    // {
    //   question: "Can Short_r track my link’s performance?",
    //   answer:
    //     "Absolutely! Short_r provides analytics to track how many clicks your link received and from where.",
    // },
    // {
    //   question: "How can I access my shortened links on Short_r?",
    //   answer:
    //     "You can access your shortened links directly from the dashboard or through your account profile.",
    // },
    // {
    //   question: "Is Short_r secure to use?",
    //   answer:
    //     "Yes, Short_r uses secure protocols to ensure the safety of your data and the links you share.",
    // },
    // {
    //   question: "Can I use Short_r for business purposes?",
    //   answer:
    //     "Yes, Short_r is perfect for businesses, allowing you to create branded short links and analyze link engagement.",
    // },
    {
      question: "How do I get started with Short_r?",
      answer:
        "Simply sign up on Short_r, paste the link you want to shorten, and start sharing it instantly.",
    },
  ];

  return (
    <>
      <span className="text-2xl font-bold">Frequently Asked Questions</span>
      <div className="w-full max-w-md mx-auto rounded-lg ">
        {accordionItems.map((item, index) => (
          <div key={index} className="border-b mb-1 border-amber-400 bg-gray-50 rounded-lg shadow px-1 ">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-5 text-black"
            >
              <span className="text-red-700">{item.question}</span>
              <span className="text-slate-800 transition-transform duration-300">
                {openIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="#000"
                    className="w-4 h-4"
                  >
                    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="#000"
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
              <div className="pb-5 text-sm text-gray-600">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accordion;
