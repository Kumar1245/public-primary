import React, { useState } from "react";
import { Accordion, Spinner } from "react-bootstrap";

import {
  Changepassicon,
  Deleteaccounticon,
  Emailsetting,
  Notificationbell,
  SmsAlert,
} from "../../../../Assets/svg/Allsvgicons";
import { useFirebase } from "../../../../firebase/firebase";
import { NOTIFICATIONSETTINGS } from "../../../../services/ApiCalls";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";

const NotificationSetting = (data) => {
  const { token, message } = useFirebase();
  const [notificationEnabled, setNotificationEnabled] = useState(
    data?.enablePushNotification || false,
  );
  const [notificationLoading, setNotificationLoading] = useState(false);

  const handleNotificationToggle = async () => {
    if (notificationLoading) return;
    const newValue = !notificationEnabled;
    setNotificationLoading(true);
    try {
      const res = await NOTIFICATIONSETTINGS({
        enablePushNotification: newValue,
        firebaseToken: token,
      });

      if (res?.data?.status === "success") {
        setNotificationEnabled(newValue);
        successToast(res?.data?.message);
      } else {
        errorToast(res?.data?.message || "Something went wrong");
      }
    } catch (err) {
      errorToast("Failed to update notification setting");
    } finally {
      setNotificationLoading(false);
    }
  };

  return (
    <>
      <div className="profilesettingFormWrap">
        <div className="notificationInner">
          <ul>
            <li>
              <div className="notificaitonBox d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-3">
                    <Notificationbell />
                  </span>
                  <div className="notify_text">
                    <h4>Push Notifications</h4>
                    <p className="m-0">Instant updates on your phone</p>
                  </div>
                </div>
                <label class="switch">
                  {!notificationLoading ? (
                    <>
                      <input
                        type="checkbox"
                        checked={notificationEnabled}
                        disabled={notificationLoading}
                        onChange={handleNotificationToggle}
                      />
                      <span class="slider round"></span>
                    </>
                  ) : (
                    <div className="loader d-flex justify-content-center align-items-center">
                      <Spinner animation="border" />
                    </div>
                  )}
                </label>
              </div>
            </li>

            {/* <li>
              <div className="notificaitonBox d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-3">
                    <Emailsetting />
                  </span>
                  <div className="notify_text">
                    <h4>Email Alerts</h4>
                    <p className="m-0">Daily summaries and key highlights</p>
                  </div>
                </div>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </li>

            <li>
              <div className="notificaitonBox d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-3">
                    <SmsAlert />
                  </span>
                  <div className="notify_text">
                    <h4>SMS Alerts</h4>
                    <p className="m-0">Quick alerts straight to your inbox</p>
                  </div>
                </div>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NotificationSetting;
