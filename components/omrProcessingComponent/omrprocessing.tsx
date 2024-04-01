"use client";


import React, { useRef, useState } from 'react';

const OMRProcessingComponent = () => {
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [rollNumber, setRollNumber] = useState('');

  const detectRollNumber = async (imageData) => {
    // Convert canvas content to OpenCV image (Mat)
    let imgMat = cv.matFromImageData(imageData);

    // Resize the image to desired dimensions (2503x3536)
    const desiredWidth = 2503;
    const desiredHeight = 3536;
    cv.resize(imgMat, imgMat, new cv.Size(desiredWidth, desiredHeight));

    // Convert to grayscale
    let gray = new cv.Mat();
    cv.cvtColor(imgMat, gray, cv.COLOR_RGBA2GRAY);

    // Apply Gaussian blur
    let blurred = new cv.Mat();
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);

    // Perform Canny edge detection
    let edges = new cv.Mat();
    cv.Canny(blurred, edges, 50, 150, 3, false);

    // Find contours
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    // Process contours to detect roll number
    let rollNumber = '';
    for (let i = 0; i < contours.size(); ++i) {
      let contour = contours.get(i);
      let area = cv.contourArea(contour);
      let { x, y, width, height } = cv.boundingRect(contour);
      
      // Filter contours based on area, aspect ratio, and other criteria
      if (area > 1000 && width > 20 && height > 20) {
        // Extract roll number information from contours
        rollNumber += String.fromCharCode('a'.charCodeAt(0) + Math.floor(x / (desiredWidth / 6)));
      }
    }

    // Update state with the detected roll number
    setRollNumber(rollNumber);

    // Clean up
    imgMat.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const image = new Image();
      image.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        detectRollNumber(imageData);
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} ref={inputRef} />
      <canvas ref={canvasRef} />
      <div>Detected Roll Number: {rollNumber}</div>
    </div>
  );
};

export default OMRProcessingComponent;
