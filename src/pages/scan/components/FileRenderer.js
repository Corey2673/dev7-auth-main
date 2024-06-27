import React from "react";
import { Document, Page } from "react-pdf";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const FileRenderer = ({ file }) => {
  const fileType = file.type.split("/")[1];

  if (fileType === "pdf") {
    return (
      <div>
        <h2>Rendered PDF:</h2>
        <Document file={file}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  } else if (
    fileType ===
      "vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return (
      <div>
        <h2>Rendered Document:</h2>
        <DocViewer documents={[{ uri: URL.createObjectURL(file) }]} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>File Type Not Supported for Rendering</h2>
      </div>
    );
  }
};

export default FileRenderer;
