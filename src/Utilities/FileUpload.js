// import toast from "react-hot-toast";
// import { FILEUPLOAD } from "../services/ApiCalls";

// const fileUploader = async (file, options) => {

//   const { isVideoType } = options || { isVideoType: false }
//   try {
//     // Validate file type
//     let allowedExtensions = ["svg", "jpg", "png", "jpeg", "webp"];

//     if (isVideoType) {
//       allowedExtensions = [...allowedExtensions, "mp4"];
//     }

//     const fileExtension = file.name.split(".").pop().toLowerCase();

//     if (!allowedExtensions.includes(fileExtension)) {
//       toast.error(
//         `Unsupported file type. Only SVG, JPG, PNG, and JPEG${isVideoType ? " MP4 " : " "
//         }files are allowed.`
//       );
//       return false;
//     }

//     const maxSize = 5 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error("File size exceeds 5MB limit");
//       return false;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await FILEUPLOAD(formData);

//     if (res?.data?.status === "success") {
//       return res.data.data;
//     } else {
//       toast.error(res?.data?.message || "Upload failed");
//       return false;
//     }
//   } catch (error) {
//     console.error("Upload error:", error);
//     toast.error("Something went wrong while uploading image");
//     return false;
//   }
// };

// export default fileUploader;

import toast from "react-hot-toast";
import { FILEUPLOAD } from "../services/ApiCalls";

const fileUploader = async (file, options = {}) => {
  const { isVideoType = false } = options;

  try {
    // ✅ Allowed extensions
    const imageExtensions = ["svg", "jpg", "png", "jpeg", "webp"];
    const videoExtensions = ["mp4"];

    const allowedExtensions = isVideoType
      ? [...imageExtensions, ...videoExtensions]
      : imageExtensions;

    const fileExtension = file?.name?.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(
        `Unsupported file type. Allowed: ${allowedExtensions.join(", ").toUpperCase()}`
      );
      return null;
    }

    // ✅ Size limits
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

    const maxSize = isVideoType ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

    if (file.size > maxSize) {
      toast.error(
        `File size exceeds ${isVideoType ? "50MB" : "5MB"} limit`
      );
      return null;
    }

    // ✅ Upload
    const formData = new FormData();
    formData.append("file", file);

    const res = await FILEUPLOAD(formData);

    if (res?.data?.status === "success") {
      return res.data.data; // { link, key, etc }
    }

    toast.error(res?.data?.message || "Upload failed");
    return null;
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Something went wrong while uploading");
    return null;
  }
};

export default fileUploader;
