import React, { useState } from "react";
import PDFViewer from "./PDFViewer";
import FileUpload from "./FileUpload";

const App = () => {
  const [pdfFilePath, setPdfFilePath] = useState(null);

  const handleFileSelect = (file) => {
    // Assuming the file is stored locally or in some storage, get the path
    // This could be an uploaded file stored in backend or locally uploaded file path
    const filePath = URL.createObjectURL(file);
    setPdfFilePath(filePath);
  };

  return (
    <div>
      <h1>PDF Viewer and Uploader</h1>
      <FileUpload onFileSelect={handleFileSelect} />
      {pdfFilePath && <PDFViewer filePath={pdfFilePath} />}
    </div>
  );
};

export default App;
