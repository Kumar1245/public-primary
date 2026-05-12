import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Textfield from "../../../ui/Formfields/Textfield";
import Textareafield from "../../../ui/Formfields/Textareafield";
import { Dropdown } from "primereact/dropdown";
import { City, State } from "country-state-city";
import { CONSTITUENCY_LIST } from "../../../../services/ApiCalls";
import { getCountyOptionsByState } from "../../../../Utilities/const";
import { getCountyOptionsForState } from "../../../../Utilities/signupConstituencyFlow";

const LOCAL_TYPE_OPTIONS = [
  { label: "Government", value: "Government" },
  { label: "Non-Government", value: "Non-Government" },
];

const NON_GOVERNMENT_LABEL_OPTIONS = [
  { label: "HOA", value: "hoa" },
  { label: "Non-Profit Business", value: "non_profit_business" },
  { label: "Business Partnership", value: "business_partnership" },
  { label: "School Use", value: "school_use" },
  { label: "Other", value: "custom" },
];

const GOVERNMENT_BASE_OPTIONS = [
  { label: "Probate Judge", value: "Probate Judge" },
  { label: "Sheriff", value: "Sheriff" },
  { label: "Revenue Commissioner", value: "Revenue Commissioner" },
  { label: "Tax Assessor", value: "Tax Assessor" },
  { label: "Tax Collector", value: "Tax Collector" },
  { label: "Circuit Court Clerk", value: "Circuit Court Clerk" },
  { label: "Coroner", value: "Coroner" },
  { label: "County Council", value: "County Council" },
  { label: "County Commissioner", value: "County Commissioner" },
  { label: "City Council", value: "City Council" },
  { label: "Town Council", value: "Town Council" },
];

const CUSTOM_CONSTITUENCY_OPTION = { label: "Other", value: "custom" };
const MAX_ELECTED_SEATS = 100;

const NON_GOVERNMENT_LABEL_ALIASES = {
  hoa: ["hoa"],
  non_profit_business: ["non_profit_business", "nonprofit_business"],
  business_partnership: ["business_partnership", "private_business"],
  school_use: ["school_use"],
};

const normalizeValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const getConstituencyName = (item) =>
  item?.name ||
  item?.constituencyName ||
  item?.title ||
  item?.districtName ||
  "";

const getConstituencyLabel = (item) =>
  item?.label ||
  item?.category ||
  item?.constituencyLabel ||
  item?.constituencyType ||
  "";

const matchesCounty = (item, county) => {
  if (!county) return true;

  const itemCounty =
    item?.county || item?.countyName || item?.location?.county || "";

  return normalizeValue(itemCounty) === normalizeValue(county);
};

const AddconsitStep1 = ({
  control,
  errors,
  termOptions,
  watch,
  setValue,
  onhide,
  accountAddress,
}) => {
  const [stateIso, setStateIso] = useState(null);
  const states = useMemo(() => State.getStatesOfCountry("US"), []);
  const rawElectedSeat = Number(watch("electedSeat")) || 0;
  const electedSeat = Math.min(
    Math.max(rawElectedSeat, 0),
    MAX_ELECTED_SEATS,
  );
  const watchedNextElectionDates = watch("nextElectionDates");
  const nextElectionDates = useMemo(
    () =>
      Array.isArray(watchedNextElectionDates) ? watchedNextElectionDates : [],
    [watchedNextElectionDates],
  );
  const nextElectionDatesLength = Array.isArray(nextElectionDates)
    ? nextElectionDates.length
    : 0;
  const selectedType = watch("type");
  const selectedBranchType = watch("constituencyBranchType");
  const setupReadiness = watch("setupReadiness");
  const commonConstituency = watch("commonConstituency");
  const selectedStateName = watch("state");
  const selectedCounty = watch("county");
  const selectedName = watch("name");
  const shouldUseAccountLocation = Boolean(
    accountAddress?.state && accountAddress?.county,
  );

  useEffect(() => {
    const electionDates = Array.isArray(nextElectionDates)
      ? nextElectionDates
      : [];

    if (electedSeat > 0) {
      if (nextElectionDatesLength === electedSeat) return;

      const updated = Array.from(
        { length: electedSeat },
        (_, index) => electionDates[index] || "",
      );
      setValue("nextElectionDates", updated, { shouldValidate: true });
    } else if (nextElectionDatesLength > 0) {
      setValue("nextElectionDates", [], { shouldValidate: false });
    }
  }, [electedSeat, nextElectionDates, nextElectionDatesLength, setValue]);

  const getStateIsoCode = useMemo(
    () => (value) => {
      if (!value) return null;

      const normalizedValue = String(value).trim().toLowerCase();
      const matchedState = states.find(
        (state) =>
          state.isoCode.toLowerCase() === normalizedValue ||
          state.name.toLowerCase() === normalizedValue,
      );

      return matchedState?.isoCode || null;
    },
    [states],
  );

  useEffect(() => {
    setValue("state", accountAddress?.state || "", { shouldValidate: false });
    setValue("county", accountAddress?.county || "", { shouldValidate: false });
    setValue("city", accountAddress?.city || "", { shouldValidate: false });
    setStateIso(getStateIsoCode(accountAddress?.state));
  }, [
    accountAddress?.city,
    accountAddress?.county,
    accountAddress?.state,
    getStateIsoCode,
    setValue,
  ]);

  useEffect(() => {
    setValue("label", "", { shouldValidate: false });
    setValue("constituencyBranchType", "", { shouldValidate: false });
    setValue("commonConstituency", "", { shouldValidate: false });
    setValue("name", "", { shouldValidate: false });
    if (selectedType === "Government") {
      setValue("label", "State", { shouldValidate: true });
      setValue("constituencyBranchType", "county", { shouldValidate: false });
    }
    if (selectedType === "Non-Government") {
      setValue("label", "Local", { shouldValidate: true });
    }
  }, [selectedType, setValue]);

  useEffect(() => {
    setValue("commonConstituency", "", { shouldValidate: false });
    setValue("name", "", { shouldValidate: false });
  }, [selectedBranchType, setValue]);

  useEffect(() => {
    if (commonConstituency && commonConstituency !== "custom") {
      setValue("name", commonConstituency, { shouldValidate: true });
    }
  }, [commonConstituency, setValue]);

  const selectedState = useMemo(
    () =>
      states.find(
        (state) =>
          state.name === selectedStateName ||
          state.isoCode === selectedStateName,
      ) || null,
    [selectedStateName, states],
  );

  const stateOptions = useMemo(
    () =>
      states.map((state) => ({
        label: state.name,
        value: state.name,
      })),
    [states],
  );

  const { data: governmentConstituencyData, isFetching: isGovernmentLoading } =
    useQuery({
      queryKey: [
        "add-constituency-government-options",
        selectedState?.isoCode || selectedStateName,
      ],
      queryFn: async () => {
        const res = await CONSTITUENCY_LIST({
          page: 1,
          limit: 100,
          country: "US",
          state: selectedState?.isoCode || selectedStateName,
          constituencyBranchType: "county",
        });

        return Array.isArray(res?.data?.data) ? res.data.data : [];
      },
      enabled: selectedType === "Government" && Boolean(selectedStateName),
    });

  const {
    data: nonGovernmentConstituencyData,
    isFetching: isNonGovernmentLoading,
  } = useQuery({
    queryKey: [
      "add-constituency-non-government-options",
      selectedState?.isoCode || selectedStateName,
      selectedCounty,
      selectedBranchType,
    ],
    queryFn: async () => {
      const res = await CONSTITUENCY_LIST({
        page: 1,
        limit: 100,
        country: "US",
        state: selectedState?.isoCode || selectedStateName,
        county: selectedCounty || "",
        type: "Non-Government",
      });

      return Array.isArray(res?.data?.data) ? res.data.data : [];
    },
    enabled:
      selectedType === "Non-Government" &&
      Boolean(selectedStateName) &&
      Boolean(selectedCounty) &&
      Boolean(selectedBranchType) &&
      selectedBranchType !== "custom",
  });

  const countyOptions = useMemo(() => {
    const dynamicCountyOptions = getCountyOptionsForState({
      state: selectedState,
      constituencies: governmentConstituencyData || [],
    });

    if (dynamicCountyOptions.length) {
      return dynamicCountyOptions;
    }

    return getCountyOptionsByState(selectedState?.isoCode || "");
  }, [governmentConstituencyData, selectedState]);

  const governmentConstituencyOptions = useMemo(() => {
    const countyScopedGovernmentOptions = (governmentConstituencyData || [])
      .filter((item) => matchesCounty(item, selectedCounty))
      .map(getConstituencyName)
      .filter(Boolean);

    const uniqueOptions = Array.from(
      new Map(
        [...GOVERNMENT_BASE_OPTIONS.map((item) => item.value), ...countyScopedGovernmentOptions]
          .map((name) => [name.toLowerCase(), name]),
      ).values(),
    )
      .sort((left, right) => left.localeCompare(right))
      .map((name) => ({
        label: name,
        value: name,
      }));

    return [...uniqueOptions, CUSTOM_CONSTITUENCY_OPTION];
  }, [governmentConstituencyData, selectedCounty]);

  const nonGovernmentConstituencyOptions = useMemo(() => {
    const allowedLabels = NON_GOVERNMENT_LABEL_ALIASES[selectedBranchType] || [
      selectedBranchType,
    ];

    const matchingOptions = (nonGovernmentConstituencyData || [])
      .filter((item) => matchesCounty(item, selectedCounty))
      .filter(
        (item) =>
          allowedLabels.includes(normalizeValue(getConstituencyLabel(item))),
      )
      .map(getConstituencyName)
      .filter(Boolean);

    const uniqueOptions = Array.from(
      new Map(matchingOptions.map((name) => [normalizeValue(name), name])).values(),
    )
      .sort((left, right) => left.localeCompare(right))
      .map((name) => ({
        label: name,
        value: name,
      }));

    return [...uniqueOptions, CUSTOM_CONSTITUENCY_OPTION];
  }, [nonGovernmentConstituencyData, selectedBranchType, selectedCounty]);

  const cityoptions = useMemo(
    () =>
      City.getCitiesOfState("US", stateIso || "").map((city) => ({
        name: city.name,
        value: city.name,
      })),
    [stateIso],
  );

  const labelOptions =
    selectedType === "Non-Government" ? NON_GOVERNMENT_LABEL_OPTIONS : [];

  const commonConstituencyOptions =
    selectedType === "Government"
      ? governmentConstituencyOptions
      : nonGovernmentConstituencyOptions;

  const requiresCustomName =
    selectedBranchType === "custom" || commonConstituency === "custom";

  const selectedGovernmentName =
    commonConstituency === "custom" ? selectedName : commonConstituency;
  const isCouncilConstituency = ["County Council", "City Council", "Town Council"].includes(
    selectedGovernmentName,
  );

  if (!control) return null;

  return (
    <div>
      <div className="constituency-question-box">
        <label className="constituency-form-label">
          Do you have the information for the constituency before we proceed?
          Name, job description, election dates, and approx how many voted for
          each seat?
        </label>
        <div className="constituency-button-group">
          <button
            type="button"
            onClick={() => {
              setValue("setupReadiness", "no", { shouldValidate: false });
              onhide?.();
            }}
            className="constituency-option-btn"
          >
            Setup Later
          </button>
          <button
            type="button"
            onClick={() =>
              setValue("setupReadiness", "yes", { shouldValidate: true })
            }
            className={`constituency-option-btn ${
              setupReadiness === "yes" ? "constituency-option-btn-active" : ""
            }`}
          >
            Yes
          </button>
        </div>
        {errors.setupReadiness && (
          <span className="constituency-error-text">
            {errors.setupReadiness.message}
          </span>
        )}
      </div>

      {setupReadiness !== "yes" ? null : (
        <>
          <div className="constituency-form-group">
            <label className="constituency-form-label">Type</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  <Dropdown
                    {...field}
                    placeholder="Select constituency type"
                    optionLabel="label"
                    optionValue="value"
                    options={LOCAL_TYPE_OPTIONS}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    className="w-100 text_input"
                  />
                  {errors.type && (
                    <span className="constituency-error-text">
                      {errors.type.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {selectedType === "Non-Government" && (
            <div className="constituency-form-group">
              <label className="constituency-form-label">Constituency Level</label>
              <Controller
                name="constituencyBranchType"
                control={control}
                render={({ field }) => (
                  <>
                    <Dropdown
                      {...field}
                      placeholder="Select constituency level"
                      optionLabel="label"
                      optionValue="value"
                      options={labelOptions}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      className="w-100 text_input"
                      disabled={!selectedType}
                    />
                    {errors.constituencyBranchType && (
                      <span className="constituency-error-text">
                        {errors.constituencyBranchType.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          )}

          {!shouldUseAccountLocation && (
            <>
              <div className="constituency-form-group">
                <label className="constituency-form-label">State</label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Dropdown
                        {...field}
                        placeholder="Select state"
                        optionLabel="label"
                        optionValue="value"
                        options={stateOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                          setStateIso(getStateIsoCode(e.value));
                          setValue("county", "", { shouldValidate: false });
                          setValue("city", "", { shouldValidate: false });
                          setValue("commonConstituency", "", {
                            shouldValidate: false,
                          });
                          setValue("name", "", { shouldValidate: false });
                        }}
                        className="w-100 text_input"
                      />
                      {errors.state && (
                        <span className="constituency-error-text">
                          {errors.state.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="constituency-form-group">
                <label className="constituency-form-label">County</label>
                <Controller
                  name="county"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Dropdown
                        {...field}
                        placeholder={
                          selectedState ? "Select county" : "Select state first"
                        }
                        optionLabel="label"
                        optionValue="value"
                        options={countyOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                          setValue("city", "", { shouldValidate: false });
                          setValue("commonConstituency", "", {
                            shouldValidate: false,
                          });
                          setValue("name", "", { shouldValidate: false });
                        }}
                        className="w-100 text_input"
                        disabled={!selectedState}
                      />
                      {errors.county && (
                        <span className="constituency-error-text">
                          {errors.county.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </>
          )}

          <div className="constituency-form-group">
            <label className="constituency-form-label">Constituency</label>
            <Controller
              name="commonConstituency"
              control={control}
              render={({ field }) => (
                <>
                  <Dropdown
                    {...field}
                    placeholder={
                      selectedType === "Government"
                        ? isGovernmentLoading
                          ? "Loading county constituencies..."
                          : selectedCounty
                            ? "Select government constituency"
                            : "Select county first"
                        : isNonGovernmentLoading
                          ? "Loading existing constituencies..."
                          : selectedCounty
                            ? "Select an existing constituency or choose Other"
                            : selectedBranchType
                              ? "Select county first"
                              : "Select constituency level first"
                    }
                    optionLabel="label"
                    optionValue="value"
                    options={commonConstituencyOptions}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    className="w-100 text_input"
                    disabled={
                      !selectedType ||
                      (selectedType === "Government" &&
                        (!selectedStateName || !selectedCounty || isGovernmentLoading)) ||
                      (selectedType === "Non-Government" &&
                        (!selectedBranchType ||
                          selectedBranchType === "custom" ||
                          !selectedCounty ||
                          isNonGovernmentLoading))
                    }
                  />
                  {errors.commonConstituency && (
                    <span className="constituency-error-text">
                      {errors.commonConstituency.message}
                    </span>
                  )}
                  {selectedType === "Government" && selectedCounty && (
                    <small className="text-muted d-block mt-2">
                      Government constituencies can be joined publicly after community confirmation.
                    </small>
                  )}
                  {selectedType === "Non-Government" && selectedCounty && selectedBranchType !== "custom" && (
                    <small className="text-muted d-block mt-2">
                      Non-government constituencies are grouped by category first, then users can join an existing one or create a new one.
                    </small>
                  )}
                </>
              )}
            />
          </div>

          <div className="constituency-form-group">
            <label className="constituency-form-label">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <Textfield
                    {...field}
                    type="text"
                    placeholder="Enter constituency name"
                    onChange={field.onChange}
                    disabled={!requiresCustomName && commonConstituency !== ""}
                  />
                  {errors.name && (
                    <span className="constituency-error-text">
                      {errors.name.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className="constituency-form-group">
            <label className="constituency-form-label">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <Textareafield
                    {...field}
                    type="text"
                    placeholder="Enter description"
                    onChange={field.onChange}
                  />
                  {errors.description && (
                    <span className="constituency-error-text">
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className="constituency-form-group">
            <label className="constituency-form-label">
              How many elected seats does this constituency have?
            </label>
            {selectedType === "Government" && isCouncilConstituency && (
              <small className="text-muted d-block mb-2">
                District and at-large seat setup applies to County Council, City Council, and Town Council only.
              </small>
            )}
            <Controller
              name="electedSeat"
              control={control}
              render={({ field }) => (
                <>
                  <Textfield
                    {...field}
                    type="number"
                    min="1"
                    max={MAX_ELECTED_SEATS}
                    step="1"
                    inputMode="numeric"
                    placeholder="#"
                    onKeyDown={(e) => {
                      if (["-", "+", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      const pastedValue = e.clipboardData.getData("text");
                      if (Number(pastedValue) < 0) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) >= 0) {
                        field.onChange(value);
                      }
                    }}
                  />
                  {errors.electedSeat && (
                    <span className="constituency-error-text">
                      {errors.electedSeat.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {electedSeat > 0 && (
            <div className="constituency-form-group">
              <label className="constituency-form-label">
                Enter the election date for each seat
              </label>

              {Array.from({ length: electedSeat }).map((_, index) => (
                <Controller
                  key={index}
                  name={`nextElectionDates.${index}`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-2">
                      <Textfield
                        {...field}
                        type="date"
                        placeholder={`Election date ${index + 1}`}
                      />
                      {errors.nextElectionDates?.[index] && (
                        <span className="constituency-error-text">
                          {errors.nextElectionDates[index].message}
                        </span>
                      )}
                    </div>
                  )}
                />
              ))}
            </div>
          )}

          <div className="constituency-form-group">
            <label className="constituency-form-label">
              How long is the term for elected seats?
            </label>
            <Controller
              name="term"
              control={control}
              render={({ field }) => (
                <>
                  <Dropdown
                    {...field}
                    placeholder="Select term"
                    optionLabel="label"
                    optionValue="value"
                    options={termOptions}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    className="w-100 text_input"
                  />
                  {errors.term && (
                    <span className="constituency-error-text">
                      {errors.term.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className="constituency-form-group">
            <label className="constituency-form-label">
              City Or Town (Optional)
            </label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <div className="position-relative">
                  <Dropdown
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={cityoptions}
                    optionLabel="name"
                    optionValue="value"
                    placeholder="Select city or town"
                    className="w-100 text_input"
                    emptyMessage={
                      !stateIso ? "No city list available" : "No cities found"
                    }
                  />
                  {errors.city && (
                    <span className="constituency-error-text">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AddconsitStep1;
