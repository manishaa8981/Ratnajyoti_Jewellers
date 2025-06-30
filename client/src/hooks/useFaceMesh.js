import { Camera } from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
import { useEffect } from "react";

export default function useFaceMesh(videoRef, canvasRef, imageType) {
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const overlayImage = new Image();
    // overlayImage.src = `/images/${imageType}.png`; // e.g. earring.png
    overlayImage.src = `/images/${imageFile}`;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (!results.multiFaceLandmarks.length) return;

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const landmarks = results.multiFaceLandmarks[0];

      // Use landmark 234 (left ear) and 454 (right ear)
      const leftEar = landmarks[234];
      const rightEar = landmarks[454];

      const drawImage = (landmark) => {
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;

        const size = 40; // adjust size
        ctx.drawImage(overlayImage, x - size / 2, y - size / 2, size, size);
      };

      if (overlayImage.complete) {
        drawImage(leftEar);
        drawImage(rightEar);
      } else {
        overlayImage.onload = () => {
          drawImage(leftEar);
          drawImage(rightEar);
        };
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, [videoRef, canvasRef, imageType]);
}
