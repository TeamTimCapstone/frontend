import React, { useState } from 'react';
import './App.css';

function App() {
  const [splitView, setSplitView] = useState(false);
  const [link, setLink] = useState(''); // Make sure 'link' state is initialized correctly
  const [report, setReport] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);

  const toggleSplitView = () => {
    setSplitView(!splitView);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://3.133.111.135:5000/biasdetector', {
        method: 'POST', // Make sure to specify the method
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: link }) // Send 'link' as 'text' in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      console.log('Report:', data.output);
      setReport(data.output);
      setReportGenerated(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
    setSplitView(true);
  };

  return (
    <div className="App">
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
              value={link}
              onChange={(e) => setLink(e.target.value)} // Update 'link' state with input value
              placeholder="paste link" />
            <button className='startbutton' onClick={toggleSplitView}>get started</button>
          </form>
        </div>
        {splitView && (
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
