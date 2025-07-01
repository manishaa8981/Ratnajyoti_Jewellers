import { useEffect, useRef } from "react";
import useFaceMesh from "../hooks/useFaceMesh";
import useHandMesh from "../hooks/useHandMesh";

export default function TryOnPreview({ imageType = "earring", imageFile }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error", err);
      }
    };
    setTimeout(initCamera, 100);
  }, []);

  if (imageType === "ring") {
    useHandMesh(videoRef, canvasRef, imageFile);
  } else {
    useFaceMesh(videoRef, canvasRef, imageFile, imageType); // 🎯 pass both file and type
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full rounded"
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}
