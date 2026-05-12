import { useState, useEffect } from "react";

// logic
const checkIdeaSubmissionLimit = ({
  userIdeas = [],
  level,
  now = Date.now(),
}) => {
  if (!userIdeas.length || !level) return { allowed: true, breakdown: null };

  const normalizedLevel = level.trim().toLowerCase();
  const levelLimitsInMonths = { county: 1, city: 1, state: 12, national: 24 };
  const monthsLimit = levelLimitsInMonths[normalizedLevel];
  if (!monthsLimit) return { allowed: true, breakdown: null };

  const sortedIdeas = [...userIdeas].sort(
    (a, b) => new Date(b.submittedOn) - new Date(a.submittedOn),
  );
  const lastIdea = sortedIdeas[0];
  if (!lastIdea?.submittedOn) return { allowed: true, breakdown: null };

  const lastDate = new Date(lastIdea.submittedOn);
  const nextAllowedDate = new Date(lastDate);
  nextAllowedDate.setMonth(nextAllowedDate.getMonth() + monthsLimit);

  const diff = nextAllowedDate.getTime() - now;
  if (diff <= 0) return { allowed: true, breakdown: null };

  const totalSeconds = Math.floor(diff / 1000);
  return {
    allowed: false,
    breakdown: {
      years: Math.floor(totalSeconds / (86400 * 365)),
      months: Math.floor((totalSeconds % (86400 * 365)) / (86400 * 30)),
      days: Math.floor((totalSeconds % (86400 * 30)) / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    },
  };
};

//  Hook: re-runs every second
export const useIdeaSubmissionStatus = ({ userIdeas, level }) => {
  const [status, setStatus] = useState(() =>
    checkIdeaSubmissionLimit({ userIdeas, level }),
  );

  useEffect(() => {
    const s = checkIdeaSubmissionLimit({ userIdeas, level });
    setStatus(s);

    if (s.allowed) return;

    const interval = setInterval(() => {
      const next = checkIdeaSubmissionLimit({ userIdeas, level });
      setStatus(next);
      if (next.allowed) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [JSON.stringify(userIdeas), level]);

  return status;
};

export const CountdownLabel = ({ breakdown }) => {
  if (!breakdown) return null;

  const { years, months, days, hours, minutes, seconds } = breakdown;

  const all = [
    { value: years, label: "year" },
    { value: months, label: "month" },
    { value: days, label: "day" },
    { value: hours, label: "hour" },
    { value: minutes, label: "minute" },
    { value: seconds, label: "second" },
  ];

  const firstNonZero = all.findIndex((u) => u.value > 0);
  const visible =
    firstNonZero === -1
      ? [all[5]]
      : all.slice(firstNonZero, Math.min(firstNonZero + 3, all.length));

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid #f5c6cb",
        boxShadow: "0 2px 8px rgba(220, 53, 69, 0.1)",
        minWidth: "fit-content",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "#721c24",
          opacity: 0.8,
        }}
      >
        🕐 Next Submission Available
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {visible.map(({ value, label }, i) => (
          <span key={label}>
            <span
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                backgroundColor: "#fff",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #f5c6cb",
                minWidth: "50px",
              }}
            >
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#dc3545",
                  lineHeight: "1",
                }}
              >
                {String(value).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "500",
                  color: "#721c24",
                  opacity: 0.7,
                  textTransform: "uppercase",
                  letterSpacing: "0.3px",
                }}
              >
                {label}
              </span>
            </span>
            {i < visible.length - 1 && (
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#dc3545",
                  margin: "0 4px",
                  opacity: 0.5,
                }}
              >
                :
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
