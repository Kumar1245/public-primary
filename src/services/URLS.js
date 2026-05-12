import { CHANGE_PASSWORD } from "./ApiCalls";

export default {
  API_URL: "https://public-primary-api.suffescom.dev/",
  SOCKET_URL: "",
  BASE_URL: "",
  //  file Upload
  FILE_UPLOAD: "api/v1/file/add",
  FILE_UPLOAD_WITH_WATERMARK: "api/v1/file/add-with-watermark",
  // edit prifile
  EDIT_PROFILE: "api/v1/user/updateprofile",
  CHANGE_PASSWORDS: "api/v1/user/changepassword",
  NOTIFICATION_SETTINGS: "api/v1/user/enableNotification",
  USER_LOGOUT: "api/v1/user/logout",
  USER_DELETE_ACCOUNT: "api/v1/user/delete",

  UPDATE_RESUME: "api/v1/user/resume",
  // ADMIN
  LOGIN_USER: "api/v1/user/login",
  SIGNUP_USER: "api/v1/user/registration",
  CHANGE_PASSWORD: "api/v1/user/forgotpassword",
  GET_PROFILE: "api/v1/user/profile",
  CATEGORY_LIST: "api/v1/category/list",
  CATEGORY_DETAILS: "api/v1/category/list",
  SOCIAL_LOGIN_USER: "api/v1/user/socialLogin",

  // Constituency list
  CONSTITUENCY_LIST: "api/v1/constituency",
  MY_CONSTITUENCY_LIST: "api/v1/constituency/my",
  CONSTITUENCY_ADD: "api/v1/constituency/add",
  CONSTITUENCY_REMOVE: "api/v1/constituency/remove",
  CONSTITUENCY_DETAIL_INFO: "api/v1/constituency/district-info/",

  EVENT_LIST: "api/v1/event",
  ALL_EVENT_LIST_API: "api/v1/event/all",
  ADD_EVENT: "api/v1/event/add-or-update",
  UPDATE_EVENT: "api/v1/event/add-or-update",
  DETAIL_EVENT: "api/v1/event/detail/",
  EVENT_CANCEL: "api/v1/event/cancel",
  CANDIDATE_UPCOMING_EVENT_LIST: "api/v1/user/candidates/event",
  // campaign media
  CAMPAIGN_MEDIA: "api/v1/campaignMedia",
  CAMPAIGN_ADD: "api/v1/campaignMedia/add-or-replace",
  CAMPAIGN_REPLACE: "api/v1/campaignMedia/add-or-replace",
  CAMPAIGN_MEDIA_DETAILS: "api/v1/campaignMedia/detail/",
  CAMPAIGN_MEDIA_UPDATE_STATUS: "api/v1/campaignMedia/update-status",

  //ideas urls
  AVAILABLE_IDEAS_LIST: "api/v1/ideas/available",
  ADDOPTED_IDEAS: "api/v1/ideas/my-adopted",
  IDEAS_ADOPT: "api/v1/ideas/adopt",
  IDEAS_REMOVE: "api/v1/ideas/remove-adopted",
  IDEAS_COMMITEMENT: "api/v1/ideas/commitment",
  IDEAS_REPORT: "api/v1/ideas/report",
  IDEAS_LIST: "api/v1/ideas/list",
  MY_IDEAS_LIST: "api/v1/ideas/my/list",
  IDEAS_CATEGORY_LIST: "api/v1/ideas/category/list",
  NEW_IDEAS_SUBMIT: "api/v1/ideas/submit",

  // Candidate list
  CANDIDATE_LIST: "api/v1/user/candidates",
  CANDIDATE_DETAIL: "api/v1/user/candidates/detail/",
  CANDIDATE_WITH_RESUME_LIST: "api/v1/user/candidates-with-resume",


  // add judeged by candidates
  IDEAS_COMMENTS_LIST: "api/v1/ideas/ratings-comments/list",
  IDEAS_JUDEGED: "api/v1/ideas/judge",

  // ADDRESSES
  ADD_ADDRESS: "api/v1/address/add",
  EDIT_ADDRESS: "api/v1/address/update",
  ADDRESSES_LIST: "api/v1/address",
  REMOVE_ADDRESS: "/api/v1/address/remove",
  ADDRESS_DEFAULT_STATUS_TOGGLE: "/api/v1/address/default",
  //Profile Update
  PROFILE_UPDATE: "api/v1/user/updateprofile",

  //Profile Delete
  PROFILE_DELETE: "api/v1/user/delete",

  // JOBS

  // TICKETS
  ADD_TICKET: "api/v1/inquiry/add",
  TICKETS_LIST: "api/v1/inquiry/my/list",
  REMOVE_TICKET: "/api/v1/inquiry/remove",

  // POST ADD
  CONSTITUENCY_LIST: "api/v1/constituency",
  CONSTITUENCY_DETAIL: "api/v1/constituency/detail/",
  USER_UPDATE_CONSTITUENCY_DETAIL: "api/v1/constituency/save-user-preference",

  // Payments methods
  ADD_CARD: "api/v1/card/add",
  CARDS_LIST: "api/v1/card/apps",
  REMOVE_CARD: "api/v1/card/remove",
  // CARD_DEFAULT_STATUS_TOGGLE: "api/v1/address/default",

  // wallet
  ADD_AMOUNT: "api/v1/card/addToWallet",
  GET_WALLET_DETAILS: "api/v1/user/wallet/detail",
  USER_TRANSACTION_LIST: "api/v1/user/transaction",


  FETCH_CHAT_HISTORY: "/api/v1/chat/history",
  FETCH_CHAT_USER_LIST: "/api/v1/chat/userList",

  FETCH_TERM_CONDITION: "/api/v1/pages/tac",
  FETCH_PRIVACY_POLICY: "/api/v1/pages/privacypolicy",
  FETCH_ABOUT_US: "/api/v1/pages/aboutus",
  FORGOT_PASSWORD: "api/v1/user/forgotPassword",
  RESET_PASSWORD: "api/v1/user/resetpassword",
  FAQ_LIST: "/api/v1/pages/faq",



  // News letter
  SUBSCRIBE_TO_NEWSLETTER: "/api/v1/user/subscribe/newsLetter",

  GOOGLE_CALLBACK: "/api/auth/google/",
  ADD_CV: "/api/v1/user/cv/create",
  CV_DETAILS: "/api/v1/user/cv/detail",
  FETCH_NOTIFICATION_LIST: "/api/v1/user/notifications",
  DELETE_MULTI_CHATS: '/api/v1/chat/multi-delete',

  DASHBOARD_SUMMARY: "/api/v1/dashboard/summary",
  DASHBOARD_PLEDGE_CHART: "/api/v1/dashboard/pledge-chart",
  DASHBOARD_CONSTITUENCY_SNAP: "/api/v1/dashboard/constituency/snap",
  DASHBOARD_TOP_IDEAS: "/api/v1/dashboard/top-ideas",
  DASHBOARD_UPCOMING_EVENTS: "/api/v1/dashboard/upcoming/events",
  NEW_VOTE_PLEDGE: "api/v1/votePledge/submit",
  DONATION_PAY: "api/v1/user/donation/pay",
  DONATION_CANCEL: "api/v1/user/donation/cancel",
  DONATION_DETAILS: "api/v1/user/donation/details"
};
