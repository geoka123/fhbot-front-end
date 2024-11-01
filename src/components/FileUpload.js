// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [fileName,setFileName] = useState('');

    const botId = 4530;
    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleSelectFile = (event) =>{
        const selectedFile = event.target.files[0];

        if(selectedFile){
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };
    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            setUploadStatus("Please select a file before uploading.");
            return;
        }
    

        const formData = new FormData();
        formData.append('file', file);
        formData.append('botId',botId);

        try {
            const response = await axios.post('http://13.60.33.46:8000/api/uploadfile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus("File uploaded successfully!");
        } catch (error) {
            setUploadStatus("File uploaded.");
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleSelectFile}
                id="file-upload"
                style={{ display: 'none' }} // Hide the default input
            />
           
            {/* Label acting as a styled button */}
            <label htmlFor="file-upload" style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#007BFF', color: 'white', borderRadius: '4px', marginRight: '10px' }}>
                Choose File
            </label>

            {/* Show selected file name */}
            {fileName && <span>Selected file: {fileName}</span>}
            <input type="file" onChange={handleSelectFile} />
            {/* <button onClick={handleSelectFile}>Select File</button> */}
            <button onClick={handleUpload}>Upload File</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default FileUpload;