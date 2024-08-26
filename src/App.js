import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Quote, Twitter } from 'react-bootstrap-icons';
import quotes from './quotes.json';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [statusText, setStatusText] = useState('');
  const [bgColorLight, setBgColorLight] = useState('');
  const [bgColorMid, setBgColorMid] = useState('')
  const [bgColorDark, setBgColorDark] = useState('');
  const [degree, setDegree] = useState(0);
  const [twitterLink, setTwitterLink] = useState('');

  const getRandomQuote = () => {
    const randomQuoteNum = Math.floor(Math.random() * 110);
    setAuthor(quotes[randomQuoteNum]['author']);
    setQuote(quotes[randomQuoteNum]['quote']);
    console.log("Rando Quote", quotes[0]['quote']);

  }

  const getRandomColorScheme = () => {
    const colorArr = [
      //Color range: LIGHT to DARK
      ['#F7A9D7', '#F38BC8', '#E73399'], //PINK
      ['#DDD0FE', '#B77EDD', '#724996'], //PURPLE
      ['#FFD5C2', '#F5635B', '#F11114'], //RED
      ['#B8D53D', '#429b46','#0D5B11'], //GREEN
      ['#99F4FF', '#5BCBF7','#2186D1'], //LIGHT BLUE
      ['#FFA800', '#EC7620', '#EC4C01'], //ORANGE
      ['#FFF17D', '#FFED1C', '#FF7000'], //YELLOW
      ['#DCF9C6', '#88D498', '#155F4B'], //SEAWEED
      ['#BBDFFA', '#6987D5', '#1727AE'], //BLUE
    ];

    let randomNum = Math.floor(Math.random() * colorArr.length);

    if (bgColorLight === colorArr[randomNum][0]) {
      getRandomColorScheme();
    } else {
      setBgColorLight(colorArr[randomNum][0]);
      setBgColorMid(colorArr[randomNum][1])
      setBgColorDark(colorArr[randomNum][2]);
    }
  }

  const getRandomDegree = () => {
    let randomDegree = Math.floor(Math.random() * 360);
    setDegree(randomDegree);
  }

  const updateTwitterLink = () => {
    setTwitterLink(`https://twitter.com/intent/tweet?text= "${quote}" By: ${author} &hashtags=crag_quote_machine`)
  }

  useEffect(()=> {
    getRandomQuote();
    getRandomColorScheme();
    getRandomDegree();
    updateTwitterLink();
  }, [])

  return (
    <div
      className="App"
      style={{
        background: `linear-gradient(${degree}deg, ${bgColorLight}, ${bgColorMid}, ${bgColorDark})`
      }}
    >
      <div id="app-title">Random Quote Machine</div>

      <div id="quote-box" style={{ color: bgColorDark }}>
          <div id="text-author-box">
            <div id="text">{quote}</div>
            <div id="author">- {author}</div>
          </div>
        }
        <div id="btn-box">
          <a
            id="tweet-quote"
            href={twitterLink} target="_blank"
            target="_blank"
            style={{ backgroundColor: bgColorDark }}>
              <Twitter
                className="twitter-icon"
                size={30}
              />
          </a>
          <button
            id="new-quote"
            style={{ backgroundColor: bgColorDark }}
            onClick={() => {
              getRandomQuote();
              getRandomColorScheme();
              getRandomDegree();
              updateTwitterLink();
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