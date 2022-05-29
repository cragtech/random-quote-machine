import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Quote, Twitter } from 'react-bootstrap-icons';
function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [statusText, setStatusText] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [qbInsetColor, setQbInsetColor] = useState('');

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

  const getRandomColorScheme = () => {
    const colorArr = [
      ['#F984EF', '#CA2C91'],
      ['#C636FF', '#720B97'],
      ['#177BD2', '#000073'],
      ['#A62C2B', '#FF0000'],
      ['#B8D53D', '#0D5B11'],
      ['#FF9D00', '#FF5E01'],
      ['#FEFE33', '#FFBB00'],
      ['#A9FBA3', '#48BF92'],
    ];

    let randomNum = Math.floor(Math.random() * colorArr.length);

    if (bgColor === colorArr[randomNum][0]) {
      getRandomColorScheme();
    } else {
      setBgColor(colorArr[randomNum][0]);
      setQbInsetColor(colorArr[randomNum][1]);
    }

  }

  useEffect(()=> {
    getRandomQuoteData();
    getRandomColorScheme();
  }, [])

  return (
    <div
      className="App"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div id="app-title">Random Quote Machine</div>
      <div id="quote-box" style={{ color: qbInsetColor }}>
        <div id="text-author-box">
          <span id="text-box">
            <Quote className="first-quote-icon" size={40}/>
            <div id="text">{quote}</div>
            <Quote className="last-quote-icon" size={40}/>
            </span>
        <div id="author">- {author} </div>
        </div>
        <div id="btn-box">
          <a href="twitter.com/intent/tweet">
              <button
                id="tweet-quote"
                style={{ backgroundColor: qbInsetColor }}
              >
                <Twitter className="twitter-icon" size={30}/>
              </button>
          </a>
          <button
            id="new-quote"
            style={{ backgroundColor: qbInsetColor }}
            onClick={() => {
              getRandomQuoteData()
              getRandomColorScheme()
            }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
