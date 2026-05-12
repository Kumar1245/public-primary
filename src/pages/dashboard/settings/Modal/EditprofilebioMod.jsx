import React, { useEffect, useState, useRef } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import {
  Editprofileicon,
  GallaryUploadicn,
  Removeicon,
} from "../../../../Assets/svg/Allsvgicons";
import Textareafield from "../../../../Component/ui/Formfields/Textareafield";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import fileUploader from "../../../../Utilities/FileUpload";
import { EDITPROFILE } from "../../../../services/ApiCalls";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";
import GoogleAutocomplete from "../../../../Component/Common/GoogleAutoComplete";

import Placeholdeuser from "../../../../Assets/images/placeholdeuser.png";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),

  // mobile: Yup.string()
  //   .required("Mobile number is required")
  //   .min(10, "Mobile number is too short"),

  dateOfBirth: Yup.string().required("Date of Birth is required"),

  address: Yup.string().required("Address is required"),

  // description: Yup.string().required("Bio is required"),
});

const EditprofilebioMod = ({ show, onhide, initialData, refetch }) => {
  const safeString = (value) => (typeof value === "string" ? value : "");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedProfileImage, setUploadedProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [biofiles, setBiofiles] = useState(null);
  const [biopreview, setBiopreview] = useState(null);
  const bioInputRef = useRef(null);

  console.log("Initial Data:", initialData);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      // mobile: "",
      dateOfBirth: "",
      address: "",
      description: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (show && initialData) {
      reset({
        name: initialData.name || "",
        email: initialData.email || "",
        // mobile: initialData.mobile || "",
        dateOfBirth: initialData.dateOfBirth || "",
        address: initialData.address || "",
        description: initialData.description || "",
        profileImage: initialData.profileImage?.link || "",
      });

      setPreview(safeString(initialData.profileImage?.link));
      setUploadedImage(safeString(initialData.profileImage?.link));
      setUploadedProfileImage(initialData.profileImage?._id || null);
    }
  }, [show, initialData, reset]);

  const handleProfileClick = () => bioInputRef.current?.click();

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBiofiles(file);
    setBiopreview(URL.createObjectURL(file));
  };

  const onRemove = (index) => {
    setBiofiles(null);
    setBiopreview(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);
      const res = await fileUploader(file);
      if (res?.link) {
        setUploadedImage(res.link);
        setUploadedProfileImage(res?._id);
      }
    } catch (err) {
      errorToast("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const addressChangeHandler = (data) => {
    if (!data) return;
    setValue("address", data.address, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      name: data.name,
      email: data.email,
      // mobileNumber: data.mobile,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      description: data.description,
      profileImage: uploadedProfileImage,
    };

    try {
      const res = await EDITPROFILE(payload);
      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Profile updated successfully");
        refetch();
        onhide(payload);
        setIsLoading(false);
      } else {
        errorToast("Something went wrong");
        setIsLoading(false);
      }
    } catch (error) {
      errorToast("Server error. Please try again");
    } finally {
      setIsLoading(false);
    }
  };
  const resetToInitial = () => {
    reset({
      name: initialData?.name || "",
      email: initialData?.email || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      address: initialData?.address || "",
      description: initialData?.description || "",
    });

    setPreview(safeString(initialData?.profileImage?.link));
    setUploadedImage(safeString(initialData?.profileImage?.link));
    setUploadedProfileImage(initialData?.profileImage?._id || null);

    setBiofiles(null);
    setBiopreview(null);
  };
  useEffect(() => {
    if (show) {
      resetToInitial();
    }
  }, [show]);
  const handleCancel = () => {
    resetToInitial();
    onhide();
  };

  return (
    <Modal
      show={show}
      onHide={onhide}
      size="lg"
      centered
      className="authmodal nobodypad"
    >
      <Modal.Body>
        <div className="authinner_content">
          <div className="flexedheader p-3 border-bottom d-flex justify-content-between">
            <div>
              <h4 className="fw-semibold">Edit Profile</h4>
              <p className="text-muted mb-0">Update your profile information</p>
            </div>
            <button type="button" className="btn-close" onClick={onhide} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="authform profileeditForm p-4">
              <Row>
                <Col lg={12} className="mb-4 text-center">
                  <div className="position-relative d-inline-block">
                    <div
                      className="rounded-circle overflow-hidden border"
                      style={{ width: 120, height: 120 }}
                    >
                      {preview ? (
                        <Image
                          src={preview}
                          alt="Profile"
                          width={120}
                          height={120}
                          className="img-fluid object-fit-cover"
                          unoptimized={preview?.startsWith("blob:")}
                        />
                      ) : (
                        <div className="bg-light d-flex align-items-center justify-content-center h-100">
                          {/* <Editprofileicon size={20} /> */}
                          <Image
                            src={Placeholdeuser}
                            alt="Profile"
                            width={120}
                            height={120}
                            className="img-fluid object-fit-cover"
                          />
                        </div>
                      )}
                    </div>

                    <label
                      htmlFor="profile-upload"
                      className="btneditimgcustom rounded-circle position-absolute"
                      style={{
                        bottom: 5,
                        right: 5,
                        height: 32,
                        width: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Editprofileicon size={16} />
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="d-none"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </Col>

                <Col lg={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="Full Name"
                        error={errors.name?.message}
                      />
                    )}
                  />
                </Col>

                <Col lg={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        type="email"
                        label="Email Address"
                        error={errors.email?.message}
                      />
                    )}
                  />
                </Col>

                <Col lg={6}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        type="date"
                        label="Date of Birth"
                        error={errors.dateOfBirth?.message}
                      />
                    )}
                  />
                </Col>

                <Col lg={6}>
                  <div className="">
                    <label className="form-label">Address</label>
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
                </Col>
                {/* MOBILE NUMBER */}
                {/* <Col lg={6}>
                  <label className="form-label">Mobile Number</label>
                  <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        country="in"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        inputStyle={{
                          width: "100%",
                          height: "44px",
                        }}
                      />
                    )}
                  />
                  {errors.mobile && (
                    <p className="text-danger m-0">{errors.mobile.message}</p>
                  )}
                </Col> */}

                {/* <Col lg={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textareafield
                        {...field}
                        label="Bio"
                        rows={4}
                        error={errors.description?.message}
                      />
                    )}
                  />
                </Col> */}
              </Row>
            </div>

            <div className="flexedfooter px-3 pb-3 border-top d-flex justify-content-end gap-3 py-3">
              <Buttontheme
                type="button"
                className="cancelWhiteBtn"
                onClick={handleCancel}
              >
                Cancel
              </Buttontheme>

              <Buttontheme type="submit" disabled={uploading || isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Buttontheme>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditprofilebioMod;
