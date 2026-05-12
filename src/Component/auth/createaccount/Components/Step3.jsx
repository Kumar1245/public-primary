import React, { useRef, useState } from "react";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import { Row, Col, Button } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";

import {
  Arrowbackicon,
  GallaryUploadicn,
  Removeicon,
} from "../../../../Assets/svg/Allsvgicons";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import Image from "next/image";
import fileUploader from "../../../../Utilities/FileUpload.js";
import PhoneInput from "react-phone-input-2";

const Step3 = ({ onNext, onBack }) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  console.log("errors in step 3:", errors);
  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  // Work History
  const {
    fields: workFields,
    append: addWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "workHistory",
  });

  // const {
  //   fields: keyPrioritiesFields,
  //   append: addkeyPriorities,
  //   remove: removekeyPriorities,
  // } = useFieldArray({
  //   control,
  //   name: "keyPriorities",
  // });

  const {
    fields: achievementsFields,
    append: addAchievements,
    remove: removeAchievements,
  } = useFieldArray({
    control,
    name: "achievements",
  });

  const resumeInputRef = useRef(null);
  const introVideoRef = useRef(null);
  const campaignVideoRef = useRef(null);

  const [resumeFiles, setResumeFiles] = useState([]);
  const [resumePreviews, setResumePreviews] = useState([]);
  const [resume, setResume] = useState([]);

  const [introPreview, setIntroPreview] = useState(null);
  const [campaignPreview, setCampaignPreview] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [uploadingType, setUploadingType] = useState(null);

  const handleResumeSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    if (resumeFiles.length + selectedFiles.length > 2) {
      alert("Only front & back images allowed");
      return;
    }

    setUploading(true);
    setUploadingType("resume");

    try {
      const uploaded = [];

      for (const file of selectedFiles) {
        const res = await fileUploader(file);
        if (res?.link) uploaded.push(res.link);
      }

      const updated = [...resumeFiles, ...uploaded];
      setResumeFiles(updated);
      setResumePreviews(updated);
      setResume(updated);
      setValue("resume", updated, { shouldValidate: true });
    } catch (err) {
      console.error("Resume upload failed:", err);
    } finally {
      setUploading(false);
      setUploadingType(null);
    }
  };

  const removeResume = (index) => {
    const updated = resumeFiles.filter((_, i) => i !== index);
    setResumeFiles(updated);
    setResumePreviews(updated);
    setResume(updated);
    setValue("resume", updated, { shouldValidate: true });
  };

  const handleIntroVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadingType("intro");

    try {
      const res = await fileUploader(file, { isVideoType: true });
      if (res?.link) {
        setIntroPreview(res.link);
        setValue("introductoryVideo", res.link, { shouldValidate: true });
      }
    } catch (err) {
      console.error("Intro video upload failed:", err);
    } finally {
      setUploading(false);
      setUploadingType(null);
    }
  };

  const removeIntroVideo = () => {
    setIntroPreview(null);
    setValue("introductoryVideo", null, { shouldValidate: true });
  };

  const handleCampaignVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadingType("campaign");

    try {
      const res = await fileUploader(file, { isVideoType: true });
      if (res?.link) {
        setCampaignPreview(res.link);
        setValue("campaignVideo", res.link, { shouldValidate: true });
      }
    } catch (err) {
      console.error("Campaign video upload failed:", err);
    } finally {
      setUploading(false);
      setUploadingType(null);
    }
  };

  const removeCampaignVideo = () => {
    setCampaignPreview(null);
    setValue("campaignVideo", null, { shouldValidate: true });
  };
  const onSubmit = async () => {
    onNext();
  };

  return (
    <div className="authformWrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="authform mt-4">
          <Row>
            {/* <Col lg={12}>
              <label>Upload Verified Resume</label>

              <div
                className="buttonWraperMod d-flex align-items-center justify-content-center"
                onClick={() => resumeInputRef.current?.click()}
              >
                <GallaryUploadicn />
              </div>

              <Controller
                name="resume"
                control={control}
                rules={{
                  required: "Verified resume is required",
                  validate: (v) =>
                    v?.length === 2 || "Upload front & back images",
                }}
                render={() => (
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    hidden
                    multiple
                    onChange={handleResumeSelect}
                  />
                )}
              />

              {resumePreviews.length > 0 && (
                <div className="images_list d-flex gap-2 mt-3">
                  {resumePreviews.map((img, index) => (
                    <div key={index} className="image_item position-relative">
                      <Image
                        src={img}
                        alt="resume"
                        width={500}
                        height={500}
                        className="object-fit-contain"
                      />
                      <Button
                        type="button"
                        className="removebtn"
                        onClick={() => removeResume(index)}
                      >
                        <Removeicon />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {errors.resume && (
                <p className="text-danger mt-1">{errors.resume.message}</p>
              )}
            </Col> */}
            <Col lg={12}>
              <h5>Upload Verified Resume</h5>
            </Col>
            {/* <Col lg={12}>
              <Controller
                name="verifiername"
                control={control}
                rules={{ required: "Verifier name is required" }}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Verifier Name"
                    placeholder="Licensed business/organization"
                    error={errors.verifiername?.message}
                  />
                )}
              />
            </Col> */}
            <Col lg={12} className="mt-2">
              <Controller
                name="resumeName"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Full Name"
                    placeholder="Enter Full Name"
                  />
                )}
              />
              {errors.resumeName && (
                <p className="text-danger mt-1">{errors.resumeName.message}</p>
              )}
            </Col>
            <Col lg={12} className="mt-2">
              <Controller
                name="verifiername"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Verified By"
                    placeholder="Enter Verified By"
                  />
                )}
              />
              {errors.verifiername && (
                <p className="text-danger mt-1">
                  {errors.verifiername.message}
                </p>
              )}
            </Col>
            <Col lg={12} className="mt-2">
              <label className="form-label">Select Verification Type</label>
              <Controller
                name="verificationType"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Verification Type"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Self Verified", value: "self" },
                        { label: "Company Verified", value: "company" },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.verificationType && (
                <p className="text-danger mt-1">
                  {errors.verificationType.message}
                </p>
              )}
            </Col>
            <Col lg={12} className="mt-2">
              <label className="form-label">
                Have you met minimum state and county requirements to run for
                this office?
              </label>

              <Controller
                name="meetsRequirements"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Meets State & County Requirements"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.meetsRequirements && (
                <p className="text-danger mt-1">
                  {errors.meetsRequirements.message}
                </p>
              )}
            </Col>
            <Col lg={12} className="mt-2">
              <label className="form-label">
                Are you associated with a political party? Do not include which
                party if associated.
              </label>

              <Controller
                name="politicalPartyAssociated"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Political Party Association"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.politicalPartyAssociated && (
                <p className="text-danger mt-1">
                  {errors.politicalPartyAssociated.message}
                </p>
              )}
            </Col>
            <Col lg={12} className="mt-2">
              <label className="form-label">
                Are you associated with any business or lobby that could benefit
                financially?
              </label>

              <Controller
                name="businessAssociation"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Business / Lobby Association"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.businessAssociation && (
                <p className="text-danger mt-1">
                  {errors.businessAssociation.message}
                </p>
              )}
            </Col>

            <Col lg={12} className="mt-4">
              <h5>Education</h5>
            </Col>
            {educationFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col lg={6}>
                  <Controller
                    name={`education.${index}.degree`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="Degree"
                        placeholder="Enter Degree"
                      />
                    )}
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-danger mt-1">
                      {errors.education[index].degree.message}
                    </p>
                  )}
                </Col>

                <Col lg={6}>
                  <Controller
                    name={`education.${index}.university`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="University / Institution"
                        placeholder="Enter University / Institution"
                      />
                    )}
                  />
                  {errors.education?.[index]?.university && (
                    <p className="text-danger mt-1">
                      {errors.education[index].university.message}
                    </p>
                  )}
                </Col>

                <Col lg={6}>
                  <Controller
                    name={`education.${index}.startYear`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="Start Year"
                        type="number"
                        placeholder="Enter Start Year"
                      />
                    )}
                  />
                  {errors.education?.[index]?.startYear && (
                    <p className="text-danger mt-1">
                      {errors.education[index].startYear.message}
                    </p>
                  )}
                </Col>

                <Col lg={6}>
                  <Controller
                    name={`education.${index}.endYear`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="End Year"
                        type="number"
                        placeholder="Enter End Year"
                      />
                    )}
                  />
                  {errors.education?.[index]?.endYear && (
                    <p className="text-danger mt-1">
                      {errors.education[index].endYear.message}
                    </p>
                  )}
                </Col>

                <Col lg={12} className="text-end mt-2">
                  <Button
                    variant="outline-danger"
                    size="md"
                    className="py-2 removeBtn"
                    onClick={() => removeEducation(index)}
                  >
                    Remove Education
                  </Button>
                </Col>
              </React.Fragment>
            ))}
            <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="sm"
                className="py-2 theme_border theme_text rounded font-semibold"
                onClick={() =>
                  addEducation({
                    degree: "",
                    field: "",
                    university: "",
                    startYear: "",
                    endYear: "",
                  })
                }
              >
                + Add Education
              </Button>
            </Col>
            <Col lg={12} className="mt-4">
              <h5>Work History</h5>
            </Col>
            {workFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col lg={12}>
                  <Controller
                    name={`workHistory.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label={`Work ${index + 1}`}
                        placeholder="Enter Work History"
                      />
                    )}
                  />
                  {errors.workHistory?.[index]?.description && (
                    <p className="text-danger mt-1">
                      {errors.workHistory[index].description.message}
                    </p>
                  )}
                </Col>

                <Col lg={12} className="text-end mt-2">
                  <Button
                    variant="outline-danger"
                    size="md"
                    className="py-2 removeBtn"
                    onClick={() => removeWork(index)}
                  >
                    Remove Work
                  </Button>
                </Col>
              </React.Fragment>
            ))}
            <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="md"
                className="py-2 theme_border theme_text rounded font-semibold"
                onClick={() =>
                  addWork({
                    description: "",
                  })
                }
              >
                + Add Work History
              </Button>
            </Col>

            {/* <Col lg={12} className="mt-4">
              <h5>Key Priorities</h5>
            </Col> */}
            {/* {keyPrioritiesFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col lg={12}>
                  <Controller
                    name={`keyPriorities.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label={`Key ${index + 1}`}
                        placeholder="Enter Key Priority"
                      />
                    )}
                  />
                  {errors.keyPriorities?.[index]?.description && (
                    <p className="text-danger mt-1">
                      {errors.keyPriorities[index].description.message}
                    </p>
                  )}
                </Col>

                <Col lg={12} className="text-end mt-2">
                  <Button
                    variant="outline-danger"
                    size="md"
                    className="py-2 removeBtn"
                    onClick={() => removekeyPriorities(index)}
                  >
                    Remove Key Priority
                  </Button>
                </Col>
              </React.Fragment>
            ))} */}
            {/* <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="md"
                className="py-2 theme_border theme_text rounded font-semibold"
                onClick={() =>
                  addkeyPriorities({
                    description: "",
                  })
                }
              >
                + Add Key Priorities
              </Button>
            </Col> */}

            <Col lg={12} className="mt-4">
              <h5>Achievements</h5>
            </Col>
            {achievementsFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col lg={12}>
                  <Controller
                    name={`achievements.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label={`Key ${index + 1}`}
                        placeholder="Enter Achievements"
                      />
                    )}
                  />
                  {errors.achievements?.[index]?.description && (
                    <p className="text-danger mt-1">
                      {errors.achievements[index].description.message}
                    </p>
                  )}
                </Col>

                <Col lg={12} className="text-end mt-2">
                  <Button
                    variant="outline-danger"
                    size="md"
                    className="py-2 removeBtn"
                    onClick={() => removeAchievements(index)}
                  >
                    Remove achievements
                  </Button>
                </Col>
              </React.Fragment>
            ))}
            <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="md"
                className="py-2 theme_border theme_text rounded font-semibold"
                onClick={() =>
                  addAchievements({
                    description: "",
                  })
                }
              >
                + Add achievements
              </Button>
            </Col>

            {/* ================= DRUG TEST ================= */}
            <Col lg={12} className="mt-4">
              <h5 className="fw-semibold">Drug Test</h5>
            </Col>
            <Col lg={4}>
              <label className="form-label">Select Result</label>
              <Controller
                name="drugTest.result"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      placeholder="Result"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Passed", value: "passed" },
                        { label: "Failed", value: "failed" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.drugTest?.result && (
                <p className="text-danger mt-1">
                  {errors.drugTest.result.message}
                </p>
              )}
            </Col>

            <Col lg={4}>
              <Controller
                name="drugTest.date"
                control={control}
                render={({ field }) => (
                  <Textfield {...field} label="Date" type="date" />
                )}
              />
              {errors.drugTest?.date && (
                <p className="text-danger mt-1">
                  {errors.drugTest.date.message}
                </p>
              )}
            </Col>
            <Col lg={4}>
              <Controller
                name="drugTest.company"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Company"
                    placeholder="Enter Company"
                  />
                )}
              />
              {errors.drugTest?.company && (
                <p className="text-danger mt-1">
                  {errors.drugTest.company.message}
                </p>
              )}
            </Col>
            {/* ================= COMPETENCY TEST ================= */}
            <Col lg={12} className="mt-4">
              <h5 className="fw-semibold">Competency Test</h5>
            </Col>

            <Col lg={4}>
              <label className="form-label">Select Result</label>
              <Controller
                name="competencyTest.result"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      placeholder="Result"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Passed", value: "passed" },
                        { label: "Failed", value: "failed" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.competencyTest?.result && (
                <p className="text-danger mt-1">
                  {errors.competencyTest.result.message}
                </p>
              )}
            </Col>

            <Col lg={4}>
              <Controller
                name="competencyTest.date"
                control={control}
                render={({ field }) => (
                  <Textfield {...field} label="Date" type="date" />
                )}
              />
              {errors.competencyTest?.date && (
                <p className="text-danger mt-1">
                  {errors.competencyTest.date.message}
                </p>
              )}
            </Col>
            <Col lg={4}>
              <Controller
                name="competencyTest.company"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Company"
                    placeholder="Enter Company"
                  />
                )}
              />
              {errors.competencyTest?.company && (
                <p className="text-danger mt-1">
                  {errors.competencyTest.company.message}
                </p>
              )}
            </Col>
            <Col lg={12} className="mt-2">
              <label className="form-label">Verifier Contact</label>

              <Controller
                name="verifiercontact"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <PhoneInput
                      country="us"
                      inputStyle={{ height: "40px" }}
                      value={field.value}
                      placeholder="Phone or email"
                      onChange={(phone, country) => {
                        field.onChange(phone);
                        setValue("countryCode", `+${country.dialCode}`, {
                          shouldValidate: true,
                        });
                      }}
                      inputClass="form-control inputphone inputphonetel"
                      containerClass="w-100"
                      onlyCountries={["us"]}
                      disableCountryCode={true}
                    />

                    {errors.verifiercontact && (
                      <p className="text-danger mt-1">
                        {errors.verifiercontact.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </Col>
            <Col lg={12} className="mt-2">
              <label>Permanent Introductory Video</label>

              <div
                className="buttonWraperMod d-flex justify-content-center"
                onClick={() => introVideoRef.current?.click()}
              >
                <GallaryUploadicn />
              </div>

              <Controller
                name="introductoryVideo"
                control={control}
                render={() => (
                  <input
                    ref={introVideoRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleIntroVideo}
                  />
                )}
              />

              {introPreview && (
                <div className="video_preview position-relative mt-3">
                  <video src={introPreview} controls className="w-100" />
                  <Button
                    type="button"
                    className="removebtn"
                    onClick={removeIntroVideo}
                  >
                    <Removeicon />
                  </Button>
                </div>
              )}

              {errors.introductoryVideo && (
                <p className="text-danger mt-1">
                  {errors.introductoryVideo.message}
                </p>
              )}
            </Col>
            <Col lg={12} className="mt-2">
              <label>Current Campaign Video</label>

              <div
                className="buttonWraperMod d-flex justify-content-center"
                onClick={() => campaignVideoRef.current?.click()}
              >
                <GallaryUploadicn />
              </div>

              <Controller
                name="campaignVideo"
                control={control}
                render={() => (
                  <input
                    ref={campaignVideoRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleCampaignVideo}
                  />
                )}
              />

              {campaignPreview && (
                <div className="video_preview position-relative mt-3">
                  <video src={campaignPreview} controls className="w-100" />
                  <Button
                    type="button"
                    className="removebtn"
                    onClick={removeCampaignVideo}
                  >
                    <Removeicon />
                  </Button>
                </div>
              )}

              {errors.campaignVideo && (
                <p className="text-danger mt-1">
                  {errors.campaignVideo.message}
                </p>
              )}
            </Col>
          </Row>
        </div>

        <div className="d-flex align-items-center gap-3 mt-3">
          <Button type="button" className="arroowBack" onClick={onBack}>
            <Arrowbackicon />
          </Button>

          <Buttontheme type="submit" className="w-100" disabled={uploading}>
            {uploading
              ? uploadingType === "resume"
                ? "Uploading Resume..."
                : uploadingType === "intro"
                  ? "Uploading Intro Video..."
                  : "Uploading Campaign Video..."
              : "Save & Next"}
          </Buttontheme>
        </div>
      </form>
    </div>
  );
};

export default Step3;
