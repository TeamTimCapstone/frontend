import React, {useState} from 'react';
import './App.css';
import axios from 'axios'; // Import axios for making HTTP requests


function App() {
  const [splitView, setSplitView] = useState(false);
  const [inputText, setInputText] = useState('');
  const [report, setReport] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);

  const toggleSplitView = () => {
    setSplitView(!splitView);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      //const articleResponse = await axios.get(link);
      //const articleText = articleResponse.data;

      const response = await fetch('http://18.191.129.165:5000/biasdetector', {
         method: 'POST', // Ensure you're sending a POST request
         headers: {
         'Content-Type': 'application/json'
         },
        //body: JSON.stringify({ link })
        //articleText: articleText
        body: JSON.stringify({text: inputText})
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
 
      const data = await response.json();
      console.log('Report:', data.result);
      setReport(data.result);
      // Set report generated to true after receiving the report data
      setReportGenerated(true);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle errors
    }
    setSplitView(true);
  };

  return (
    <div className="App" >
      {/* <header className="App-header">
        <h1>Bias Detector</h1>
        <input type="text" placeholder="Enter your text here" />
      </header> */}
      <nav className="navbar">
        <h1>BIAS DETECTOR</h1>
        <ul>
          <li><a href="#home">home</a></li>
          <li><a href="#about">about</a></li>
          <li><a href="#contact">contact</a></li>
        </ul>
      </nav>
      <div className={`body-content ${splitView ? 'split-view' : ''}`}>
      <div className='left-side'>
        <h2>Welcome to Bias Detector</h2>
        <p>analyze an article and receive a report of detected bias</p>
        <form onSubmit={handleSubmit}>
        <input 
        className='inputlink' 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} placeholder="paste text" />
        <button className='startbutton' onClick={toggleSplitView}>get started</button>
        </form>
      </div>
      {splitView &&(
        <div className='right-side'>
        <button className="close-button" onClick={toggleSplitView}>x</button>
        {reportGenerated ? (
            <>
              <h2>Report Generated</h2>
              <pre>{report}</pre>
            </>
          ) : (
            <h2>Generating Report</h2>
          )}
        </div>
      )
      
      }
      </div>      
    </div>
  );
}

export default App;
