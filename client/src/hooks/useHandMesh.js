import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import { useEffect } from "react";

export default function useHandMesh(
  videoRef,
  canvasRef,
  imageFile = "ring.png"
) {
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = `http://localhost:5000/uploads/${imageFile}`;

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    img.onload = () => {
      hands.onResults((results) => {
        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (
          results.multiHandLandmarks &&
          results.multiHandLandmarks.length > 0
        ) {
          const landmarks = results.multiHandLandmarks[0];

          const ringBase = landmarks[14]; // Use base of ring finger
          const x = ringBase.x * canvas.width;
          const y = ringBase.y * canvas.height;

          ctx.drawImage(img, x - 15, y - 15, 40, 40); // Adjust size and offset
        }
      });

      const camera = new Camera(video, {
        onFrame: async () => {
          if (video.readyState >= 2) {
            await hands.send({ image: video });
          }
        },
        width: 640,
        height: 480,
      });

      camera.start();
    };

    return () => {
      hands.close();
    };
  }, [videoRef, canvasRef, imageFile]);
}
