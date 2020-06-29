const cv = require('opencv4nodejs');
const path = require('path');
const e = require('express');
const fs = require('fs');


const face_cascade = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const webcam = new cv.VideoCapture(0);
// The program loops until it has 30 images of the face.
var count = 1;
while (count < 2) {
    const im = webcam.read()
    const gray = im.bgrToGray();
    const options = {
        minSize: new cv.Size(100, 100),
        scaleFactor: 1.2,
        minNeighbors: 10
    };
    const faces = face_cascade.detectMultiScale(gray, options).objects;
    // cv2.imwrite('abcd' + count.toString() + '.jpg', faces[0])
    if (!faces.length) {
        continue;
    }
    else {
        cv.imwrite('images_db/subjects/output' + '.jpg', im)
    }

    count += 1


    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    // detect the face within the grey image.
    const getFaceImage = (grayImage) => {
        const faceRegion = classifier.detectMultiScale(grayImage).objects;
        if (!faceRegion.length) {
            throw new Error('No faces found in the photo');
        }
        return grayImage.getRegion(faceRegion[0]);
    };
    // get the path of the photo directory
    const basePath = './images_db';
    const subjectsPath = path.resolve(basePath, 'subjects');
    const nameMappings = ['emma', 'tom', 'conan'];
    // get the absolute path
    const allFiles = fs.readdirSync(subjectsPath);

    // to see if .DS_store is causing an error
    //console.log(allFiles.map(file => path.resolve(subjectsPath, file)))

    // map absolute file path for all images,
    // then map all the read the image using openCV
    // then turn the image gray, and then resize
    // resizing is required for eigen and fisher faces
    const images = allFiles
        .map(file => path.resolve(subjectsPath, file))
        .map(filePath => cv.imread(filePath))
        .map(image => image.bgrToGray())
        .map(getFaceImage)
        .map(faceImg => faceImg.resize(100, 100));


    const isTargetImage = (_, i) => allFiles[i].includes('output');
    const isTrainingImage = (_, i) => !isTargetImage(_, i);
    // use images without the label for training the recognizer
    const trainImages = images.filter(isTrainingImage);
    // use images with the label for testing with the recognizer
    const testImages = images.filter(isTargetImage);
    // map all names of people to images of them, based on filename
    const labels = allFiles.filter(isTrainingImage)
        .map(file => nameMappings.findIndex(name => file.includes(name)));
    // use local binary patterns histograms algo
    const lbph = new cv.LBPHFaceRecognizer();
    // train the images
    lbph.train(trainImages, labels);
    // run the recognizerg
    const runPrediction = (recognizer) => {
        testImages.forEach((image) => {
            //console.log(img);
            const result = recognizer.predict(image);
            confValue = result.confidence;
            imgLabel = nameMappings[result.label]
            console.log('Predicted Individual: %s, Confidence Distance: %s', imgLabel, confValue);
        });
    };
    // output results
    console.log('lbph:');
    runPrediction(lbph);

    //cv2.imshow('OpenCV', im)
    key = cv.waitKey(10)
    if (key == 27)
        break

}




















async function checkFace() {
    // set the cascade classifier for the file

}