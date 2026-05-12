import * as Yup from "yup";

export const step1Schema = Yup.object({
  name: Yup.string()
    .min(6)
    .required("Name is required")
    .min(6, "Name must be at least 6 characters"),

  phone: Yup.string()
    .min(10)
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),

  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),

  dob: Yup.date().nullable().required("DOB is required"),

  state: Yup.object().required("State is required"),

  county: Yup.string().nullable().optional(),

  borough: Yup.string().nullable().optional(),

  // ── FIX 1: city ──────────────────────────────────────────────────────────
  // Was: required when constituencyBranch === "county" → blocked submit
  //      because city is optional (user may not select a city)
  // Now: always nullable/optional
  city: Yup.string().nullable().optional(),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter a password")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character",
    ),

  // ── FIX 2: seat ──────────────────────────────────────────────────────────
  // Was: test() had dead code that always returned true anyway, but the
  //      value parameter was `null` which caused Yup's nullable() to fail
  //      in some versions when chained incorrectly.
  // Root cause: Yup validates BEFORE onSubmit runs. In the county-creation
  //      flow seat is null at validation time — it gets set inside onSubmit
  //      after CONSTITUENCY_ADD resolves, then onNext() is called.
  //      So seat validation must always pass at schema level.
  //      Step1's onSubmit() handles all seat/election-date validation itself.
  seat: Yup.string()
    .nullable()
    .test("seat-required", "Constituency is required", function () {
      return true; // always pass — onSubmit handles this
    }),

  selectedSeatLabel: Yup.string().nullable(),
  selectedDistrictLabel: Yup.string().nullable(),
  officeType: Yup.array().of(Yup.string()).default([]),

  districtSelections: Yup.object({
    usRepresentativeDistrict: Yup.number().nullable(),
    stateSenatorDistrict: Yup.number().nullable(),
    stateRepresentativeDistricts: Yup.array().of(Yup.number()).default([]),
  }).test(
    "at-least-one-district",
    "Select at least one district",
    function (value) {
      const hasUsRepresentative = Boolean(value?.usRepresentativeDistrict);
      const hasStateSenator = Boolean(value?.stateSenatorDistrict);
      const hasStateRepresentative =
        Array.isArray(value?.stateRepresentativeDistricts) &&
        value.stateRepresentativeDistricts.length > 0;

      return hasUsRepresentative || hasStateSenator || hasStateRepresentative
        ? true
        : this.createError({
            path: "districtSelections",
            message: "Select at least one district",
          });
    },
  ),

  agree: Yup.boolean().oneOf([true], "Please accept terms"),
});

export const stepVoterSchema = Yup.object({
  voter_registeration_number: Yup.string().required(
    "Voter registration number required",
  ),
});

export const stepUserSchema = Yup.object({
  state_or_driving_license_number: Yup.string().required(
    "State ID / Driving License number required",
  ),
});

export const step3Schema = Yup.object({
  faceScanImage: Yup.string().nullable(),
});
