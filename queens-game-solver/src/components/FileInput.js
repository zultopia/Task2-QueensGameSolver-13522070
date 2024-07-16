import React from 'react';

const FileInput = ({ onFileUpload, fileKey }) => (
  <input key={fileKey} type="file" accept=".txt" onChange={onFileUpload} />
);

export default FileInput;