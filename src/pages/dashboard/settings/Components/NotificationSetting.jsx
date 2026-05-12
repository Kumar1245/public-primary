import React, { useState } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import Link from "next/link";
import {
  Changepassicon,
  Deleteaccounticon,
  Notificationbell,
} from "../../../../Assets/svg/Allsvgicons";
import PasswordChange from "./PasswordChange";
import DeleteaccountMod from "../Modal/DeleteaccountMod";
import {
  NOTIFICATIONSETTINGS,
  USERDELETEACCOUNT,
} from "../../../../services/ApiCalls";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";
import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import { useFirebase } from "../../../../firebase/firebase";

const accordionData = [
  {
    id: 1,
    title: (
      <div className="d-flex align-items-center">
        <span className="me-3">
          <Changepassicon />
        </span>
        <div className="notify_text">
          <h4>Change Password</h4>
        </div>
      </div>
    ),
    content: (
      <div className="showfifty">
        <PasswordChange />
      </div>
    ),
  },
];

const NotificationSetting = ({ data }) => {
  const { logout } = useAuth();
  const { token, message } = useFirebase();
  const [deleteModal, setDeleteModal] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(
    data?.enablePushNotification || false,
  );
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

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

  const handleConfirmDelete = async () => {
    if (deleteLoading) return;

    setDeleteLoading(true);
    try {
      const res = await USERDELETEACCOUNT();
      if (res?.data?.status === "success") {
        successToast(res?.data?.message);
        logout();
        router.push("/");
      } else {
        errorToast(res?.data?.message);
      }
    } catch (err) {
      errorToast("Account deletion failed");
    } finally {
      setDeleteLoading(false);
      setDeleteModal(false);
    }
  };

  return (
    <>
      <DeleteaccountMod
        show={deleteModal}
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onhide={() => setDeleteModal(false)}
      />

      <div className="settingFormWrap">
        <div className="payouthead d-flex align-items-center justify-content-between">
          <h4 className="mb-3 text-black">Account Settings</h4>
        </div>

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
                  </div>
                </div>

                <label className="switch">
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

            <li>
              <div className="notificaitonBox">
                <Accordion>
                  {accordionData?.map((item, idx) => (
                    <Accordion.Item eventKey={idx.toString()} key={item.id}>
                      <Accordion.Header>{item.title}</Accordion.Header>
                      <Accordion.Body>{item.content}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </li>

            <li>
              <Link
                href="#"
                className="text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteModal(true);
                }}
              >
                <div className="deleteAccount">
                  <div className="d-flex align-items-center">
                    <span className="me-3">
                      <Deleteaccounticon />
                    </span>
                    <div className="notify_text">
                      <h4 className="text_red">Delete Account</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NotificationSetting;
