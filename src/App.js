import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [statusText, setStatusText] = useState('');

  const getRandomQuoteData = () => {
    fetch('https://api.quotable.io/random')
      .then(res => {
        if (!res.ok) {
          //console.log(res)
          setStatus(res.status.toString());
          setStatusText(res.statusText.toString());
          throw Error('fetching reponse FAILED')
        }
        else {
          return res.json()
        }
      })
      .then(
        quoteObj => {
          setQuote(quoteObj['content']);
          setAuthor(quoteObj['author']);
          setError('');
          setStatus('');
          setStatusText('');
      })
      .catch(error => {
        console.log(error.message);
        setQuote(status);
        setAuthor(statusText);
      })
  }
  useEffect(()=> {
    getRandomQuoteData();
  }, [])

  return (
    <div className="App">
      <div id="quote-box">
        <div id="text">{quote}</div>
        <div id="author">{author}</div>
        <button
          id="new-quote"
          onClick={() => getRandomQuoteData()}
        >New Quote</button>
        <a href="twitter.com/intent/tweet">
          <button id="tweet-quote"> New Tweet</button>
        </a>
      </div>
    </div>
  );
}

export default App;
