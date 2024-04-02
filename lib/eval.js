        
        var index = 0;
        var running = true;
        var code;
        var filename = "";
        var shape_coords = [];

        var OMR_result = [];
        var all_OMR_result = [];
        var QR_code = 0;
        var errors = [];

        var error_file = [];


function detect(file, callback) {

    if (file) {
        filename = file.name;

        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = new Image();
            imgElement.onload = function() {

                //QR code

          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          ctx.drawImage(imgElement, 0, 0);

          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            //document.getElementById('QR').value = code.data;
            shape_coords = adjustCoordinatesAndSize(code.location.topLeftCorner);
            //console.log(code)
          } else {
            // QR code not found message.
          }


                const uniqueShapes = shape_coords;
                cutImageIntoPiecesAndGetResult(uniqueShapes, file, function(result) {
                    callback(result);
                });


        };
            imgElement.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }    

}



     function cutImageIntoPiecesAndGetResult(shapes, file, callback) {
            const reader = new FileReader();

            var inputArr = [];
            var final_result;

            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {

                        for(var index = 0; index < shapes.length; index++) {
                            var shape = shapes[index]
                                                    // Create a canvas for each piece
                        const canvas = document.createElement('canvas');
                        const textArea = document.createElement('textarea');
                        const ctx = canvas.getContext('2d');

 

                        // Draw the piece of the image onto the canvas
                        // Cut the unnessesarry area

                        if(index == 0) {
                            // Set canvas size to fit the piece
                            canvas.width = shape.width;
                            canvas.height = shape.height-100;

                            ctx.drawImage(img, shape.x, shape.y + 100, shape.width, shape.height-100, 0, 0, shape.width, shape.height-100);
                        } else {
                            canvas.width = shape.width-50;
                            canvas.height = shape.height;
                            ctx.drawImage(img, shape.x+50, shape.y, shape.width-50, shape.height, 0, 0, shape.width-50, shape.height);
                        }
                        

                        inputArr.push(canvas);
                        }


                        inputCanvas = inputArr;


                        for(var i = 0; i < shapes.length; i++) {

                        const inputCtx = inputCanvas[i].getContext('2d');
                            

                            // Enhance the black color by increasing contrast
                            const imageData = inputCtx.getImageData(0, 0, inputCanvas[i].width, inputCanvas[i].height);
                            const pixels = imageData.data;

                            for (let i = 0; i < pixels.length; i += 4) {
                                // Check if the pixel is close to black
                                if (pixels[i] < 50 && pixels[i + 1] < 50 && pixels[i + 2] < 50) {
                                    // Increase the contrast by making the black color more bold
                                    pixels[i] = 0;   // Red channel
                                    pixels[i + 1] = 0; // Green channel
                                    pixels[i + 2] = 0; // Blue channel
                                }
                            }

                            // Put the modified image data back onto the canvas
                            inputCtx.putImageData(imageData, 0, 0);

                            var result = detectCircles(inputCanvas[i]);

                            OMR_result.push(result);
                        }



                        if(code) {

                        if(checkArray(OMR_result, code.data)) {
                            OMR_result.push(code.data);
                            OMR_result.push(filename);
                        } else {
                            OMR_result.push(code.data);
                            OMR_result.push(filename);
                            OMR_result.push({errors: errors})
                            error_file.push({filename: filename, error: errors})
                            console.log("Error:", errors);
                            QR_code = code.data;
                            errors = [];
                        }
                        } else {
                            OMR_result.push("Not Found");
                            OMR_result.push(filename);
                            OMR_result.push({errors: "QR Code Error"})
                            console.log("QR code error");
                            error_file.push({filename: filename, error: "QR Code not found"})
                            errors = [];
                        }

                                        callback(OMR_result);
                                        OMR_result = [];

                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

        function detectCircles(canvas) {
            let src = cv.imread(canvas);
            let gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
            let circles = new cv.Mat();
            cv.HoughCircles(gray, circles, cv.HOUGH_GRADIENT, 1, 40, 180, 10, 10, 25);
            
            let filledCircles = [];
            let circle_cords = [];


            for (let i = 0; i < circles.cols; ++i) {
                let x = circles.data32F[i * 3];
                let y = circles.data32F[i * 3 + 1];
                let radius = circles.data32F[i * 3 + 2];
                let center = new cv.Point(x, y);

                circle_cords.push({x: x, y:y, radius: radius, index: i});


                let isFilled = isCircleFilled(x, y, radius, canvas);
                if (isFilled) {
                    filledCircles.push(i);
                }

            }

            var arrangedCoor = [];
            var result = [];

            if (circles.cols > 40) {
                arrangedCoor = arrangeYLowToHigh(getArrangedCoor(circle_cords, 10, 1));
                result = (getMCQResults(arrangedCoor, filledCircles, 1));
            } else {
                arrangedCoor = arrangeXLowToHigh(getArrangedCoor(circle_cords, 4, 0));
                result= getMCQResults(arrangedCoor, filledCircles, 0);
            }

            src.delete();
            gray.delete();
            circles.delete();

            return result;
        }

        function isCircleFilled(x, y, radius, canvas) {

            const inputCtx = canvas.getContext('2d');
            let imageData = inputCtx.getImageData(x - radius, y - radius, radius * 2, radius * 2);
            let pixels = imageData.data;

            let blackCount = 0;
            for (let i = 0; i < pixels.length; i += 4) {
                let r = pixels[i];
                let g = pixels[i + 1];
                let b = pixels[i + 2];
                // Consider a pixel as black if its RGB values are all close to 0
                if (r < 20 && g < 20 && b < 20) {
                    blackCount++;
                }
            }

            // If the majority of pixels are black, consider the circle filled
            return blackCount / (pixels.length / 4) > 0.3;
        }

        function getArrangedCoor(circles, row, orientation) {

            if(orientation == 1) {
                    // Sort circles based on x and y coordinates
        circles.sort((a, b) => {
        if (a.x !== b.x) {
            return a.x - b.x; // Sort by y coordinate first
        } else {
            return b.y - a.y; // If y coordinates are same, sort by x coordinate (high to low)
        }
        });
            } else {
                // Sort circles based on x and y coordinates
        circles.sort((a, b) => {
        if (a.y !== b.y) {
            return a.y - b.y; // Sort by y coordinate first
        } else {
            return b.x - a.x; // If y coordinates are same, sort by x coordinate (high to low)
        }
        });
            }


        // Return the new array of sorted circles
        //console.log(circles);

        // Splitting the circles into 5 arrays with 4 objects each


        let arrayOfArrays = [];
        for (let i = 0; i < circles.length; i += row) {
        let subArray = circles.slice(i, i + row);
        //subArray.reverse(); // Reverse the objects within each subarray
        arrayOfArrays.push(subArray.sort((a, b) => a.x - b.x));
        }

        // Print the array of arrays
        //console.log(arrayOfArrays);

        return arrayOfArrays;
        }

        function getMCQResults(questions, attemptedIndices, orientation) {

let results = [];

for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let result = "";

    if(question.length == 4 || question.length == 10) {

    for (let j = 0; j < question.length; j++) {
        let option = question[j];

            if (attemptedIndices.includes(option.index)) {
            if(orientation == 1) {
                result += j;
            } else {
                result += (1 + j); // Convert index to corresponding option (A, B, C, D)  
            }

        }


    } 
} else {
        result += "U";
    }


    results.push(result);
}


return results;
}



        function arrangeYLowToHigh(arrayOfArrays) {
            // Iterate through each sub-array
            for (let i = 0; i < arrayOfArrays.length; i++) {
                // Sort the sub-array based on y-coordinates
                arrayOfArrays[i].sort((a, b) => a.y - b.y);
            }

            return arrayOfArrays;
        }

        function arrangeXLowToHigh(arrayOfArrays) {
            // Iterate through each sub-array
            for (let i = 0; i < arrayOfArrays.length; i++) {
                // Sort the sub-array based on y-coordinates
                arrayOfArrays[i].sort((a, b) => a.x - b.x);
            }

            return arrayOfArrays;
        }

        function checkArray(arr, QR) {

                // Condition 0: Check if QR is a number
                if (typeof QR == 'number') {
                    errors.push("QR Code Error!");
                return false;
            }

            // Condition 1: Check if the array length is 6
            //if (arr.length !== 6) {
            //    errors.push("All Box are not detected");
            //    return false;
            //}

            // Condition 2: Check if the first element size is 7 and total digits equal to 7
            const firstElement = arr[0];
            if (firstElement.length !== 7 || getRollLength(firstElement) !== 7) {
                errors.push("Roll Number Error!");
                return false;
            }

            // Condition 3: Check if the rest of the elements have a size of 10
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].length !== 10) {
                    errors.push("Less bubbles detected on box-", i+1);
                    return false;
                }
            }

                // Condition 4: Check if any element contains 'U'
                for (let i = 0; i < arr.length; i++) {
                if (arr[i].includes('U')) {
                    errors.push("Less bubbles detected on box-");
                    return false;
                }
            }

            // All conditions passed
            return true;
        }

        function getRollLength(arr) {
            let numberString = '';
            for (const digit of arr) {
                numberString += digit;
            }
            const number = Number(numberString);
            return numberString.length;
        }

        function outputResult() {

            fileData = all_OMR_result;
            // Initialize an empty array to store the JSON objects
            var jsonObjects = [];

            // Loop through each set of data in the fileData array
            fileData.forEach(dataSet => {
                // Combine all elements of the roll array into a single string and then parse it to an integer
                var roll = parseInt(dataSet[0].join(''));

                // Create the answer key for this dataset
                var answerKey = '';

                // Loop through the next 5 arrays in the dataSet
                for (let i = 1; i <= 5; i++) {
                    dataSet[i].forEach(element => {
                        if (element === "") {
                            answerKey += 'X';
                        } else if (element.length > 1) {
                            answerKey += 'M';
                        } else {
                            answerKey += element;
                        }
                    });
                }

                // Extract the ID from the second-to-last element of the dataSet
                var ID = parseInt(dataSet[dataSet.length - 2]);

                // Extract the filename from the last element of the dataSet
                var filename = dataSet[dataSet.length - 1];

                // Create the JSON object for this dataset
                var jsonObject = {
                    "roll": roll,
                    "answer_key": formatString(answerKey),
                    "ID": ID,
                    "filename": filename
                };

                // Add the JSON object to the jsonObjects array
                jsonObjects.push(jsonObject);
            });
            return jsonObjects;
        }





        function adjustCoordinatesAndSize(coords) {
            var x = coords.x;
            var y = coords.y;
            // First set of adjustments
            var adjustedCoordinates1 = {
                x: x - 450,
                y: y - 290,
                height: 625,
                width: 320
            };
            
            // Second set of adjustments
            var adjustedCoordinates2 = {
                x: x - 470,
                y: y + 448,
                height: 536,
                width: 248
            };

            // Third set of adjustments
            var adjustedCoordinates3 = {
                x: x - 200,
                y: y + 448,
                height: 536,
                width: 248
            };

            // Fourth set of adjustments
            var adjustedCoordinates4 = {
                x: x + 64,
                y: y + 448,
                height: 536,
                width: 248
            };

            // Fifth set of adjustments
            var adjustedCoordinates5 = {
                x: x - 470,
                y: y + 1004,
                height: 536,
                width: 248
            };

            // Sixth set of adjustments
            var adjustedCoordinates6 = {
                x: x - 200,
                y: y + 1004,
                height: 536,
                width: 248
            };

            
            return [adjustedCoordinates1, adjustedCoordinates2, adjustedCoordinates3, adjustedCoordinates4, adjustedCoordinates5, adjustedCoordinates6];
        }


