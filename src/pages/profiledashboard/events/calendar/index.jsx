import React, { useMemo, useState } from "react";
import VoterProfilelayout from "../../../../Layout/VoterProfilelayout";
import { Eventcaladerlisticon } from "../../../../Assets/svg/Allsvgicons";
import CommonProfilehead from "../../../../Component/ui/CommonProfilehead";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import { useRouter } from "next/router";
import { ALL_EVENT_LIST_API } from "../../../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../../../Utilities/commonFunc";

/* ---------------- helpers ---------------- */

const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0 → 23

const formatHourLabel = (hour) =>
  hour === 0
    ? "12 am"
    : hour < 12
      ? `${hour} am`
      : hour === 12
        ? "12 pm"
        : `${hour - 12} pm`;

const getEventColor = (type) => {
  switch (type) {
    case "MEET_AND_GREET":
      return "green";
    case "TOWN_HALL":
      return "blue";
    case "RALLY":
      return "purple";
    default:
      return "blue";
  }
};

const buildEventDateTime = (eventDate, time) => {
  const date = new Date(eventDate); // local date (midnight)
  const [t, meridian] = time.split(" ");
  let [hours, minutes] = t.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  date.setHours(hours, minutes, 0, 0);
  return date;
};

/* ---------------- component ---------------- */

const Calendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());

  /* ---- fetch events ---- */
  const { data: events = [] } = useQuery({
    queryKey: ["all-event-list"],
    queryFn: async () => {
      const res = await ALL_EVENT_LIST_API();
      return checkResponse({ res }) ? res?.data?.data || [] : [];
    },
    keepPreviousData: true,
  });

  const changeWeek = (value) => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + value);
      return d;
    });
  };

  /* ---- calendar days (Mon → Sun ALWAYS) ---- */
  const days = useMemo(() => {
    const base = new Date(currentDate);
    const day = base.getDay(); // 0 = Sun
    const diff = day === 0 ? -6 : 1 - day;

    const monday = new Date(base);
    monday.setDate(base.getDate() + diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [currentDate]);

  const timeToHour = (time) => {
    // supports "12:18 AM", "07:18 PM", "9:00 AM"
    const [t, modifier] = time.split(" ");
    let [hours] = t.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours;
  };

  /* ---- render events (DATE ONLY — safe) ---- */
  const renderEvent = (day, hour) => {
    const now = new Date();

    return events
      .filter((e) => {
        const eventDateTime = buildEventDateTime(e.eventDate, e.startTime);

        return (
          eventDateTime.toDateString() === day.toDateString() &&
          eventDateTime.getHours() === hour
        );
      })
      .map((e) => {
        const eventDateTime = buildEventDateTime(e.eventDate, e.startTime);

        const isCompleted = eventDateTime < now;

        return (
          <div
            key={e._id}
            className={`event ${isCompleted ? "green" : "blue"} text-truncate`}
            style={{ width: "100px", cursor: "pointer" }}
            title={`${e.title} (${e.startTime} - ${e.endTime})`}
          >
            {e.title}
          </div>
        );
      });
  };

  return (
    <section className="CalenderWrap p-3">
      <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
        <CommonProfilehead title="Events" />

        <Buttontheme
          className="calendarBtn"
          onClick={() => router.push("/profiledashboard/events")}
        >
          <Eventcaladerlisticon /> List View
        </Buttontheme>
      </div>

      <div className="calenderInner border p-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <h4 className="m-0">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h4>

          <div className="carrow_cell d-flex gap-3">
            <button className="arrow_btn" onClick={() => changeWeek(-7)}>
              ‹
            </button>
            <button className="arrow_btn" onClick={() => changeWeek(7)}>
              ›
            </button>
          </div>
        </div>

        <div className="calendar">
          {/* header */}
          <div className="row calendar_header">
            <div className="cell time" />
            {days.map((d) => (
              <div key={d.toISOString()} className="cell day">
                <p className="m-0">{d.getDate()}</p>
                <span>
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </div>
            ))}
          </div>

          {/* rows */}
          {HOURS.map((hour) => (
            <div key={hour} className="row">
              <div className="cell time">{formatHourLabel(hour)}</div>

              {days.map((day) => (
                <div key={`${day.toISOString()}-${hour}`} className="cell">
                  {renderEvent(day, hour)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;

Calendar.getLayout = function getLayout(page) {
  return <VoterProfilelayout>{page}</VoterProfilelayout>;
};
