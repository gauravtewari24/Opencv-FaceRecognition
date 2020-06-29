const cv = require('opencv4nodejs');


// Load HAAR face classifier
const face_classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

// Load functions
function face_extractor(img) {
    // restrict minSize and scaleFactor for faster processing
    //const grayImg = img.bgrToGray();
    face_classifier.detectMultiScaleAsync(img, (err, res) => {
        if (err) { return console.error(err); }
        return res;
    });
}
// Initialize Webcam
const cap = new cv.VideoCapture(0);
var count = 0;

// Collect 100 samples of your face from webcam input
while (1) {
    var frame = cap.read()
    // if (face_extractor(frame) != 0) {
    count += 1;
    let gray = new cv.Mat();

    cv.cvtColor(frame, gray, cv.COLOR_RGBA2GRAY, 0);
    var face = classifier.detectMultiScale(gray).objects;;
    // face = cv.cvtColor(face, cv.COLOR_BGR2GRAY)

    // Save file in specified directory with unique name
    var file_name_path = './gaurav' + count.toString() + '.jpg';
    cv.imwrite(file_name_path, face)

    // Put count on images and display live count
    //cv.putText(face, str(count), (50, 50), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
    //cv.imshow('Face Cropper', face)
    //}


    /* else {
         print("Face not found")
         continue;
     }*/


    if ((cv.waitKey(1) == 13) || (count == 10)) {

    }
    break;
}




cap.release()
cv.destroyAllWindows()
console.log("Collecting Samples Complete");