import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from 'axios';

function App() {

  const [inputFile, setInputFile] = useState(null);
  const [result, setResult] = useState(null);
  const [processingTime, setProcessingTime] = useState(null);

  const handleFileUpload = (event) => {
    setInputFile(event.target.files[0]);
  };

  const startCalculation = async () => {
    const startTime = performance.now();
    const formData = new FormData();
    formData.append('inputFile', inputFile);

    const response = await fetch("http://localhost:3000/sort", {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    const data = await response.text();
    setResult(data);
    setProcessingTime(performance.now() - startTime);
  };

  const handleDownload = () => {
    const file = new Blob([result], {
      type: 'text/plain'
    });
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'result.txt';
    link.click();
  };

  return (
      <div className="App">
        <input type="file" name="inputFile" onChange={handleFileUpload} />
        <button onClick={startCalculation}>Start Calculation</button>
        <button onClick={handleDownload}>Download Result</button>
        <p>Processing Time: {processingTime}ms</p>
      </div>
  );
}

export default App;
