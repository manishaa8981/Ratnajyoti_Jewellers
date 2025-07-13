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
    img.src = `http://localhost:5001/uploads/${imageFile}`;

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
        const wrist = hand[0];
        const indexBase = hand[5];
        const pinkyBase = hand[17];

        const x1 = indexBase.x * canvas.width;
        const y1 = indexBase.y * canvas.height;
        const x2 = pinkyBase.x * canvas.width;
        const y2 = pinkyBase.y * canvas.height;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);

        // 📏 Adjust scaling here:
        const rawWidth = Math.hypot(dx, dy);
        const width = rawWidth * 1.2; // Try 1.2 - 1.6 (previously was 2.3)
        const height = width / 3.8; // Make it slimmer as well (previously 3.5)

        // 🎯 Centering
        const centerX = (x1 + x2) / 2;
        const centerY = wrist.y * canvas.height + 28;

        // 🎨 Draw with rotation
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();
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
