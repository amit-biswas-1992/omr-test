"use client";
import { log } from 'console';
// pages/ImageProcessing.js

import React, { useState } from 'react';

const ImageProcessing = () => {
    const [rollNumber, setRollNumber] = useState('');
  
    const handleImageUpload = (event) => {
      const imageFile = event.target.files[0];
      if (imageFile) {
        processImage(imageFile);
      }
    };
  
    const processImage = (imageFile) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = new Image();
        image.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const desiredWidth = 2503;
          const desiredHeight = 3536;
          canvas.width = desiredWidth;
          canvas.height = desiredHeight;
          ctx.drawImage(image, 0, 0, desiredWidth, desiredHeight);
          const roll = detectRollNumber(ctx, desiredWidth, desiredHeight);
          setRollNumber(roll);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    };
  
    const detectRollNumber = (ctx, desiredWidth, desiredHeight) => {
      // Convert canvas content to OpenCV image (Mat)
      const imgMat = cv.matFromImageData(ctx.getImageData(0, 0, desiredWidth, desiredHeight));

      // Define the region of interest
      const x = 250;
      const y = 517;
      const width = 570 - x;
      const height = 1360 - y;
    
      // Split the image into two parts
      const part1 = imgMat.roi(new cv.Rect(x, y, width, height));
    
      console.log('part1:', part1.data);
      
      // Convert part1 to grayscale
      const gray = new cv.Mat();
      cv.cvtColor(part1, gray, cv.COLOR_RGBA2GRAY);
  
      // Apply Gaussian blur
      const blurred = new cv.Mat();
      cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
  
      // Apply Canny edge detection
      const edges = new cv.Mat();
      cv.Canny(blurred, edges, 50, 150);
  
      // Find contours
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();
      cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
  
      // Initialize roll number
      let rollNumber = '';
  
      // Iterate through contours to detect filled circles
      const num_rows = 10;
      const num_columns = 6;
      const h = height;
      const w = width;
      console.log('contours.size():', contours.size());
      
  
      for (let col = 0; col < num_columns; col++) {
        let filledBubbleDetected = false;
        for (let row = 0; row < num_rows; row++) {
          const y = Math.round(row * h / num_rows);
          for (let i = 0; i < contours.size(); ++i) {
            const cnt = contours.get(i);
            const moments = cv.moments(cnt, false);
            const cx = Math.round(moments.m10 / moments.m00);
            const cy = Math.round(moments.m01 / moments.m00);
            // console.log('cx:', cx, 'cy:', cy, 'y:', y, 'col:', col, 'row:', row);
            
            if (Math.abs(cy - y) < 55 && cx > col * w / num_columns && cx < (col + 1) * w / num_columns) {
              filledBubbleDetected = true;
              console.log('cx:', cx, 'cy:', cy, 'y:', y, 'col:', col, 'row:', row);
              
              console.log('Filled bubble detected at row', row, 'and column', col);
              
              rollNumber += row;
              break;
            }
          }
          if (filledBubbleDetected) break;
        }
        if (!filledBubbleDetected) rollNumber += '0';
      }
  
      // Clean up resources
      imgMat.delete();
      gray.delete();
      blurred.delete();
      edges.delete();
      hierarchy.delete();
      contours.delete();
  
      // Return the detected roll number
      return rollNumber;
    };
  
    return (
      <div>
        <h1>Image Processing</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {rollNumber && <p>Detected Roll Number: {rollNumber}</p>}
      </div>
    );
  };
  
  export default ImageProcessing;