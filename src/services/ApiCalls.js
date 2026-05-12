import Axios from "./Axios";
import API_URL from "./URLS";

export const LOGIN_USER = (data) => Axios.post(API_URL.LOGIN_USER, data);
export const SIGNUPUSER = (data) => Axios.post(API_URL.SIGNUP_USER, data);
export const CHANGE_PASSWORD = (data) => Axios.post(API_URL.CHANGE_PASSWORD, data);
export const FILEUPLOAD = (data) => Axios.post(API_URL.FILE_UPLOAD, data);
export const CATEGORYLISt = (data) => Axios.post(API_URL.CATEGORY_LIST, data);

// constituency api 
export const CONSTITUENCY_LIST = (data) => Axios.post(API_URL.CONSTITUENCY_LIST, data);
export const CONSTITUENCY_DETAIL = (id) => Axios.get(API_URL.CONSTITUENCY_DETAIL + id);
export const MY_CONSTITUENCY_LIST = (data) => Axios.post(API_URL.MY_CONSTITUENCY_LIST, data);
export const CONSTITUENCY_ADD = (data) => Axios.post(API_URL.CONSTITUENCY_ADD, data);
export const CONSTITUENCY_REMOVE = (id) => Axios.post(API_URL.CONSTITUENCY_REMOVE, { id });
export const CONSTITUENCY_NEW_DETAILS = (data) => Axios.get(API_URL.CONSTITUENCY_DETAIL_INFO + data?.constituencyId)
export const USER_UPDATE_CONSTITUENCY_DETAIL = (data) => Axios.post(API_URL.USER_UPDATE_CONSTITUENCY_DETAIL, data)

export const CATEGORYLIST = (data) => Axios.post(API_URL.CATEGORY_LIST, data);
export const POSTLIST = (data) => Axios.post(API_URL.POST_LIST, data);
export const POSTDETAILS = (id) => Axios.get(API_URL.POST_DETAILS + id);
export const GETPROFILE = () => Axios.get(API_URL.GET_PROFILE)
export const EDITPROFILE = (data) => Axios.post(API_URL.EDIT_PROFILE, data)
export const CHANGEPASSWORD = (data) => Axios.post(API_URL.CHANGE_PASSWORDS, data)
export const NOTIFICATIONSETTINGS = (data) => Axios.post(API_URL.NOTIFICATION_SETTINGS, data)
export const USERLOGOUT = () => Axios.post(API_URL.USER_LOGOUT)
export const USERDELETEACCOUNT = (data) => Axios.post(API_URL.USER_DELETE_ACCOUNT, data)

// EVENT manage
export const EVENTLISTAPI = (data) => Axios.post(API_URL.EVENT_LIST, data)
export const ALL_EVENT_LIST_API = (data) => Axios.post(API_URL.ALL_EVENT_LIST_API, data)
export const ADDEVENTAPI = (data) => Axios.post(API_URL.ADD_EVENT, data)
export const UPDATEEVENT = (data) => Axios.post(API_URL.UPDATE_EVENT, data)
export const DETAILEVENT = (data) => Axios.post(API_URL.DETAIL_EVENT + data)
export const CANCELEVENT = (data) => Axios.post(API_URL.EVENT_CANCEL, data)


// ideas feedapi 
export const AVAILABLE_IDEAS_LIST = (data) => Axios.post(API_URL.AVAILABLE_IDEAS_LIST, data)
export const MYADOPTEDIDEAS = (data) => Axios.post(API_URL.ADDOPTED_IDEAS, data)
export const IDEASADOPTEDADD = (data) => Axios.post(API_URL.IDEAS_ADOPT, data)
export const IDEASREMOVE = (data) => Axios.post(API_URL.IDEAS_REMOVE, data)
export const IDEASCOMMITMENET = (data) => Axios.post(API_URL.IDEAS_COMMITEMENT, data)
export const IDEASREPORT = (data) => Axios.post(API_URL.IDEAS_REPORT, data)
export const IDEAS_LIST = (data) => Axios.post(API_URL.IDEAS_LIST, data)
export const IDEAS_CATEGORY_LIST = (data) => Axios.post(API_URL.IDEAS_CATEGORY_LIST, data)
export const NEW_IDEAS_SUBMIT = (data) => Axios.post(API_URL.NEW_IDEAS_SUBMIT, data)
export const MY_IDEAS_LIST = (data) => Axios.post(API_URL.MY_IDEAS_LIST, data)
// Ideas judged add
export const IDEASJUDEGED = (data) => Axios.post(API_URL.IDEAS_JUDEGED, data)
export const IDEASCOMMENTSLIST = (data) => Axios.post(API_URL.IDEAS_COMMENTS_LIST, data)


// campaign details
export const CAMPAIGNADD = (data) => Axios.post(API_URL.CAMPAIGN_ADD, data)
export const CAMPAIGNMEDIA = (data) => Axios.post(API_URL.CAMPAIGN_MEDIA, data)
export const CAMPAIGNREPLACE = (data) => Axios.post(API_URL.CAMPAIGN_REPLACE, data)
export const CAMPAGINDETAIL = (data) => Axios.get(API_URL.CAMPAIGN_MEDIA_DETAILS + data)
export const CAMPAIGNUPDATESTATUS = (data) => Axios.post(API_URL.CAMPAIGN_MEDIA_UPDATE_STATUS, data)


export const SIMILARPOST = (data) => Axios.post(API_URL.SIMILAR_ADS, data);
export const UPDATEPROFILE = (data) => Axios.post(API_URL.PROFILE_UPDATE, data);
export const DELETEPROFILE = (data) => Axios.post(API_URL.PROFILE_DELETE, data);
export const FORGOT_PASSWORD = (data) => Axios.post(API_URL.FORGOT_PASSWORD, data);
export const RESEND_OTP = (data) => Axios.post(API_URL.RESEND_OTP, data);
export const RESET_PASSWORD = (data) => Axios.post(API_URL.RESET_PASSWORD, data);
export const LOG_OUT = () => Axios.get(API_URL.LOG_OUT);
export const FAQ_LIST = (data) => Axios.get(API_URL.FAQ_LIST);
export const SUBSCRIPTION_PLAN = (data) => Axios.post(API_URL.SUBSCRIPTION_PLAN, data);

export const CANDIDATE_LIST = (data) => Axios.post(API_URL.CANDIDATE_LIST, data);
export const CANDIDATE_DETAIL = (data) => Axios.get(API_URL.CANDIDATE_DETAIL + data);
export const FETCH_NOTIFICATION_LIST = (data) => Axios.post(API_URL.FETCH_NOTIFICATION_LIST, data);
export const CANDIDATE_WITH_RESUME_LIST = (data) => Axios.post(API_URL.CANDIDATE_WITH_RESUME_LIST, data);

export const FETCH_TERM_CONDITION = API_URL.API_URL + API_URL.FETCH_TERM_CONDITION;
export const FETCH_PRIVACY_POLICY = API_URL.API_URL + API_URL.FETCH_PRIVACY_POLICY;
export const FETCH_ABOUT_US = API_URL.API_URL + API_URL.FETCH_ABOUT_US;

export const DASHBOARD_SUMMARY = (data) => Axios.post(API_URL.DASHBOARD_SUMMARY, data);
export const DASHBOARD_PLEDGE_CHART = (data) => Axios.post(API_URL.DASHBOARD_PLEDGE_CHART, data);
export const DASHBOARD_CONSTITUENCY_SNAP = (data) => Axios.post(API_URL.DASHBOARD_CONSTITUENCY_SNAP, data);
export const DASHBOARD_TOP_IDEAS = (data) => Axios.post(API_URL.DASHBOARD_TOP_IDEAS, data);
export const DASHBOARD_UPCOMING_EVENTS = (data) => Axios.post(API_URL.DASHBOARD_UPCOMING_EVENTS, data);
export const CANDIDATE_UPCOMING_EVENT_LIST = (data) => Axios.post(API_URL.CANDIDATE_UPCOMING_EVENT_LIST, data)


export const UPDATE_RESUME = (data) => Axios.post(API_URL.UPDATE_RESUME, data);
export const NEW_VOTE_PLEDGE = (data) => Axios.post(API_URL.NEW_VOTE_PLEDGE, data);
export const DONATION_PAY = (data) => Axios.post(API_URL.DONATION_PAY, data);
export const DONATION_CANCEL = (data) => Axios.post(API_URL.DONATION_CANCEL, data);
export const DONATION_DETAILS = () => Axios.get(API_URL.DONATION_DETAILS);
export const USER_TRANSACTION_LIST = (data) =>
  Axios.post(API_URL.USER_TRANSACTION_LIST, data);
