import React from 'react';

const FileInput = ({ onFileUpload }) => {
  return (
    <div>
      <input type="file" accept=".txt" onChange={onFileUpload} />
    </div>
  );
};

export default FileInput;