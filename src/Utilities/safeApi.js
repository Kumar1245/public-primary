import { toast } from "react-hot-toast";

// utils/safeApi.js
export const safeApi = async (
  promise,
  fallback = [],
  showError = false,
  showToast = false
) => {
  try {
    const res = await promise;
    const data = res?.data;

    if (data?.status === "success" && data?.data !== undefined) {
      if (showToast) toast.success(data?.message || "success");
      return data.data;
    } else {
      if (showToast) toast.error(data?.message || "something went wrong");
      if (showError) console.warn("Unexpected API response format:", data); // also can show toast here
      return fallback;
    }
  } catch (err) {
    if (showToast)
      toast.error(
        err?.response?.data?.message || err?.message || "something went wrong"
      );
    if (showError) console.error("API error:", err);
    return fallback;
  }
};
