import React, { useEffect, useMemo, useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import { Eventclockformicon } from "../../../../Assets/svg/Allsvgicons";
import Textareafield from "../../../../Component/ui/Formfields/Textareafield";
import { Calendar } from "primereact/calendar";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import { Dropdown } from "primereact/dropdown";
import GoogleAutocomplete from "../../../../Component/Common/GoogleAutoComplete";
import { ADDEVENTAPI, UPDATEEVENT } from "../../../../services/ApiCalls";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";
import { useQueryClient } from "@tanstack/react-query";

const schema = Yup.object().shape({
  eventtitle: Yup.string()
    .required("Event title is required")
    .min(3, "Event title must be at least 3 characters"),

  eventype: Yup.string().required("Event type is required"),

  startDate: Yup.date().nullable().required("Start date is required"),

  startTime: Yup.date().nullable().required("Start time is required"),

  time: Yup.date()
    .nullable()
    .required("End time is required")
    .test(
      "end-after-start",
      "End time must be after start time",
      function (endTime) {
        const { startDate, startTime } = this.parent;
        if (!startDate || !startTime || !endTime) return true;

        const start = new Date(startDate);
        start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

        const end = new Date(startDate);
        end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

        return end > start;
      },
    ),

  address: Yup.string().required("Address is required"),

  maximumAttendees: Yup.number()
    .nullable()
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer("Must be a whole number"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

const AddeventMod = ({ onhide, editData = null, ...props }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      eventtitle: "",
      eventype: "",
      startDate: null,
      startTime: null,

      time: null,
      address: "",
      maximumAttendees: null,
      description: "",
    },
  });

  const eventoptions = useMemo(
    () => [
      { label: "Meet & Greet", value: "MEET_AND_GREET" },
      { label: "Rally", value: "RALLY" },
      { label: "Town Hall", value: "TOWN_HALL" },
      { label: "Campaign Event", value: "CAMPAIGN_EVENT" },
      { label: "Volunteer Event", value: "VOLUNTEER_EVENT" },
      { label: "Other", value: "OTHER" },
    ],
    [],
  );

  const parseTimeToDate = (timeStr) => {
    if (!timeStr) return null;

    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const formatTime = (date) =>
    date?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  useEffect(() => {
    if (!editData) return;

    const selectedType = eventoptions.find(
      (opt) => opt.value === editData.type,
    );

    const eventDateObj = editData.eventDate
      ? new Date(editData.eventDate)
      : null;

    reset({
      eventtitle: editData.title || "",
      eventype: editData.type || "",

      startDate: eventDateObj,

      startTime: parseTimeToDate(editData.startTime),
      time: parseTimeToDate(editData.endTime),

      address: editData.location?.address || "",
      lat: editData.location?.lat || null,
      lng: editData.location?.lng || null,

      maximumAttendees: editData.maxAttendees || "",
      description: editData.description || "",
    });
  }, [editData]);

  const addressChangeHandler = (data) => {
    if (!data) return;
    setValue("address", data.address, { shouldValidate: true });
    setValue("lat", data.lat);
    setValue("lng", data.lng);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      title: data.eventtitle,
      type: data.eventype,

      eventDate: data.startDate.toISOString().split("T")[0],
      startTime: formatTime(data.startTime),

      endTime: formatTime(data.time),

      location: {
        address: data.address,
        lat: data.lat || null,
        lng: data.lng || null,
      },

      maxAttendees: data.maximumAttendees || null,
      description: data.description,
    };

    try {
      const res = editData
        ? await UPDATEEVENT({ ...payload, _id: editData._id })
        : await ADDEVENTAPI(payload);

      if (res?.data?.status === "success") {
        setLoading(false);
        successToast(
          res?.data?.message ||
            (editData
              ? "Event Updated Successfully"
              : "Event Created Successfully"),
        );
        queryClient.invalidateQueries(["EventList"]);
        onhide();
      } else {
        setLoading(false);
        errorToast(res?.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      errorToast("Server error. Please try again");
      setLoading(false);
    }
  };
  const handleClose = () => {
    reset({
      eventtitle: "",
      eventype: "",
      startDate: null,
      startTime: null,
      time: null,
      address: "",
      maximumAttendees: null,
      description: "",
      lat: null,
      lng: null,
    });

    onhide();
  };

  return (
    <Modal {...props} size="md" centered className="authmodal nobodypad">
      <Modal.Body>
        <div className="authinner_content">
          <div className="flexedheader p-3 border-bottom text-center">
            <h4 className="fw-semibold">
              {editData ? "Update Event" : "Create New Event"}
            </h4>
            <p className="m-0">
              Schedule a meet & greet or other campaign event
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="forminner p-4">
              <Row>
                <Col lg={12}>
                  <Controller
                    name="eventtitle"
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="Event Title"
                        placeholder="Enter event title"
                        error={errors.eventtitle?.message}
                      />
                    )}
                  />
                </Col>

                <Col lg={12}>
                  <label className="form-label">Event Type</label>
                  <Controller
                    name="eventype"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={eventoptions}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select event type"
                        className="w-100 text_input"
                      />
                    )}
                  />

                  {errors.eventype && (
                    <p className="text-danger">{errors.eventype.message}</p>
                  )}
                </Col>

                <Col lg={6}>
                  <label className="form-label">Start Date</label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <Calendar
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        showIcon
                        placeholder="Enter Event Date"
                        appendTo={
                          typeof window !== "undefined" ? document.body : null
                        }
                        className="dobCalender w-100 text_input p-0"
                      />
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-danger">{errors.startDate.message}</p>
                  )}
                </Col>

                <Col lg={6}>
                  <label className="form-label">Start Time</label>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <Calendar
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        timeOnly
                        placeholder="Pick event start time"
                        hourFormat="12"
                        showIcon
                        appendTo={
                          typeof window !== "undefined" ? document.body : null
                        }
                        className="dobCalender w-100 text_input p-0"
                      />
                    )}
                  />
                  {errors.startTime && (
                    <p className="text-danger">{errors.startTime.message}</p>
                  )}
                </Col>

                <Col lg={6}>
                  <label className="form-label">End Time</label>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <Calendar
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        timeOnly
                        hourFormat="12"
                        placeholder="Pick event end time"
                        showIcon
                        appendTo={
                          typeof window !== "undefined" ? document.body : null
                        }
                        className="dobCalender w-100 text_input p-0"
                        icon={() => <Eventclockformicon />}
                      />
                    )}
                  />
                  {errors.time && (
                    <p className="text-danger">{errors.time.message}</p>
                  )}
                </Col>

                <Col lg={12} className="my-2">
                  <label className="form-label">Address</label>
                  <GoogleAutocomplete
                    address={watch("address")}
                    onChange={addressChangeHandler}
                  />
                  {errors.address && (
                    <p className="text-danger">{errors.address.message}</p>
                  )}
                </Col>

                <Col lg={12}>
                  <Controller
                    name="maximumAttendees"
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        type="number"
                        label="Maximum Attendees (Optional)"
                        placeholder="Leave blank for unlimited"
                        error={errors.maximumAttendees?.message}
                        onChange={(e) => {
                          const v = e.target.value;
                          field.onChange(v === "" ? null : Number(v));
                        }}
                      />
                    )}
                  />
                </Col>

                <Col lg={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textareafield
                        {...field}
                        label="Description"
                        placeholder="Describe what voters can expect..."
                        error={errors.description?.message}
                      />
                    )}
                  />
                </Col>
              </Row>
            </div>

            <div className="flexedfooter px-3 pb-3 border-top d-flex gap-3 py-3">
              <Buttontheme
                type="button"
                className="cancelWhiteBtn w-100"
                onClick={handleClose}
              >
                Cancel
              </Buttontheme>
              <Buttontheme type="submit" className="w-100">
                {loading ? "Saving..." : editData ? "Update Event" : "Create Event"}
              </Buttontheme>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddeventMod;
