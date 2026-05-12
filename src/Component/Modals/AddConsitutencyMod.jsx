import React, { useEffect, useMemo } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Buttontheme from "../ui/Buttontheme";
import { Modalclose } from "../../Assets/svg/Allsvgicons";
import AddconsitStep1 from "../profiledashboard/profile-account/AddconstituenccySteps/AddconsitStep1";
import { errorToast, successToast } from "../../Utilities/toastsMessages";
import { CONSTITUENCY_ADD } from "../../services/ApiCalls";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { State } from "country-state-city";

const MAX_ELECTED_SEATS = 100;

const fullSchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  label: Yup.string().required("Label is required"),
  constituencyBranchType: Yup.string().when("type", {
    is: "Non-Government",
    then: (schema) => schema.required("Please select a constituency category"),
    otherwise: (schema) => schema.notRequired(),
  }),
  setupReadiness: Yup.string()
    .oneOf(["yes"], "Please confirm you have the required information")
    .required("Please confirm you have the required information"),
  commonConstituency: Yup.string().when("constituencyBranchType", {
    is: (constituencyBranchType) => constituencyBranchType !== "custom",
    then: (schema) => schema.required("Please select a constituency"),
    otherwise: (schema) => schema.notRequired(),
  }),
  state: Yup.string().required("State is required"),
  county: Yup.string().required("County is required"),
  city: Yup.string().notRequired(),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  electedSeat: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Seats must be a number")
    .positive("Seats must be greater than 0")
    .integer("Seats must be a whole number")
    .max(MAX_ELECTED_SEATS, `Seats cannot be more than ${MAX_ELECTED_SEATS}`)
    .required("Seats are required"),

  nextElectionDates: Yup.array()
    .of(
      Yup.date()
        .typeError("Invalid date")
        .required("Election date is required"),
    )
    .min(1, "Election dates required")
    .test(
      "match-seat-count",
      "Election dates must match number of seats",
      function (value) {
        const { electedSeat } = this.parent;
        if (!electedSeat) return true;
        return value?.length === Number(electedSeat);
      },
    ),
  term: Yup.number().typeError("Term is required").required("Term is required"),
});

const parseLocationMeta = (user) => {
  const locationMeta = user?.meta_data?.find?.(
    (item) => item?.key === "location_data",
  )?.value;

  if (!locationMeta) return {};

  try {
    return typeof locationMeta === "string"
      ? JSON.parse(locationMeta)
      : locationMeta;
  } catch {
    return {};
  }
};

const AddConstituencyMod = (props) => {
  const { onhide, refetch } = props;
  const { user } = useAuth();
  const step = 1;
  const metaLocation = useMemo(() => parseLocationMeta(user), [user]);
  const accountAddress = useMemo(
    () => ({
      state:
        user?.state ||
        user?.stateName ||
        user?.location?.state ||
        metaLocation?.state ||
        "",
      county:
        user?.county ||
        user?.countyName ||
        user?.borough ||
        user?.location?.county ||
        metaLocation?.county ||
        metaLocation?.borough ||
        "",
      city:
        user?.city ||
        user?.location?.city ||
        metaLocation?.city ||
        "",
    }),
    [metaLocation, user],
  );

  const termOptions = [
    { value: 2, label: "2 years" },
    { value: 4, label: "4 years" },
    { value: 6, label: "6 years" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(fullSchema),
    defaultValues: {
      county: "",
      state: "",
      city: "",
      type: "",
      label: "",
      level: "",
      constituencyBranch: "county",
      constituencyBranchType: "",
      setupReadiness: "",
      commonConstituency: "",
      name: "",
      description: "",
      electedSeat: "",
      nextElectionDates: [],
      term: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("state", accountAddress.state);
    setValue("county", accountAddress.county);
    setValue("city", accountAddress.city);
  }, [accountAddress, setValue]);

  const { mutate: mutateSubmitConstituency, isPending } = useMutation({
    mutationFn: CONSTITUENCY_ADD,

    onSuccess: () => {
      successToast("Constituency submitted successfully");
      refetch();
      onhide();
    },

    onError: (err) => {
      errorToast(err?.response?.data?.message || "Something went wrong");
    },
    
  });

  const onSubmit = (data) => {
    const effectiveState = data.state || accountAddress.state;
    const effectiveCounty = data.county || accountAddress.county;
    const effectiveCity = data.city || accountAddress.city;
    const selectedCounties = effectiveCounty ? [effectiveCounty] : [];
    const matchedState = State.getStatesOfCountry("US").find(
      (item) =>
        item.name === effectiveState ||
        item.isoCode === effectiveState,
    );
    const electionDate = Array.isArray(data.nextElectionDates)
      ? data.nextElectionDates.find(Boolean) || ""
      : data.nextElectionDates || "";

    const payload = {
      ...data,
      state: matchedState?.isoCode || effectiveState,
      county: effectiveCounty,
      city: effectiveCity,
      level: data.type === "Government" ? "State" : "Local",
      counties: selectedCounties,
      electionDate,
    };

    delete payload.constituencyBranchType;
    delete payload.nextElectionDates;

    mutateSubmitConstituency(payload);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal nobodypad"
    >
      <Modal.Body>
        <div className="authinner_content">
          <div className="flexedheader p-3 border-bottom d-flex align-items-start justify-content-between">
            <div className="innnerModalhead text-start">
              <h4 className="fw-semibold">Add Constituency</h4>
            </div>
            <Button onClick={props.onhide} className="flexedclose">
              <Modalclose />
            </Button>
          </div>

          <div className="constituency-modal-progress-container">
            <div
              className="constituency-modal-progress-bar"
              style={{ width: "100%" }}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="forminner p-4">
              <div className="constituency-modal-body">
               
                {step === 1 && (
                  <div>
                    <AddconsitStep1
                      control={control}
                      errors={errors}
                      termOptions={termOptions}
                      watch={watch}
                      setValue={setValue}
                      onhide={onhide}
                      accountAddress={accountAddress}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flexedfooter px-3 py-3 border-top d-flex align-items-center justify-content-center gap-3">
              <div className="constituency-spacer" />
              <Buttontheme
                type="submit"
                className="w-100"
                disabled={!!isPending}
              >
                {isPending ? "Submitting..." : "Save"}
              </Buttontheme>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddConstituencyMod;
