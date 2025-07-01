import { Camera } from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
import { useEffect } from "react";

export default function useFaceMesh(
  videoRef,
  canvasRef,
  imageFile,
  imageType = "earring"
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

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

    const overlayImage = new Image();
    overlayImage.src = `http://localhost:5000/uploads/${imageFile}`;

    overlayImage.onload = () => {
      faceMesh.onResults((results) => {
        const ctx = canvas.getContext("2d");
        if (
          !ctx ||
          !results.multiFaceLandmarks ||
          results.multiFaceLandmarks.length === 0
        )
          return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const face = results.multiFaceLandmarks[0];
        let x = 0,
          y = 0;

        if (imageType === "earring") {
          const leftEar = face[234]; // Left ear
          x = leftEar.x * canvas.width;
          y = leftEar.y * canvas.height;
          ctx.drawImage(overlayImage, x - 20, y - 20, 40, 40); // Small size for earring
        } else if (imageType === "necklace") {
          const chin = face[152]; // Chin landmark
          x = chin.x * canvas.width;
          y = chin.y * canvas.height + 30; // slight downward offset
          ctx.drawImage(overlayImage, x - 50, y, 100, 60); // Larger size for necklace
        }
      });

      const camera = new Camera(video, {
        onFrame: async () => {
          if (video.readyState >= 2) {
            await faceMesh.send({ image: video });
          }
        },
        width: 640,
        height: 480,
      });

      const waitForVideoReady = setInterval(() => {
        if (video.videoWidth > 0) {
          clearInterval(waitForVideoReady);
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          camera.start();
        }
      }, 100);
    };
  }, [videoRef, canvasRef, imageFile, imageType]);
}
