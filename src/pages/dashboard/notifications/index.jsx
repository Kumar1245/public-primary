import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import DashboardLayout from "../../../Layout/Dashboardlayout";
import Image from "next/image";
import BreadCrumb from "../../../Component/Common/BreadCrumb";
import { FETCH_NOTIFICATION_LIST } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";
import { getRelativeTime } from "../../../lib/helper";



const Notifications = () => {
  const [body, setBody] = useState({
    page: 1,
    limit: 8,
  });

  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / body.limit);

  const { data: notificationsToday, isFetching } = useQuery({
    queryKey: ["notification-list", body.page],
    queryFn: async () => {
      const res = await FETCH_NOTIFICATION_LIST({ ...body, type: "today" });

      const success = checkResponse({ res, setTotal: setTotalCount });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  const { data: notificationsPast, isFetching: isPastFetching } = useQuery({
    queryKey: ["notification-list", body.page],
    queryFn: async () => {
      const res = await FETCH_NOTIFICATION_LIST({ ...body, type: "past" });

      const success = checkResponse({ res, setTotal: setTotalCount });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  return (
    <>
      <section className="dashboardWrap pageantsWrap">
        <Container fluid>
          <div className="sectionheadings">
            <h3 className="fw-bold">Notifications</h3>
            <BreadCrumb />
          </div>

          <div className="today_notification d-flex align-items-center justify-content-between mb-3">
            <h5 className="m-0 text-black">Today Notifications</h5>
            {notificationsToday?.length > 0 || notificationsPast?.length > 0 ? (
              <Button className="clearAll">Clear All</Button>
            ) : null}
          </div>

          <ul className="notificationList m-0 p-0">
            {isFetching && (
              <li className="loader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </li>
            )}
            {notificationsToday?.map((notification, idx) => {
              return (
                <li key={idx}>
                  <div className="notificationItem commonCard p-2 d-flex align-items-center gap-3">
                    {/* <div className="notificationIcon d-flex align-items-center justify-content-center">
                      {notification.icon}
                    </div> */}
                    <div className="notificationContent">
                      <p className="notificationTitle m-0 ">
                        {notification?.title}
                      </p>
                      <div className="d-flex gap-2 justify-content-between">
                        <p className="notificationMessage m-0 ">
                          {notification?.message || notification?.body}
                        </p>
                        <p className="notificationTime m-0">
                          {notification?.date_created_utc &&
                            getRelativeTime(notification?.date_created_utc)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            {!isFetching && notificationsToday?.length === 0 && (
              <p className="text-center">No notifications found.</p>
            )}
          </ul>

          <div className="today_notification d-flex align-items-center justify-content-between my-4">
            <h5 className="m-0 text-black">Past Notifications</h5>
          </div>

          <ul className="notificationList m-0 p-0">
            {isPastFetching && (
              <li className="loader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </li>
            )}
            {notificationsPast?.map((notification, idx) => {
              return (
                <li key={idx}>
                  <div className="notificationItem commonCard p-2 d-flex align-items-center gap-3">
                    {/* <div className="notificationIcon d-flex align-items-center justify-content-center">
                      {notification.icon}
                    </div> */}
                    <div className="notificationContent">
                      <p className="notificationTitle m-0 ">
                        {notification?.title}
                      </p>
                      <div className="d-flex gap-2 justify-content-between">
                        <p className="notificationMessage m-0 ">
                          {notification?.message || notification?.body}
                        </p>
                        <p className="notificationTime m-0">
                          {notification?.date_created_utc &&
                            getRelativeTime(notification?.date_created_utc)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            {!isPastFetching && notificationsPast?.length === 0 && (
              <p className="text-center">No notifications found.</p>
            )}
          </ul>
        </Container>
      </section>
    </>
  );
};

export default Notifications;

Notifications.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
