//g and Saving Video Frames using OpenCV-PythonPython
const cv = require('opencv4nodejs');


//Opens the Video file
const cap = new cv.VideoCapture(0);
var i = 0;
while (i < 5) {
    var frame = cap.read()


    cv.imwrite('kang' + i.toString() + '.jpg', frame)
    i += 1;
}


cap.release()

