import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import { useEffect } from "react";

export default function useBangleMesh(
  videoRef,
  canvasRef,
  imageFile = "bangle.png"
) {
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0
        )
          return;

        const hand = results.multiHandLandmarks[0];

        // Use wrist and base of palm for bangle placement
        const wrist = hand[0]; // Wrist
        const basePalm = hand[5]; // Base of index finger (can help with rotation later)

        const x = wrist.x * canvas.width;
        const y = wrist.y * canvas.height;

        // OPTIONAL: Offset to move it lower
        const offsetY = 20;

        // Draw the bangle image centered on wrist
        const width = 80;
        const height = 30;

        ctx.drawImage(
          img,
          x - width / 2,
          y + offsetY - height / 2,
          width,
          height
        );
      });
    };

    const camera = new Camera(video, {
      onFrame: async () => {
        if (video.readyState >= 2) {
          await hands.send({ image: video });
        }
      },
      width: 640,
      height: 480,
    });

    const checkReady = setInterval(() => {
      if (video.videoWidth > 0) {
        clearInterval(checkReady);
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        camera.start();
      }
    }, 100);

    return () => {
      camera.stop();
    };
  }, [videoRef, canvasRef, imageFile]);
}
