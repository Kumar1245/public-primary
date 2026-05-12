import moment from "moment/moment";

export const formattedDate = (date) => {
  if (!date || !date?.trim()) return "";
  return moment(date).format("MMMM DD, YYYY");
};

export const formattedTime = (date) => {
    if (!date || !date?.trim() || date?.trim() == "") return "";
    return moment(date).format("hh:mm A")
}

export const formattedYear = (date) => {
    if (!date || !date?.trim() || date?.trim() == "") return "";
    return moment(date).format("YYYY")
}