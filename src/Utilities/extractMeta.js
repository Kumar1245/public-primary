export const extractMeta = (arr, key) => {
  if (!Array.isArray(arr)) return "N/A";
  const item = arr.find((entry) => entry.key === key);
  return item?.value || "N/A";
};

export const extractMultipleValues = ({ dataArray = [], keysArray = [] }) => {
  if (!Array.isArray(dataArray)) return null;
  if (!Array.isArray(keysArray)) return null;
  const resultArray = [];
  for (let i = 0; i < keysArray.length; i++) {
    resultArray.push(extractMeta(dataArray, keysArray[i]));
  }
  return resultArray;
};
export const getMetaValue = (metaData = [], key) => {
  const value = metaData.find((item) => item.key === key)?.value;

  if (!value) return null;
  if (typeof value !== "string") return null;
  if (value === "N/A") return null;

  return value;
};

export const getSafeMetaImage = (metaData = [], key, fallback) => {
  const value = metaData.find(item => item.key === key)?.value;

  if (
    typeof value === "string" &&
    value !== "N/A" &&
    (value.startsWith("http://") || value.startsWith("https://"))
  ) {
    return value;
  }

  return fallback;
};

