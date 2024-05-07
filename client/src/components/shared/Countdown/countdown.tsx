import React, { useState, useEffect } from "react";

interface CountdownProps {
  seconds: number;
  timeout: boolean;
  setTimeout: (value: boolean) => void;
}

const Countdown: React.FC<CountdownProps> = ({
  seconds,
  setTimeout,
  timeout,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeout) {
      clearInterval(intervalId!); // Clear interval when timeout triggers
    }
  }, [timeout]);

  useEffect(() => {
    if (!timeout) {
      const id = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id); // Cleanup previous interval
    }
  }, [timeout]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId!); // Clear interval when time is up
      setTimeout(true); // Trigger timeout
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!timeout) {
      setTimeLeft(seconds); // Reset time when timeout is false
    }
  }, [timeout]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <p className="mx-1">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Countdown;
