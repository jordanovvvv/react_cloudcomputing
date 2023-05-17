
import './App.css';
import {useState} from "react";


function App() {

    const [inputFile, setInputFile] = useState(null);
    const [result, setResult] = useState(null);
    const [processingTime, setProcessingTime] = useState(null);

    const handleFileUpload = (event) => {
        setInputFile(event.target.files[0]);
    };

    const startCalculation = async (event) => {
        event.preventDefault();
        const startTime = performance.now();
        const formData = new FormData();
        formData.append('inputFile', inputFile);
        console.log(inputFile)

        fetch("http://localhost:3000/sort", {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.blob())
            .then((data) => {
                setResult(data);
                setProcessingTime(performance.now() - startTime);
            })
            .catch((err) => console.error(err));

    };



    const handleDownload = () => {
    fetch('http://localhost:3000/download')
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'sorted-files.txt';
            link.click();
        })
        .catch((err) => console.log(err));
  };

  return (
      <div className="App">
        <input type="file" name="inputFile" id="input" multiple onChange={handleFileUpload} />
        <button className="App-button" onClick={startCalculation}>Start Calculation</button>
        <button className="App-button" onClick={handleDownload}>Download Result</button>
        <p>Processing Time: {processingTime}ms</p>
      </div>
  );
}

export default App;
