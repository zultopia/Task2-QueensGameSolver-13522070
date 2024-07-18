import React from 'react';

// Functional component for file input just accepted .txt
const FileInput = ({ onFileUpload, fileKey }) => (
  <input key={fileKey} type="file" accept=".txt" onChange={onFileUpload} />
);

export default FileInput;