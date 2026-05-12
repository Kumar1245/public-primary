import Image from "next/image";

const getFirstPositiveInteger = (...values) => {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return value;
    }

    if (typeof value === "string") {
      const match = value.match(/\d+/);
      if (match) {
        const parsed = Number(match[0]);
        if (Number.isFinite(parsed) && parsed > 0) {
          return parsed;
        }
      }
    }
  }

  return null;
};

const cleanLabel = (value = "") => {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
};

const extractFirstNumber = (value = "") => {
  if (typeof value !== "string") return null;
  const match = value.match(/\d+/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export const truncateTextByWords = (
  text = "",
  maxLength = 120,
  dots = true,
) => {
  if (typeof text !== "string") return "";

  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  return truncated.slice(0, truncated.lastIndexOf(" ")) + (dots ? "..." : "");
};

export const renderMedia = (link) => {
  if (!link) return null;

  const url = link.toLowerCase();

  const isVideo =
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".ogg") ||
    url.endsWith(".mov");

  if (isVideo) {
    return (
      <video
        src={link}
        controls
        className="img-fluid"
        // style={{ maxWidth: "100%", height: "auto" }}
      />
    );
  }

  return (
    <Image
      src={link}
      alt="media"
      width={500}
      height={500}
      className="img-fluid"
    />
  );
};

export const getRelativeTime = (date) => {
  if (!date) return "";

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} sec ago`;
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

export const getTimeAgo = (date) => {
  if (!date) return "just now";

  const time = new Date(date).getTime();
  if (isNaN(time)) return "just now";

  const diffSeconds = Math.floor((Date.now() - time) / 1000);

  if (diffSeconds < 10) return "just now";
  if (diffSeconds < 60) return `${diffSeconds} sec ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;

  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
};

export const maskIdentity = (name, identityNumber = "1234") => {
  if (!name) return "";

  const namePart = name.trim().substring(0, 4);

  const typePart = "VR";

  const lastFour = (identityNumber || 1234)
    .toString()
    .replace(/\D/g, "")
    .slice(-4);

  return `${namePart}…${typePart}…${lastFour}`;
};

export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "0";
  return Number(value).toLocaleString("en-US");
};

export const getConstituencySeatLabel = (data = {}, stateName = "") => {
  const nameLabel = cleanLabel(data?.name);
  const districtNameLabel = cleanLabel(data?.districtName);
  const normalizedName = nameLabel.toLowerCase();
  const isUSPresident = normalizedName.includes("us president");
  const isUSSenator = normalizedName.includes("us senator");
  const directDistrictNumber = getFirstPositiveInteger(data?.totalDistrict);
  const directDistrictTotal = getFirstPositiveInteger(data?.globalTotalDistrict);

  if (isUSPresident) {
    return null;
  }

  if (isUSSenator) {
    const seatNumber = getFirstPositiveInteger(
      data?.seatNumber,
      data?.electedSeat,
      extractFirstNumber(nameLabel),
    );

    if (!seatNumber || seatNumber > 2) {
      return null;
    }

    return `Seat ${seatNumber} of 2`;
  }

  if (!directDistrictNumber || !directDistrictTotal) {
    return null;
  }

  return `District ${directDistrictNumber} of ${directDistrictTotal}`;
};
