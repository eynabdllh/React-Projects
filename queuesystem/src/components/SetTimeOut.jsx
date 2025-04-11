import { useState, useEffect, useRef } from "react";

export default function SetTimeOut({ taskNumber, onTimeout, hasTasks }) {
  const [progress, setProgress] = useState(100);
  const timeoutTriggeredRef = useRef(false);
  const duration = (taskNumber / 10) * 1000;

  useEffect(() => {
    if (!hasTasks) {
      setProgress(100); 
      timeoutTriggeredRef.current = false;
      return;
    }

    const intervalTime = duration / 100; 
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          if (!timeoutTriggeredRef.current) {
            onTimeout(); 
            timeoutTriggeredRef.current = true; 
          }
          clearInterval(interval); 
          return 0; 
        }
        return prev - 1; // reduce progress by 1% each time
      });
    }, intervalTime);

    return () => clearInterval(interval); 
  }, [hasTasks, onTimeout, duration]);

  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#ddd",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#06D001",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}