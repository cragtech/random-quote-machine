import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Quote, Twitter } from 'react-bootstrap-icons';
function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [statusText, setStatusText] = useState('');
  const [bgColorLight, setBgColorLight] = useState('');
  const [bgColorMid, setBgColorMid] = useState('')
  const [bgColorDark, setBgColorDark] = useState('');
  const [degree, setDegree] = useState(0);

  const getRandomQuoteData = () => {
    fetch('https://api.quotable.io/random')
      .then(res => {
        if (!res.ok) {
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
      .finally(() => {
        setLoading(false);
      }

      )
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

  useEffect(()=> {
    getRandomQuoteData();
    getRandomColorScheme();
    getRandomDegree();
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
        { loading ? <div id="loading-quote-text">Loading Quote...</div> :
          <div id="text-author-box">
            <div id="text">{quote}</div>
            <div id="author">- {author}</div>
          </div>
        }
        <div id="btn-box">
          <a href="twitter.com/intent/tweet">
              <button
                id="tweet-quote"
                style={{ backgroundColor: bgColorDark }}
              >
                <Twitter className="twitter-icon" size={30}/>
              </button>
          </a>
          <button
            id="new-quote"
            style={{ backgroundColor: bgColorDark }}
            onClick={() => {
              getRandomQuoteData();
              getRandomColorScheme();
              getRandomDegree();
              setLoading(true);
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
