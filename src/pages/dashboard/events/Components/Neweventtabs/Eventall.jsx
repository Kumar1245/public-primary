import React, { useState, useEffect } from "react";
import EventsCard from "../../../../../Component/CommonCard/EventsCard";
import EventsCardSkeleton from "../../../../../Component/Skelton/EventsCardSkeleton";
import CanceleventMod from "../../Modal/CanceleventMod";
import AddeventMod from "../../Modal/AddeventMod";
import Nodata from "../../../../../Component/ui/Nodata";
import { CANCELEVENT } from "../../../../../services/ApiCalls";
import {
  errorToast,
  successToast,
} from "../../../../../Utilities/toastsMessages";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
const Eventall = ({ data = [] }) => {
  const queryClient=useQueryClient()
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditModal(true);
  };

  const handleCancelClick = (event) => {
    setSelectedEvent(event);
    setCancelModal(true);
  };

  const handleCancelEvent = async (event) => {
    if (!event?._id) return;

    try {
      const res = await CANCELEVENT({ id: event._id });

      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Event canceled");

        setCancelModal(false);
        setSelectedEvent(null);
        queryClient.invalidateQueries(["EventList"]);
      } else {
        errorToast(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
      errorToast("Failed to cancel event");
    }
  };

  return (
    <div>
      <AddeventMod
        show={editModal}
        editData={selectedEvent}
        onhide={() => {
          setEditModal(false);
          setSelectedEvent(null);
        }}
      />

      <CanceleventMod
        show={cancelModal}
        eventData={selectedEvent}
        onhide={() => {
          setCancelModal(false);
          setSelectedEvent(null);
        }}
        handleCancelEvent={handleCancelEvent}
      />

      <div className="alltopvoters pe-3">
        <ul className="m-0 p-0">
          {loading ? (
            [...Array(3)].map((_, idx) => (
              <li key={idx}>
                <EventsCardSkeleton />
              </li>
            ))
          ) : data.length === 0 ? (
            <Nodata />
          ) : (
            data?.map((item) => (
              <li key={item._id}>
                <EventsCard
                  data={item}
                  onEditClick={() => handleEditClick(item)}
                  onCancelClick={() => handleCancelClick(item)}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Eventall;
