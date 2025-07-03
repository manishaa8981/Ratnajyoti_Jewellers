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
        const canvasCtx = canvasRef.current.getContext("2d");
        canvasCtx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (results.multiHandLandmarks.length > 0) {
          const landmarks = results.multiHandLandmarks[0];

          const ringFinger = landmarks[12]; // Ring finger tip
          const x = ringFinger.x * canvasRef.current.width;
          const y = ringFinger.y * canvasRef.current.height;

          canvasCtx.drawImage(img, x - 15, y - 15, 30, 30);
        }
      });
    };

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, [videoRef, canvasRef, imageFile]);
}
