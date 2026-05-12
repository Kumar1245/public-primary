import React, { useState } from "react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import Authbg from "../../../Assets/images/authbg.png";
import Authlayout from "../../../Layout/Authlayout";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";
import { SIGNUPUSER } from "../../../services/ApiCalls";
import { useRouter } from "next/router";
import Step4 from "../../../Component/auth/createaccount/Components/Step4";
import Step3 from "../../../Component/auth/createaccount/Components/Step3";
import Step2 from "../../../Component/auth/createaccount/Components/Step2";
import Step1 from "../../../Component/auth/createaccount/Components/Step1";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateAccount = () => {
  const resumeSchema = Yup.object({
    resumeName: Yup.string().required("Name is required"),
    verifiername: Yup.string().required("Enter Verified By is required"),
    verifiercontact: Yup.string()
      .required("Verifier contact is required")
      .min(10, "Enter a valid phone number"),
    verificationType: Yup.string()
      .oneOf(["self", "company"])
      .required("Verification type is required"),
    introductoryVideo: Yup.string()
      .nullable()
      .required("Introductory video is required"),

    campaignVideo: Yup.string()
      .nullable()
      .required("Campaign video is required"),

    meetsRequirements: Yup.boolean()
      .nullable()
      .required("Please confirm eligibility"),

    politicalPartyAssociated: Yup.boolean()
      .nullable()
      .required("Please select political association"),

    businessAssociation: Yup.boolean()
      .nullable()
      .required("Please select business association"),

    education: Yup.array()
      .of(
        Yup.object({
          degree: Yup.string().required("Degree is required"),
          university: Yup.string().required("University is required"),
          startYear: Yup.number()
            .typeError("Start year must be a number")
            .required("Start year is required"),
          endYear: Yup.number()
            .typeError("End year must be a number")
            .min(
              Yup.ref("startYear"),
              "End year must be greater than start year",
            )
            .required("End year is required"),
        }),
      )
      .min(1, "At least one education entry is required"),

    workHistory: Yup.array()
      .of(
        Yup.object({
          description: Yup.string().required("Work description is required"),
        }),
      )
      .min(1, "At least one work history entry is required"),

    achievements: Yup.array()
      .of(
        Yup.object({
          description: Yup.string().required("Achievement is required"),
        }),
      )
      .min(1, "At least one achievement is required"),

    drugTest: Yup.object({
      result: Yup.string().required("Drug test result is required"),
      date: Yup.date().nullable().required("Drug test date is required"),
      company: Yup.string().required("Testing company is required"),
    }),

    competencyTest: Yup.object({
      result: Yup.string().required("Competency test result is required"),
      date: Yup.date().nullable().required("Competency test date is required"),
      company: Yup.string().required("Testing company is required"),
    }),
  });

  const getSchema = (step) => {
    switch (step) {
      case 1:
        return yupResolver(
          Yup.object({
            seat: Yup.string().required("Please select a constituency"),
            address: Yup.string().required("Please enter your address"),
            name: Yup.string().required("Please enter your name"),
            email: Yup.string()
              .trim()
              .lowercase()
              .email("Please enter a valid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Please enter a password")
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter",
              )
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter",
              )
              .matches(/[0-9]/, "Password must contain at least one number")
              .matches(
                /[@$!%*?&]/,
                "Password must contain at least one special character",
              ),
            dob: Yup.date()
              .nullable()
              .required("Please enter your date of birth")
              .test("age", "You must be at least 18 years old", (value) => {
                if (!value) return false;
                const today = new Date();
                const minDOB = new Date(
                  today.getFullYear() - 18,
                  today.getMonth(),
                  today.getDate(),
                );
                return value <= minDOB;
              }),
          }),
        );

      case 3:
        return yupResolver(resumeSchema);
    }
  };

  const today = new Date();
  const defaultDOB = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const router = useRouter();
  const [steps, setSteps] = useState(1);
  const methods = useForm({
    mode: "onTouched",
    resolver: getSchema(steps),
    defaultValues: {
      // Step 1
      seat: null,
      name: "",
      email: "",
      password: "",
      dob: defaultDOB,
      address: "",

      // Step 2
      governmentIdImages: [],
      voterNumber: "",
      faceScanImage: null,

      // Step 3
      resume: [],
      verifiername: "",
      verifiercontact: "",
      introductoryVideo: null,
      campaignVideo: null,

      resumeName: "",
      verificationType: "self",

      meetsRequirements: null,
      politicalPartyAssociated: null,
      businessAssociation: null,

      education: [
        {
          degree: "",
          university: "",
          startYear: "",
          endYear: "",
        },
      ],

      workHistory: [
        {
          description: "",
        },
      ],

      achievements: [
        {
          description: "",
        },
      ],

      drugTest: {
        result: "",
        date: null,
        company: "",
      },

      competencyTest: {
        result: "",
        date: null,
        company: "",
      },

      // Step 4
      disclose: false,
      agree: false,
      isCandidateForOtherSeats: null,
      hasMetRequirements: null,
    },
  });

  const stepTitles = {
    1: "Create Your Account",
    2: "Candidate Registration",
    3: "Candidate Registration",
    4: "Candidate Registration",
  };

  const totalSteps = Object.keys(stepTitles).length;

  // const onFinalSubmit = async (data) => {

  //   const paymentDetails = data.paymentDetails;
  //   const applicationFeeStatus =
  //     paymentDetails?.status === "paid" ? "paid" : "pending";
  //   const applicationFeeAmount =
  //     paymentDetails?.amount || data.applicationFee || 50;

  //   console.log("Application Fee Status:", applicationFeeStatus);
  //   console.log("Application Fee Amount:", applicationFeeAmount);
  //   console.log("Payment Details:", paymentDetails);

  //   const payload = {
  //     constituency: data.seat || "",
  //     role: "CANDIDATE",
  //     name: data.name,
  //     password: data?.password || "",
  //     dateOfBirth: data.dob
  //       ? new Date(data.dob).toISOString().split("T")[0]
  //       : "",
  //     email: data.email,
  //     address: data.address,
  //     userLocation: {
  //       type: "Point",
  //       coordinates: [76.72425, 30.71289],
  //     },
  //     resumeName: data?.resumeName,
  //     verificationType: data?.verificationType,

  //     meetsRequirements: data?.meetsRequirements,
  //     politicalPartyAssociated: data?.politicalPartyAssociated,
  //     businessAssociation: data?.businessAssociation,
  //     education: data?.education,
  //     workHistory: data?.workHistory,

  //     achievements: data?.achievements,
  //     drugTest: data?.drugTest,

  //     competencyTest: data?.competencyTest,

  //     applicationFeeStatus: applicationFeeStatus,
  //     applicationFee: applicationFeeAmount,

  //     meta_data: [
  //       {
  //         key: "permanent_introductory_video",
  //         value: data.introductoryVideo || "",
  //       },
  //       {
  //         key: "current_campaign_video",
  //         value: data.campaignVideo || "",
  //       },
  //       {
  //         key: "government_id_front",
  //         value: data.governmentIdImages?.[0] || "",
  //       },
  //       {
  //         key: "government_id_back",
  //         value: data.governmentIdImages?.[1] || "",
  //       },
  //       {
  //         key: "resume",
  //         value: data.resume?.[0] || "",
  //       },
  //       {
  //         key: "face_id",
  //         value: data.faceScanImage || "",
  //       },
  //       {
  //         key: "verifier_name",
  //         value: data.verifiername,
  //       },
  //       {
  //         key: "verifier_contact",
  //         value: data.verifiercontact,
  //       },
  //       {
  //         key: "voter_registeration_number",
  //         value: data.voterNumber,
  //       },

  //       ...(paymentDetails?.transactionId
  //         ? [
  //             {
  //               key: "application_fee_transaction_id",
  //               value: paymentDetails.transactionId,
  //             },
  //             {
  //               key: "application_fee_paid_amount",
  //               value: applicationFeeAmount.toString(),
  //             },
  //             {
  //               key: "application_fee_status",
  //               value: applicationFeeStatus,
  //             },
  //           ]
  //         : []),
  //     ],
  //   };

  //   try {
  //     let res = await SIGNUPUSER(payload);
  //     console.log(res, "data======<> registration");
  //     if (res?.data?.status === "success") {
  //       router.push("/auth/login");
  //       successToast(res?.data?.message);
  //     } else {
  //       errorToast(res?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     errorToast("Registration failed. Please try again.");
  //   }
  // };

  const onFinalSubmit = async (data) => {
    const paymentDetails = data.paymentDetails;
    const applicationFeeStatus =
      paymentDetails?.status === "paid" ? "paid" : "pending";
    const applicationFeeAmount =
      paymentDetails?.amount || data.applicationFee || 50;

    console.log("Application Fee Status:", applicationFeeStatus);
    console.log("Application Fee Amount:", applicationFeeAmount);
    console.log("Payment Details:", paymentDetails);
    console.log("isCandidateForOtherSeats:", data.isCandidateForOtherSeats);
    console.log("hasMetRequirements:", data.hasMetRequirements);

    const payload = {
      constituency: data.seat || "",
      role: "CANDIDATE",
      name: data.name,
      password: data?.password || "",
      dateOfBirth: data.dob
        ? new Date(data.dob).toISOString().split("T")[0]
        : "",
      email: data.email,
      address: data.address,
      userLocation: {
        type: "Point",
        coordinates: [76.72425, 30.71289],
      },
      resumeName: data?.resumeName,
      verificationType: data?.verificationType,

      meetsRequirements: data?.meetsRequirements,
      politicalPartyAssociated: data?.politicalPartyAssociated,
      businessAssociation: data?.businessAssociation,
      education: data?.education,
      workHistory: data?.workHistory,

      achievements: data?.achievements,
      drugTest: data?.drugTest,

      competencyTest: data?.competencyTest,

      applicationFeeStatus: applicationFeeStatus,
      applicationFee: applicationFeeAmount,

      meta_data: [
        // Send these two fields as "yes"/"no" in meta_data
        {
          key: "is_candidate_for_other_seats",
          value:
            data.isCandidateForOtherSeats === "yes"
              ? "yes"
              : data.isCandidateForOtherSeats === "no"
                ? "no"
                : "",
        },
        {
          key: "has_met_requirements",
          value:
            data.hasMetRequirements === "yes"
              ? "yes"
              : data.hasMetRequirements === "no"
                ? "no"
                : "",
        },

        // Keep existing payment details if needed
        ...(paymentDetails?.transactionId
          ? [
              {
                key: "application_fee_transaction_id",
                value: paymentDetails.transactionId,
              },
              {
                key: "application_fee_paid_amount",
                value: applicationFeeAmount.toString(),
              },
              {
                key: "application_fee_status",
                value: applicationFeeStatus,
              },
            ]
          : []),
      ],
    };

    console.log("Final Payload:", payload);

    try {
      let res = await SIGNUPUSER(payload);
      console.log(res, "data======<> registration");
      if (res?.data?.status === "success") {
        router.push("/auth/login");
        successToast(res?.data?.message);
      } else {
        errorToast(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      errorToast("Registration failed. Please try again.");
    }
  };
  return (
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
              <h2 className="m-0">{stepTitles[steps]}</h2>
              <small className="theme_text fw-semibold">
                Step {steps} of {totalSteps}
              </small>
            </div>

            {steps === 1 && <Step1 onNext={() => setSteps(2)} />}
            {steps === 2 && (
              <Step2 onNext={() => setSteps(3)} onBack={() => setSteps(1)} />
            )}

            {steps === 3 && (
              <Step3 onNext={() => setSteps(4)} onBack={() => setSteps(2)} />
            )}

            {steps === 4 && (
              <Step4
                onBack={() => setSteps(3)}
                onSubmit={async (formDataWithPayment) => {
                  console.log("Step4 submitted with:", formDataWithPayment);
                  await onFinalSubmit(formDataWithPayment);
                }}
              />
            )}
          </div>

          {steps === 1 && (
            <div className="alreadyMember text-center mt-4">
              <p>
                Already have an account? <Link href="/auth/login">Login</Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </FormProvider>
  );
};

export default CreateAccount;

CreateAccount.getLayout = (page) => <Authlayout>{page}</Authlayout>;
