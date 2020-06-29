/*# Creating database 
# It captures images and stores them in datasets 
# folder under the folder name of sub_data*/
const cv2 = require('opencv4nodejs');
const os = require('os');
const path = require('path');
const e = require('express');

const face_cascade = new cv2.CascadeClassifier(cv2.HAAR_FRONTALFACE_ALT2);
const webcam = new cv2.VideoCapture(0);
// The program loops until it has 30 images of the face.
var count = 1;
while (count < 30) {
    const im = webcam.read()
    const gray = im.bgrToGray();
    const options = {
        minSize: new cv2.Size(100, 100),
        scaleFactor: 1.2,
        minNeighbors: 10
    };
    const faces = face_cascade.detectMultiScale(gray, options).objects;
    // cv2.imwrite('abcd' + count.toString() + '.jpg', faces[0])
    if (!faces.length) {
        continue;
    }
    else {
        cv2.imwrite('images_db/subjects/gaurav' + count.toString() + '.jpg', im)
    }

    count += 1

    //cv2.imshow('OpenCV', im)
    key = cv2.waitKey(10)
    if (key == 27)
        break

}
