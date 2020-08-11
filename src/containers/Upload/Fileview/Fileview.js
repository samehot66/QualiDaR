import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
 
function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
 
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
 
  return (
    <div>
      <Document
        file="./upload/20190222-scc-ar-2018-th-03.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}
export default MyApp;