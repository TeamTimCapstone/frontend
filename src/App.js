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
      const response = await fetch('http://3.143.218.84:5000/biasdetector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: link })
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
  
      const data = await response.json();
      console.log('Data received from server:', data);
      setReport(data); // Store the entire data object received from the server
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
        {splitView &&(
        <div className='right-side'>
        <button className="close-button" onClick={toggleSplitView}>x</button>
        {!reportGenerated && (
        <div className='generating'>
        <h2>Generating Report</h2>
        <div class="center">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        </div>
        )}
        {reportGenerated && report && (
        <>
        <h2>Report Generated</h2>
        <p>Label: {report.label}</p>
        <p>Article URL: <a href={report.article_url}>{report.article_url}</a></p>
        <p>Article Bias Confidence: {report.article_bias_confidence}</p>
        <p>Biased Sentence Count: {report.biased_sentence_count}</p>
        <h3>Biased Sentences:</h3>
        <ul>
          {report.bias_info_by_sentence.map((sentence, index) => (
            <li key={index}>
              <p>Sentence: {sentence.text}</p>
              <p>Sentence Bias Confidence: {sentence.sentence_bias_confidence}</p>
              {sentence.biased_words && (
                <p>Biased Words: {sentence.biased_words.join(', ')}</p>
              )}
            </li>
          ))}
        </ul>  
      </>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
