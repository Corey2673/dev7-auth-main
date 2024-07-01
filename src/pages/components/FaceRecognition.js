import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [savedDescriptors, setSavedDescriptors] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);

  // Load face detection models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    ]);
    setModelsLoaded(true);
  };

  // Load saved user descriptors (you need to implement this function)
  const loadSavedDescriptors = async () => {
    // Load descriptors from a saved source (e.g., database or file)
    const descriptors = []; // Replace with actual saved descriptors
    setSavedDescriptors(descriptors);
  };

  // Start video stream from webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  // Handle video play event for face detection
  const handleVideoPlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (modelsLoaded) {
        try {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Match detected faces with saved descriptors
          resizedDetections.forEach((detection) => {
            const bestMatch = savedDescriptors.find((savedDescriptor) => {
              const distance = faceapi.euclideanDistance(
                detection.descriptor,
                savedDescriptor
              );
              return distance < 0.6; // Adjust threshold as needed
            });

            if (bestMatch) {
              setMatchedUser(bestMatch.user); // Set matched user
            }

            const box = detection.detection.box;
            const label = `Face ${detection.detection.score.toFixed(2)}`;
            const drawBox = new faceapi.draw.DrawBox(box, { label });
            drawBox.draw(canvas);
          });

          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        } catch (error) {
          console.error("Error during detection:", error);
        }
      }
    }, 100);
  };

  useEffect(() => {
    loadModels();
    loadSavedDescriptors(); // Load saved descriptors on component mount

    if (videoRef.current) {
      videoRef.current.addEventListener("play", handleVideoPlay);
    }

    return () => {
      // Clean up event listener
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handleVideoPlay);
      }
    };
  }, [modelsLoaded]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <button
        onClick={startVideo}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Video
      </button>
      <div className="relative mt-4">
        <video
          ref={videoRef}
          autoPlay
          className="border rounded-md shadow-md"
        ></video>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        ></canvas>
      </div>

      {matchedUser && (
        <p className="mt-4 text-xl font-semibold">
          Matched User: {matchedUser}
        </p>
      )}
    </div>
  );
};

export default FaceRecognition;
