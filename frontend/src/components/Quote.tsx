import { useEffect, useState } from "react";
import axios from "axios";

type QuoteObject = {
  id: number;
  quote: string;
  author: string;
};

export const Quote = () => {
  const [quotes, setQuotes] = useState<QuoteObject[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/quotes");
        setQuotes(response.data.quotes);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 15000); // Show next quote every 15 seconds

    return () => clearInterval(interval);
  }, [quotes]);

  if (quotes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-200 px-4">
        <p className="text-lg text-gray-500"></p>
      </div>
    );
  }

  const currentQuote = quotes[currentIndex];

  return (
    <div className="h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="max-w-xl relative text-center">
        <p className="text-3xl font-semibold font-playwrite text-black mb-10">
          "{currentQuote.quote}"
        </p>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-700 text-base">
          - {currentQuote.author}
        </div>
      </div>
    </div>
  );
};
