import { toast } from "react-hot-toast";

export const successToast = (message) => {
  toast.dismiss();
  toast.success(message);
};

export const errorToast = (message) => {
  toast.dismiss();
  toast.error(message);
};

export const warningToast = (message) => {
  toast.dismiss();
  toast.warning(message);
};
