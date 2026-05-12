import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import {
  Cameranewicon,
  Eventclockformicon,
  Modalclose,
} from "../../../../Assets/svg/Allsvgicons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Calendar } from "primereact/calendar";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";
import Link from "next/link";
import { UPDATEPROFILE } from "../../../../services/ApiCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";
import GoogleAutocomplete from "../../../../Component/Common/GoogleAutoComplete";
import fileUploader from "../../../../Utilities/FileUpload";
import { City, State } from "country-state-city";
import { Dropdown } from "primereact/dropdown";
import { countyList } from "../../../../Utilities/const";

// image

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobileNumber: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  state: Yup.object().required("State is required"),
  county: Yup.string().when("state", {
    is: (state) => state?.isoCode !== "AK",
    then: (schema) => schema.required("County is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  city: Yup.string().when("state", {
    is: (state) => state?.isoCode === "AK",
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("City is required"),
  }),
});

const EditprofileMod = (props) => {
  const { onhide, profileData, setProfileUpdated } = props;
  const [uploading, setUploading] = useState(false);
  const [stateIso, setStateIso] = useState(null);
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      profileImage: null,
      name: "",
      mobileNumber: "",
      email: "",
      dateOfBirth: null,
      state: "",
      county: "",
      city: "",
      lat: "",
      lng: "",
      profileImageUrl: "",
    },
    values: {
      profileImageUrl: profileData?.profileImage?.link || "",
      profileImage: profileData?.profileImage?._id || null,
      name: profileData?.name || "",
      mobileNumber: profileData?.mobileNumber || "",
      email: profileData?.email || "",
      dateOfBirth: profileData?.dateOfBirth
        ? new Date(profileData.dateOfBirth)
        : null,
      state: profileData?.state
        ? State.getStatesOfCountry("US").find(
            (s) => s.name === profileData.state,
          )
        : null,

      county: profileData?.county || "",
      city: profileData?.city || "",
      address: profileData?.address || "",
      lat: profileData?.userLocation?.coordinates[1] || "",
      lng: profileData?.userLocation?.coordinates[0] || "",
    },
  });
  const selectedState = watch("state");
  const isAlaska = selectedState?.isoCode === "AK";

  useEffect(() => {
    if (watch("state")?.isoCode) {
      setStateIso(watch("state").isoCode);
    }
  }, [watch("state")]);
  useEffect(() => {
    if (isAlaska) {
      setValue("county", "");
    }
  }, [isAlaska]);

  useEffect(() => {
    setProfileUpdated(false);
  }, []);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const { mutate: mutateUpdateProfile, isPending } = useMutation({
    mutationFn: UPDATEPROFILE,

    onSuccess: (res) => {
      successToast(res?.data?.message);
      setProfileUpdated(true);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      onhide();
    },

    onError: (err) => {
      errorToast(err?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    console.log("email send");
    data.state = data.state.name;

    if (isAlaska) {
      delete data.county;
    }

    mutateUpdateProfile(data);
  };

  const addressChangeHandler = (data) => {
    if (!data) return;

    setValue("address", data.address, { shouldValidate: true });
    setValue("lat", data.lat);
    setValue("lng", data.lng);
  };

  const handleFaceCapture = async (blob) => {
    setUploading(true);

    try {
      const file = new File([blob], "profileImage.jpg", {
        type: "image/jpeg",
      });

      const res = await fileUploader(file);
      if (res?.link) {
        setValue("profileImage", res?._id, { shouldValidate: true });
        setValue("profileImageUrl", res?.link);
      }
    } catch (err) {
      console.error("Face upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const stateoptions = State.getStatesOfCountry("US").map((state) => ({
    name: state.name,
    value: state,
  }));

  const cityoptions = City.getCitiesOfState("US", stateIso).map((city) => ({
    name: city.name,
    value: city.name,
  }));

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal  nobodypad"
    >
      <Modal.Body>
        <div className="authinner_content ">
          <div className="flexedheader p-3 border-bottom d-flex align-items-start justify-content-between">
            <div className="innnerModalhead text-start">
              <h4 className="fw-semibold">Edit Profile</h4>
              <p className="m-0">Fill in the details below</p>
            </div>
            <Button onClick={props.onhide} className="flexedclose">
              <Modalclose />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="forminner p-4">
              <Row>
                <Col lg={12}>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <div className="user_upload position-relative">
                        <label htmlFor="fileshow">
                          <input
                            type="file"
                            id="fileshow"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              const selectedFile = e.target.files[0];
                              handleFaceCapture(selectedFile);
                            }}
                          />
                          <Cameranewicon />
                        </label>

                        {watch("profileImageUrl") && (
                          <Image
                            src={watch("profileImageUrl")}
                            alt="Profile"
                            width={400}
                            height={400}
                          />
                        )}
                      </div>
                    )}
                  />
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="text"
                            label="Full Name"
                            value={{ ...field }.value || ""}
                            placeholder=""
                            error={errors.name?.message}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  {/* Phone Number */}
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <Controller
                      name="mobileNumber"
                      control={control}
                      render={({ field }) => (
                        <div className="phoneNumber position-relative">
                          <PhoneInput
                            {...field}
                            placeholder="Enter phone number"
                            value={field.value}
                            onChange={field.onChange}
                            country="us"
                            onlyCountries={["us"]}
                            disableCountryCode={true}
                          />
                        </div>
                      )}
                    />
                    {errors.mobileNumber && (
                      <p className="text-danger">
                        {errors.mobileNumber.message}
                      </p>
                    )}
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="text"
                            label="Email Address"
                            value={{ ...field }.value || ""}
                            placeholder=""
                            error={errors.email?.message}
                            readOnly={true}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <label className="form-label">Date of Birth</label>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      rules={{
                        required: "Please enter your date of birth",
                        validate: (value) => {
                          if (!value) return "Please enter your date of birth";

                          const today = new Date();
                          const minDOB = new Date(
                            today.getFullYear() - 18,
                            today.getMonth(),
                            today.getDate(),
                          );

                          return (
                            value <= minDOB ||
                            "You must be at least 18 years old"
                          );
                        },
                      }}
                      render={({ field }) => {
                        const today = new Date();
                        const maxDOB = new Date(
                          today.getFullYear() - 18,
                          today.getMonth(),
                          today.getDate(),
                        );

                        return (
                          <div className="dobCalender position-relative">
                            <Calendar
                              value={field.value}
                              onChange={(e) => field.onChange(e.value)}
                              placeholder="Select your date of birth"
                              showIcon
                              className="w-100 text_input p-0"
                              maxDate={maxDOB}
                              dateFormat="dd/mm/yy"
                            />
                            <p className="note text-danger">
                              You must be 18+ to create an account
                            </p>
                            {errors.dateOfBirth && (
                              <span className="error text-danger">
                                {errors.dateOfBirth.message}
                              </span>
                            )}
                          </div>
                        );
                      }}
                    />
                  </div>
                </Col>
                {/* 
                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <GoogleAutocomplete
                      address={watch("address")}
                      onChange={addressChangeHandler}
                    />
                    {errors.address && (
                      <p className="text-danger m-0">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </Col> */}

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label">State</label>
                    </div>

                    <Controller
                      name="state"
                      control={control}
                      rules={{ message: "Please select your state" }}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Dropdown
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                              setStateIso(e.value.isoCode);
                            }}
                            options={stateoptions}
                            optionLabel="name"
                            optionValue="value"
                            placeholder={"Choose state"}
                            className="w-100 text_input"
                          />

                          {errors.state && (
                            <span className="error text-danger">
                              {errors.state.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label">County</label>
                    </div>

                    <Controller
                      name="county"
                      control={control}
                      rules={{ message: "Please select your county" }}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Dropdown
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            options={countyList}
                            optionLabel="countyName"
                            optionValue="countyName"
                            placeholder={"Choose county"}
                            className="w-100 text_input"
                          />

                          {errors.county && (
                            <span className="error text-danger">
                              {errors.county.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label">City</label>
                    </div>

                    <Controller
                      name="city"
                      control={control}
                      rules={{ message: "Please select your city" }}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Dropdown
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            options={cityoptions}
                            optionLabel="name"
                            optionValue="value"
                            placeholder={"Choose city"}
                            className="w-100 text_input"
                            emptyMessage={
                              !watch("state") && "Please select a state first"
                            }
                          />

                          {errors.city && (
                            <span className="error text-danger">
                              {errors.city.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="flexedfooter px-3 pb-3 border-top d-flex align-items-center justify-content-center gap-3">
              <Buttontheme
                type="submit"
                className="w-100 mt-3"
                disabled={!!isPending}
              >
                {isPending ? "Processing..." : "Save"}
              </Buttontheme>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditprofileMod;

// svg
