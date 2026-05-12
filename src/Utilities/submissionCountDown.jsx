import React, { useEffect, useState, memo } from "react";
const SubmissionCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculate(targetDate));

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      setTimeLeft(calculate(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;
  const isWarning = timeLeft.days === 0 && timeLeft.hours === 0;

  const isCritical = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box value={timeLeft.days} label="DAYS" />
      <Box value={timeLeft.hours} label="HOURS" warning={isWarning} />
      <Box value={timeLeft.minutes} label="MINUTES" warning={isWarning} />
      <Box
        value={timeLeft.seconds}
        label="SECONDS"
        warning={isWarning}
        critical={isCritical}
      />
    </div>
  );
};

function calculate(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const Box = memo(function Box({ value, label, warning, critical }) {
  let background = "#B91C1C";

  if (warning) background = "#B91C1C";
  if (critical) background = "#DC2626";

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          background,
          color: "#fff",
          padding: "10px 14px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "bold",
          width: "48px",
          textAlign: "center",
          transition: "all 0.4s ease",
          boxShadow: critical ? "0 0 15px rgba(220,38,38,0.7)" : "none",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          fontSize: "10px",
          marginTop: "6px",
          letterSpacing: "1px",
          opacity: 0.7,
        }}
      >
        {label}
      </div>
    </div>
  );
});
export default SubmissionCountdown;
