import React, { useState, useRef } from 'react';

const InputFile = ({
  label,
  accept,
  onChange,
  multiple = false,
  disabled = false,
  error = null,
  helperText = null,
  maxFileSizeMB = 10,
  showPreview = false
}) => {
  const [fileNames, setFileNames] = useState([]);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check file sizes
    const oversizedFiles = Array.from(files).filter(file => file.size > maxFileSizeMB * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map(f => f.name).join(', ');
      alert(`The following files exceed the maximum size of ${maxFileSizeMB}MB: ${fileNames}`);
      return;
    }
    
    // Process files
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    }));
    
    setFileNames(newFiles);
    
    // Generate preview for image files
    if (showPreview && files[0] && files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPreview(null);
    }
    
    // Call onChange with the selected files
    if (onChange) {
      onChange(files);
    }
  };

  // Handle click on the file input area
  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  // Handle drag and drop events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // If accept is defined, filter files by type
      if (accept) {
        const acceptTypes = accept.split(',').map(type => type.trim());
        const allowedFiles = Array.from(files).filter(file => {
          return acceptTypes.some(acceptType => {
            if (acceptType.startsWith('.')) {
              // Match by extension
              return file.name.toLowerCase().endsWith(acceptType.toLowerCase());
            } else if (acceptType.includes('*')) {
              // Match by wildcard type
              const [mediaType] = acceptType.split('/*');
              return file.type.startsWith(`${mediaType}/`);
            } else {
              // Exact match
              return file.type === acceptType;
            }
          });
        });
        
        if (allowedFiles.length !== files.length) {
          alert('Some files were skipped because they are not of the accepted type.');
          if (allowedFiles.length === 0) return;
          
          // Create a new FileList with allowed files
          const dataTransfer = new DataTransfer();
          allowedFiles.forEach(file => dataTransfer.items.add(file));
          handleFileChange({ target: { files: dataTransfer.files } });
          return;
        }
      }
      
      handleFileChange({ target: { files } });
    }
  };

  // Clear selected files
  const handleClear = (e) => {
    e.stopPropagation();
    setFileNames([]);
    setPreview(null);
    fileInputRef.current.value = '';
    if (onChange) {
      onChange(null);
    }
  };

  // Remove a specific file when multiple files are selected
  const handleRemoveFile = (index, e) => {
    e.stopPropagation();
    
    // Create a new FileList without the removed file
    const dt = new DataTransfer();
    const files = fileInputRef.current.files;
    
    for (let i = 0; i < files.length; i++) {
      if (i !== index) {
        dt.items.add(files[i]);
      }
    }
    
    fileInputRef.current.files = dt.files;
    
    // Update state
    const newFileNames = [...fileNames];
    newFileNames.splice(index, 1);
    setFileNames(newFileNames);
    
    // Update preview if needed
    if (showPreview && index === 0 && dt.files.length > 0 && dt.files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(dt.files[0]);
    } else if (showPreview && (index === 0 || dt.files.length === 0)) {
      setPreview(null);
    }
    
    // Call onChange with the updated files
    if (onChange) {
      onChange(dt.files.length > 0 ? dt.files : null);
    }
  };

  return (
    <div className="space-y-1">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* File input area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 transition-all duration-200 
          ${dragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'} 
          ${disabled ? 'opacity-60 bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-400 hover:bg-gray-50'} 
          ${error ? 'border-red-500' : ''}
        `}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
        />
        
        {fileNames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4">
            <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600 font-medium">
              Drag and drop {multiple ? 'files' : 'a file'}, or click to browse
            </p>
            {accept && (
              <p className="text-xs text-gray-500 mt-1">
                Accepted file types: {accept}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Maximum file size: {maxFileSizeMB}MB
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* File list */}
            <div className="flex flex-col gap-2">
              {fileNames.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-200">
                  <div className="flex items-center">
                    <div className="text-indigo-500 mr-2">
                      {file.type.startsWith('image/') ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="truncate max-w-xs">
                      <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  {!disabled && (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                      onClick={(e) => multiple ? handleRemoveFile(index, e) : handleClear(e)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Image preview */}
            {showPreview && preview && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img 
                  src={preview} 
                  alt="File preview" 
                  className="max-h-32 max-w-full rounded-md border border-gray-200"
                />
              </div>
            )}
            
            {/* Change file button */}
            {!disabled && (
              <div className="flex items-center justify-center mt-2">
                <button
                  type="button"
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
                  onClick={handleClick}
                >
                  {multiple ? 'Add more files' : 'Change file'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
      
      {/* Helper text */}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputFile;