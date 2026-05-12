import React, { useState } from "react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Authbg from "../../../Assets/images/authbg.png";
import Authlayout from "../../../Layout/Authlayout";
import VerifyCodemod from "./Modal/VerifyCodemod";
import Step1 from "../../../Component/RegisterStep/Components/step1";
import Step2 from "../../../Component/RegisterStep/Components/step2";
import Step3 from "../../../Component/RegisterStep/Components/step3";
import {
  step1Schema,
  stepVoterSchema,
  step3Schema,
  stepUserSchema,
} from "../../../schema";
import { SIGNUPUSER } from "../../../services/ApiCalls";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";
import { useRouter } from "next/router";

const today = new Date();
const defaultDOB = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);

const FORM_DEFAULTS = {
  // Personal info
  name: "",
  email: "",
  phone: "",
  dob: defaultDOB,
  password: "",
  confirmPassword: "",

  // Location
  state: null,
  county: null,
  borough: null,
  city: null,

  // Office and district
  officeType: [],
  districtSelections: {
    usRepresentativeDistrict: null,
    stateSenatorDistrict: null,
    stateRepresentativeDistricts: [],
  },

  voter_registeration_number: "",
  state_or_driving_license_number: "",
  faceScanImage: "",
  faceScan: false,

  // Terms
  agree: false,
};

const Register = () => {
  const router = useRouter();
  const [verifyModal, setVerifyModal] = useState(false);
  const [steps, setSteps] = useState(1);
  const [activeTab, setActiveTab] = useState("voterparticipant");
  const [isFormLoading, setFormLoading] = useState(false);

  const schemaMap = {
    1: step1Schema,
    2: activeTab === "voterparticipant" ? stepVoterSchema : stepUserSchema,
    3: step3Schema,
  };

  const methods = useForm({
    resolver: yupResolver(schemaMap[steps]),
    mode: "onTouched",
    defaultValues: FORM_DEFAULTS,
  });

  const tabs = [
    { id: "voterparticipant", label: "Join as User/Voter" },
    { id: "participantonly", label: "Join as a User Only" },
  ];

  const stepTitles = {
    1: "Create your Account",
    2: "Verification Details",
    3: "Face Verification",
  };

  const finalSubmit = async (data) => {
    const derivedOfficeType = [
      data.districtSelections?.usRepresentativeDistrict
        ? "us representative"
        : null,
      data.districtSelections?.stateSenatorDistrict ? "state senator" : null,
      Array.isArray(data.districtSelections?.stateRepresentativeDistricts) &&
      data.districtSelections.stateRepresentativeDistricts.length > 0
        ? "state representative"
        : null,
    ].filter(Boolean);

    const meta_data = [{ key: "face_id", value: data.faceScanImage || "" }];

    if (activeTab === "voterparticipant") {
      meta_data.push({
        key: "voter_registeration_number",
        value: data.voter_registeration_number || "",
      });
    } else {
      meta_data.push({
        key: "state_or_driving_license_number",
        value: data.state_or_driving_license_number || "",
      });
    }

    // Add location data
    meta_data.push({
      key: "location_data",
      value: JSON.stringify({
        state: data.state?.name || "",
        county: data.county || "",
        borough: data.borough || "",
        city: data.city || "",
      }),
    });

    // Add office selection data
    if (derivedOfficeType.length > 0) {
      meta_data.push({
        key: "office_selection",
        value: JSON.stringify({
          officeType: derivedOfficeType,
          districtSelections: {
            usRepresentativeDistrict:
              data.districtSelections?.usRepresentativeDistrict ?? null,
            stateSenatorDistrict:
              data.districtSelections?.stateSenatorDistrict ?? null,
            stateRepresentativeDistricts: Array.isArray(
              data.districtSelections?.stateRepresentativeDistricts,
            )
              ? data.districtSelections.stateRepresentativeDistricts
              : [],
          },
        }),
      });
    }

    const payload = {
      role: activeTab === "voterparticipant" ? "VOTER" : "USER",
      name: data.name,
      password: data.password || "",
      dateOfBirth: data.dob
        ? new Date(data.dob).toISOString().split("T")[0]
        : "",
      mobileNumber: data.phone,
      email: data.email,
      state: data.state?.name || "",
      county: data.county || data.borough || "",
      city: data.city || "",
      districtSelections: {
        usRepresentativeDistrict:
          data.districtSelections?.usRepresentativeDistrict ?? null,
        stateSenatorDistrict:
          data.districtSelections?.stateSenatorDistrict ?? null,
        stateRepresentativeDistricts: Array.isArray(
          data.districtSelections?.stateRepresentativeDistricts,
        )
          ? data.districtSelections.stateRepresentativeDistricts
          : [],
      },
      userLocation: {
        type: "Point",
        coordinates: [76.72425, 30.71289],
      },
      meta_data,
    };

    try {
      setFormLoading(true);
      const res = await SIGNUPUSER(payload);
      if (res?.data?.status === "success") {
        successToast(res?.data?.message);
        router.push("/auth/login");
      } else {
        errorToast(res?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      errorToast("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleNextStep = () => {
    setSteps(steps + 1);
  };

  const handlePrevStep = () => {
    setSteps(steps - 1);
  };

  return (
    <>
      <VerifyCodemod show={verifyModal} onhide={() => setVerifyModal(false)} />

      <FormProvider {...methods}>
        <section
          className="authFormSection authSignupFormSection position-relative"
          style={{ backgroundImage: `url(${Authbg.src})` }}
        >
          <div className="authLogo">
            <Link href="/" className="text-decoration-none text-black">
              <h3>Public Primary</h3>
            </Link>
          </div>

          <div className="authFormInner">
            <div className="authFormInner_bg">
              <div className="authheader text-center">
                <h2>{stepTitles[steps]}</h2>
              </div>

              {steps === 1 && (
                <>
                  <div className="tab-frame authTab_frame">
                    <div className="clearfix">
                      {tabs.map((tab) => (
                        <React.Fragment key={tab.id}>
                          <input
                            type="radio"
                            name="tab"
                            id={tab.id}
                            checked={activeTab === tab.id}
                            onChange={() => {
                              setActiveTab(tab.id);
                              methods.reset(FORM_DEFAULTS);
                            }}
                          />
                          <label htmlFor={tab.id}>{tab.label}</label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Step1 activeTab={activeTab} onNext={handleNextStep} />
                  </div>
                </>
              )}

              {steps === 2 && (
                <Step2
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                  activeTab={activeTab}
                />
              )}

              {steps === 3 && (
                <Step3
                  onBack={handlePrevStep}
                  onSubmit={methods.handleSubmit(finalSubmit)}
                  isFormLoading={isFormLoading}
                />
              )}
            </div>

            {steps === 1 && (
              <div className="alreadyMember text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link href="/auth/login">Login</Link>
                </p>
              </div>
            )}
          </div>
        </section>
      </FormProvider>
    </>
  );
};

export default Register;

Register.getLayout = (page) => <Authlayout>{page}</Authlayout>;
