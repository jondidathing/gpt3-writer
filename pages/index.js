import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [aiOutput, setApiOutput] = useState('');
  const [isGenerating, setisGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setisGenerating(true);
    console.log('Calling OpenAI...')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userInput}),
    });
    const data = await response.json();
    const {output} = data;
    console.log("OpenAI Replied...", output.text)

    setApiOutput(`${output.text}`);
    setisGenerating(false);
  }

  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };



  return (
    <div className="root">
      <Head>
        <title>GPT-3 Ai Meal Planner</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate A Meal Plan</h1>
          </div>
          <div className="header-subtitle">
            <h2>Make a meal plan for local foods wherever you are in the world</h2>
          </div>
          <div className="prompt-container">
            {/* <p><h3>Example Input</h3>User: Height = 5’10, Weight = 130lbs, Gender = Male, Dietary Requirements = Lactose Intolerant, Age = 22, Location:  193 Prince Edward Road West, Kowloon, Hong Kong China,
          Duration: 1 day</p> */}
          <p>
            <h3>Copy & Paste Down Below</h3>
            <ul>
              <li>Height = </li>
              <li>Weight = lbs</li>
              <li>Gender = </li>
              <li>Dietary Requirements =</li>
              <li>Age =</li>
              <li>Location = </li>
              <li>Duration = </li>
              <li>Goal = </li>
            </ul> 
          </p>
          <textarea placeholder=""
          className="prompt-box" value={userInput} onChange={onUserChangedText}/>
          <div className='prompt-buttons'>
          {/* this is used to generate a darker background colour */}
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} 
              onClick={callGenerateEndpoint}> 
              <div className='generate'>
              {/* this is used to replace the words with the laoding icon */}
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>} 
              </div>
            </a>
          </div>
          {aiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{aiOutput}</p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
