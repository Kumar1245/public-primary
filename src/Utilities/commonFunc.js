import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UPLOAD_FILE } from "../services/ApiCalls";

export const makeQueryStringFunc = (query) => {
  if (!query && typeof query !== "object") {
    return "";
  }

  const queryArr = Object.keys(query);

  let queryString = "?";

  queryArr.forEach((item) => {
    let itemString = `${item}=`;
    itemString += `${query[item]}&`;
    queryString += itemString;
  });
  return queryString;
};

export const catchAsync = ({ fn, setLoader, callBack }) => {
  return (...arg) =>
    fn(...arg).catch((error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message || "something went wrong");
      setLoader && setLoader(false);
      callBack && callBack();
      console.log(error, "error");
    });
};

const removeUnderScoreAndCapitalFirstLetter = (str) => {
  if (!str) return "";
  const withSpaces = str.replace(/_/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
};

export const checkResponse = ({
  res,
  setData,
  setTotal,
  showSuccess,
  dataToSet,
  setLoader,
  totalCount,
  navigate,
  navigateUrl,
}) => {
  if (res?.data?.status === "success" || res?.status === "success") {
    setData && setData((dataToSet && dataToSet(res?.data)) || res?.data?.data);
    setTotal &&
      setTotal(
        totalCount ||
        res?.data?.data?.totalRecord ||
        res?.data?.total_count ||
        res?.data?.totalcount
      );
    showSuccess &&
      (toast.dismiss(),
        toast.success(removeUnderScoreAndCapitalFirstLetter(res?.data?.message)));
    setLoader && setLoader(false);
    navigate && navigate(navigateUrl);
    return true;
  } else {
    toast.dismiss();
    toast.error(
      removeUnderScoreAndCapitalFirstLetter(res?.data?.message) ||
      "Something went wrong!"
    );
    console.log(res?.data?.message, "Error in check response");
    setLoader && setLoader(false);
    return false;
  }
};

export const getMediaType = (url) => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp",
    ".svg",
  ];
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
  const audioExtensions = [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac"];
  const documentExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
    ".csv",
    ".rtf",
  ];

  const audioPatterns = [/\.audio_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/];
  const lowerUrl = url?.toLowerCase();

  if (imageExtensions.some((ext) => lowerUrl?.endsWith(ext))) {
    return "image";
  } else if (videoExtensions.some((ext) => lowerUrl?.endsWith(ext))) {
    return "video";
  } else if (
    audioExtensions.some((ext) => lowerUrl?.endsWith(ext)) ||
    audioPatterns.some((pattern) => pattern.test(lowerUrl))
  ) {
    return "audio";
  } else if (documentExtensions.some((ext) => lowerUrl?.endsWith(ext))) {
    return "document";
  } else {
    return "unknown";
  }
};
