import { useQuery } from "@tanstack/react-query";
import { City, State } from "country-state-city";
import Link from "next/link";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Eyeclose, Eyeopen } from "../../../Assets/svg/Allsvgicons";
import { CONSTITUENCY_LIST } from "../../../services/ApiCalls";
import {
  alaskaBoroughList,
  getCountyOptionsByStateByCode,
} from "../../../Utilities/const";
import Buttontheme from "../../ui/Buttontheme";
import Textfield from "../../ui/Formfields/Textfield";

const BRANCH_OPTIONS = [
  {
    label: "Legislature",
    value: "legislative",
    description: "U.S. House, and state legislature seats.",
  },
];

const LEGISLATIVE_OPTIONS = [
  {
    label: "⁠Which US Representative district do you live in?",
    value: "us representative",
    description: "Federal house district — choose your district.",
    isMultiSeat: true,
    needsDistrict: true,
    useMultiSelect: false,
    senateType: "US_House",
    matchKeywords: [
      "u.s. representative",
      "us representative",
      "house of representatives",
      "representative",
    ],
  },
  {
    label: "⁠⁠Which State Senator district do you live in? ",
    value: "state senator",
    description: "Upper chamber — choose your state senate district.",
    isMultiSeat: true,
    needsDistrict: true,
    useMultiSelect: false,
    senateType: "State_Senate",
    matchKeywords: ["state senator", "state senate", "senate district"],
  },
  {
    label: "⁠⁠Which State Representative district (s) do you live in?",
    value: "state representative",
    description: "Lower chamber — choose your state house district.",
    isMultiSeat: true,
    needsDistrict: true,
    useMultiSelect: true,
    senateType: "State_House",
    matchKeywords: [
      "state representative",
      "state house",
      "house district",
      "assembly",
    ],
  },
];

const US_REP_DISTRICTS = {
  Alabama: 7,
  Alaska: 1,
  Arizona: 9,
  Arkansas: 4,
  California: 52,
  Colorado: 8,
  Connecticut: 5,
  Delaware: 1,
  Florida: 28,
  Georgia: 14,
  Hawaii: 2,
  Idaho: 2,
  Illinois: 17,
  Indiana: 9,
  Iowa: 4,
  Kansas: 4,
  Kentucky: 6,
  Louisiana: 6,
  Maine: 2,
  Maryland: 8,
  Massachusetts: 9,
  Michigan: 13,
  Minnesota: 8,
  Mississippi: 4,
  Missouri: 8,
  Montana: 2,
  Nebraska: 3,
  Nevada: 4,
  "New Hampshire": 2,
  "New Jersey": 12,
  "New Mexico": 3,
  "New York": 26,
  "North Carolina": 14,
  "North Dakota": 1,
  Ohio: 15,
  Oklahoma: 5,
  Oregon: 6,
  Pennsylvania: 17,
  "Rhode Island": 2,
  "South Carolina": 7,
  "South Dakota": 1,
  Tennessee: 9,
  Texas: 38,
  Utah: 4,
  Vermont: 1,
  Virginia: 11,
  Washington: 10,
  "West Virginia": 2,
  Wisconsin: 8,
  Wyoming: 1,
};
const STATE_SENATE_DISTRICTS = {
  Alabama: 35,
  Alaska: 20,
  Arizona: 30,
  Arkansas: 35,
  California: 40,
  Colorado: 35,
  Connecticut: 36,
  Delaware: 21,
  Florida: 40,
  Georgia: 56,
  Hawaii: 25,
  Idaho: 35,
  Illinois: 59,
  Indiana: 50,
  Iowa: 50,
  Kansas: 40,
  Kentucky: 38,
  Louisiana: 39,
  Maine: 35,
  Maryland: 47,
  Massachusetts: 40,
  Michigan: 38,
  Minnesota: 67,
  Mississippi: 52,
  Missouri: 34,
  Montana: 50,
  Nebraska: 49,
  Nevada: 21,
  "New Hampshire": 24,
  "New Jersey": 40,
  "New Mexico": 42,
  "New York": 63,
  "North Carolina": 50,
  "North Dakota": 47,
  Ohio: 33,
  Oklahoma: 48,
  Oregon: 30,
  Pennsylvania: 50,
  "Rhode Island": 38,
  "South Carolina": 46,
  "South Dakota": 35,
  Tennessee: 33,
  Texas: 31,
  Utah: 29,
  Vermont: 30,
  Virginia: 40,
  Washington: 49,
  "West Virginia": 34,
  Wisconsin: 33,
  Wyoming: 30,
};
const STATE_HOUSE_DISTRICTS = {
  Alabama: 105,
  Alaska: 40,
  Arizona: 60,
  Arkansas: 100,
  California: 80,
  Colorado: 65,
  Connecticut: 151,
  Delaware: 41,
  Florida: 120,
  Georgia: 180,
  Hawaii: 51,
  Idaho: 70,
  Illinois: 118,
  Indiana: 100,
  Iowa: 100,
  Kansas: 125,
  Kentucky: 100,
  Louisiana: 105,
  Maine: 151,
  Maryland: 141,
  Massachusetts: 160,
  Michigan: 110,
  Minnesota: 134,
  Mississippi: 122,
  Missouri: 163,
  Montana: 100,
  Nebraska: 49,
  Nevada: 42,
  "New Hampshire": 400,
  "New Jersey": 80,
  "New Mexico": 70,
  "New York": 150,
  "North Carolina": 120,
  "North Dakota": 94,
  Ohio: 99,
  Oklahoma: 101,
  Oregon: 60,
  Pennsylvania: 203,
  "Rhode Island": 75,
  "South Carolina": 124,
  "South Dakota": 70,
  Tennessee: 99,
  Texas: 150,
  Utah: 75,
  Vermont: 150,
  Virginia: 100,
  Washington: 98,
  "West Virginia": 100,
  Wisconsin: 99,
  Wyoming: 60,
};

const normalizeText = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getCalendarValue = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const mapConstituencyItem = (item) => ({
  label: item.name,
  value: item._id,
  senateType: item.senateType,
  name: item.name,
  state: item.state,
  level: item.level,
  county: item.county,
  city: item.city,
  district: item.district,
  districtName: item.districtName,
  title: item.title,
  description: item.description,
});

const matchesConstituency = (
  item,
  office,
  branch,
  stateName,
  stateCode,
  districtValue,
  countyName,
  cityName,
) => {
  if (!item || !office) return false;

  const searchText = [item?.name, item?.label, item?.title, item?.description]
    .map((v) => normalizeText(v || ""))
    .filter(Boolean)
    .join(" ");

  const senateTypeMatches = office.senateType
    ? item?.senateType === office.senateType
    : false;
  const keywordMatches = office.matchKeywords?.some((kw) =>
    searchText.includes(normalizeText(kw)),
  );
  const officeMatches = senateTypeMatches || keywordMatches;

  if (branch === "county") {
    if (!officeMatches) return false;
    const normalizedCounty = normalizeText(countyName || "");
    const normalizedCity = normalizeText(cityName || "");
    const itemCounty = normalizeText(item?.county || "");
    const itemCity = normalizeText(item?.city || "");
    const countyMatches =
      !normalizedCounty || !itemCounty || itemCounty === normalizedCounty;
    const cityMatches =
      !normalizedCity || !itemCity || itemCity === normalizedCity;
    return countyMatches && cityMatches;
  }

  return false;
};

const PillBtn = ({ label, active, disabled, onClick }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    style={{
      padding: "8px 16px",
      borderRadius: 8,
      border: active ? "2px solid #D85A30" : "1.5px solid #ced4da",
      background: active ? "#FAECE7" : "#fff",
      color: active ? "#993C1D" : "#495057",
      fontWeight: 500,
      fontSize: 13,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "all 0.15s",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </button>
);

const OfficeCard = ({
  label,
  description,
  active,
  isMultiSeat,
  badge,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      width: "100%",
      textAlign: "left",
      border: active ? "2px solid #D85A30" : "1.5px solid #dee2e6",
      borderRadius: 10,
      padding: "12px 14px",
      background: active ? "#FAECE7" : "#fff",
      cursor: "pointer",
      transition: "all 0.15s",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 12,
          height: 12,
          flexShrink: 0,
          border: `2px solid ${active ? "#D85A30" : "#adb5bd"}`,
          borderRadius: isMultiSeat ? "50%" : 2,
          background: active ? "#D85A30" : "transparent",
        }}
      />
      <span
        style={{
          fontWeight: 600,
          fontSize: 13,
          color: active ? "#993C1D" : "#212529",
        }}
      >
        {label}
      </span>
      {badge && (
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            padding: "1px 7px",
            borderRadius: 4,
            background:
              badge === "At-Large"
                ? "#E1F5EE"
                : badge === "District"
                  ? "#EEF2FF"
                  : "#FFF3E0",
            color:
              badge === "At-Large"
                ? "#085041"
                : badge === "District"
                  ? "#3730a3"
                  : "#92400e",
          }}
        >
          {badge}
        </span>
      )}
    </div>
    {description && (
      <p style={{ margin: "4px 0 0 20px", fontSize: 11, color: "#6c757d" }}>
        {description}
      </p>
    )}
  </button>
);

const Step1 = ({ activeTab, onNext }) => {
  const [stateIso, setStateIso] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const selectedState = watch("state");
  const districtSelections = watch("districtSelections") || {};
  const selectedCity = watch("city");

  const isAlaska =
    selectedState?.name === "Alaska" || selectedState?.isoCode === "AK";
  const selectedCountyName = isAlaska ? watch("borough") : watch("county");
  const stateName = selectedState?.name || "";

  const usRepDistrictCount = US_REP_DISTRICTS[stateName] || 1;
  const stateSenateDistCount = STATE_SENATE_DISTRICTS[stateName] || 40;
  const stateHouseDistCount = STATE_HOUSE_DISTRICTS[stateName] || 100;

  const officeDistrictConfig = useMemo(
    () => ({
      "us representative": {
        field: "usRepresentativeDistrict",
        count: usRepDistrictCount,
        prefix: "District",
        useMultiSelect: false,
      },
      "state senator": {
        field: "stateSenatorDistrict",
        count: stateSenateDistCount,
        prefix: "District",
        useMultiSelect: false,
      },
      "state representative": {
        field: "stateRepresentativeDistricts",
        count: stateHouseDistCount,
        prefix: "House District",
        useMultiSelect: true,
      },
    }),
    [stateHouseDistCount, stateSenateDistCount, usRepDistrictCount],
  );

  const filteredCountyList = useMemo(() => {
    if (!selectedState?.isoCode) return [];
    return getCountyOptionsByStateByCode(selectedState.isoCode);
  }, [selectedState?.isoCode]);

  const cityOptions = City.getCitiesOfState(
    "US",
    stateIso || selectedState?.isoCode || "",
  ).map((c) => ({
    name: c.name,
    value: c.name,
  }));

  const r = (keys) => {
    keys.forEach((k) =>
      setValue(
        k,
        ["selectedSeats", "officeType"].includes(k)
          ? []
          : k === "districtSelections"
            ? {
                usRepresentativeDistrict: null,
                stateSenatorDistrict: null,
                stateRepresentativeDistricts: [],
              }
            : null,
        {
          shouldValidate: false,
        },
      ),
    );
  };

  const resetFromState = () => {
    r(["county", "borough", "city", "officeType", "districtSelections"]);
    clearErrors(["county", "borough", "officeType", "districtSelections"]);
  };

  const resetFromCounty = () => {
    r(["city", "officeType", "districtSelections"]);
    clearErrors(["officeType", "districtSelections"]);
  };

  const onSubmit = () => {
    onNext();
  };

  const stateOptions = State.getStatesOfCountry("US").map((s) => ({
    name: s.name,
    value: s,
  }));

  const showCountyDropdown = selectedState && !isAlaska;
  const showBoroughDropdown = selectedState && isAlaska;
  const showCityDropdown = !!selectedState;

  console.log(errors, "erororoororor");
  return (
    <div className="authformWrap">
      {activeTab === "participantonly" && (
        <div className="infoText mb-3">
          <p className="m-0">
            You can share and judge ideas but you can't pledge votes for
            government judge.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="authform">
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Textfield
                      {...field}
                      type="text"
                      label="Full Name"
                      value={field.value || ""}
                      placeholder="Enter your full name"
                      error={errors.name?.message}
                    />
                  )}
                />
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div className="phoneNumber position-relative">
                      <PhoneInput
                        {...field}
                        country="us"
                        onlyCountries={["us"]}
                        placeholder="Enter phone number"
                        disableCountryCode
                      />
                    </div>
                  )}
                />
                {errors.phone && (
                  <p className="text-danger">{errors.phone.message}</p>
                )}
              </div>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <div className="mb-3">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Textfield
                      {...field}
                      type="email"
                      label="Email Address"
                      value={field.value || ""}
                      placeholder="Enter email address"
                      error={errors.email?.message}
                    />
                  )}
                />
              </div>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <div className="mb-3 field_class">
                <label className="form-label">Date of Birth</label>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => {
                    const t = new Date();
                    const maxDOB = new Date(
                      t.getFullYear() - 18,
                      t.getMonth(),
                      t.getDate(),
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
                        {errors.dob && (
                          <span className="error text-danger">
                            {errors.dob.message}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3 field_class">
                <label
                  className="form-label"
                  style={{ fontWeight: 600, fontSize: 13 }}
                >
                  Step 1. Choose your state
                </label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <div className="position-relative">
                      <Dropdown
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                          setStateIso(e.value?.isoCode);
                          resetFromState();
                        }}
                        options={stateOptions}
                        optionLabel="name"
                        optionValue="value"
                        placeholder="Choose state"
                        className="w-100 text_input"
                        filterPlaceholder="Search state…"
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

            {selectedState && showCountyDropdown && !isAlaska && (
              <Col lg={12}>
                <div className="mb-3 field_class">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 13 }}
                  >
                    Step 2. Select your county
                  </label>
                  <Controller
                    name="county"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        key={`county-${selectedState?.isoCode}`}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                          resetFromCounty();
                        }}
                        options={filteredCountyList}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Choose county"
                        className="w-100 text_input"
                        filterPlaceholder="Search county…"
                        disabled={!selectedState}
                      />
                    )}
                  />
                  {errors.county && (
                    <span className="error text-danger">
                      {errors.county.message}
                    </span>
                  )}
                </div>
              </Col>
            )}

            {selectedState && showBoroughDropdown && (
              <Col lg={12}>
                <div className="mb-3 field_class">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 13 }}
                  >
                    Borough (Alaska)
                  </label>
                  <Controller
                    name="borough"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                          resetFromCounty();
                        }}
                        options={alaskaBoroughList}
                        optionLabel="boroughName"
                        optionValue="boroughName"
                        placeholder="Choose borough"
                        className="w-100 text_input"
                        appendTo="self"
                      />
                    )}
                  />
                  {errors.borough && (
                    <span className="error text-danger">
                      {errors.borough.message}
                    </span>
                  )}
                </div>
              </Col>
            )}

            {selectedState && showCityDropdown && (
              <Col lg={12}>
                <div className="mb-3 field_class">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 13 }}
                  >
                    Step 3. Select your city
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={cityOptions}
                        optionLabel="name"
                        optionValue="value"
                        appendTo="self"
                        placeholder="Choose city"
                        className="w-100 text_input"
                        filterPlaceholder="Search city…"
                        emptyMessage={
                          !selectedState
                            ? "Select a state first"
                            : "No cities found"
                        }
                      />
                    )}
                  />
                  {errors.city && (
                    <span className="error text-danger">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </Col>
            )}

            {selectedState && (
              <>
                <Col lg={12}>
                  <div className="mb-2">
                    <label
                      className="form-label"
                      style={{ fontWeight: 600, fontSize: 13 }}
                    >
                      Step 4. Choose your districts
                    </label>
                    <p
                      className="text-muted"
                      style={{ fontSize: 11, marginBottom: 8 }}
                    >
                      Select the district fields that apply to you.
                    </p>
                  </div>
                </Col>
              
                {LEGISLATIVE_OPTIONS.map((office, index) => {
                  const config = officeDistrictConfig[office.value];
                  if (!config?.count) return null;

                  const districtOptions = Array.from(
                    { length: config.count },
                    (_, i) => ({
                      label: `${config.prefix} ${i + 1}`,
                      value: i + 1,
                    }),
                  );

                  const fieldPath = `districtSelections.${config.field}`;
                  const selectedValue = districtSelections?.[config.field];
                  const fieldError = errors?.districtSelections?.[config.field];
                  const selectedDistrictLabels = Array.isArray(selectedValue)
                    ? districtOptions
                        .filter((item) => selectedValue.includes(item.value))
                        .map((item) => item.label)
                    : districtOptions
                        .filter((item) => item.value === selectedValue)
                        .map((item) => item.label);
                  const hasSelectedDistrict =
                    selectedDistrictLabels.length > 0;

                  return (
                    <Col lg={12} key={office.value}>
                      <div className="mb-3 field_class">
                        <label
                          className="form-label"
                          style={{ fontWeight: 600, fontSize: 13 }}
                        >
                          {`Step 4${String.fromCharCode(97 + index)}. ${office.label}`}
                          {stateName &&
                            ` (${stateName} has ${config.count} district${config.count === 1 ? "" : "s"})`}
                        </label>

                        <Controller
                          name={fieldPath}
                          control={control}
                          render={({ field }) =>
                            config.useMultiSelect ? (
                              <MultiSelect
                                value={Array.isArray(field.value) ? field.value : []}
                                onChange={(e) => field.onChange(e.value)}
                                options={districtOptions}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Choose districts"
                                className={`w-100 text_input districtMultiSelect districtSelect ${hasSelectedDistrict ? "districtSelectSelected" : ""}`}
                                panelClassName="districtMultiSelectPanel districtSelectPanel"
                                filter
                                filterPlaceholder="Search district..."
                                maxSelectedLabels={3}
                                selectedItemsLabel="{0} districts selected"
                              />
                            ) : (
                              <Dropdown
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                options={districtOptions}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Choose district"
                                className={`w-100 text_input districtSelect ${hasSelectedDistrict ? "districtSelectSelected" : ""}`}
                                panelClassName="districtSelectPanel"
                                filterPlaceholder="Search district..."
                              />
                            )
                          }
                        />

                        {fieldError && (
                          <span className="error text-danger">
                            {fieldError.message}
                          </span>
                        )}

                        {hasSelectedDistrict && (
                          <div className="signupSelectedDistrict mt-2">
                            <p className="mb-0">
                              ✓ Selected: {selectedDistrictLabels.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </Col>
                  );
                })}

                {errors.districtSelections?.message && (
                  <Col lg={12}>
                    <span className="error text-danger">
                      {errors.districtSelections.message}
                    </span>
                  </Col>
                )}
              </>
            )}

            <Col lg={12}>
              <div className="mb-3">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div className="position-relative">
                      <Textfield
                        {...field}
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Enter Password"
                        error={errors.password?.message}
                      />
                      <Button
                        type="button"
                        className="eyeIcon"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? <Eyeopen /> : <Eyeclose />}
                      </Button>
                    </div>
                  )}
                />
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3">
                <Controller
                  name="agree"
                  control={control}
                  render={({ field }) => (
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <label className="formlabel m-0">
                        I agree to all the{" "}
                        <Link href="#" className="theme_text fw-semibold">
                          Privacy Policy
                        </Link>{" "}
                        &{" "}
                        <Link href="#" className="theme_text fw-semibold">
                          Terms & Conditions
                        </Link>
                      </label>
                    </div>
                  )}
                />
                {errors.agree && (
                  <p className="text-danger">{errors.agree.message}</p>
                )}
              </div>
            </Col>
          </Row>
        </div>

        <Buttontheme type="submit" className="w-100 mt-3">
          Save & Next
        </Buttontheme>
      </form>
    </div>
  );
};

export default Step1;
