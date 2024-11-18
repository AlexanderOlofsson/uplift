import { useState, useEffect } from 'react';
import './Quote.css';

function Quote() {
  const [quote, setQuote] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quotes/daily-quote`);
        if (!response.ok) {
          throw new Error('Failed to fetch the quote of the day.');
        }
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error('bad fetch quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="quoteContainer">
      {quote ? (
        <>
          <h3 className="quoteText">&quot;{quote.quote}&quot;</h3>
          <p className="quoteAuthor">- {quote.author}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Quote;
