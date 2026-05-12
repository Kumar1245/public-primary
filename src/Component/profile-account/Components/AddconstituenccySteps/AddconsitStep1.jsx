import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { City, State } from "country-state-city";
import { countyList } from "../../../Utilities/const";
import { Dropdown } from "primereact/dropdown";

const AddconsitStep1 = ({
  control,
  errors,
  isDistrict,
  setIsDistrict,
  termOptions,
  termLength,
  constituencyOptions = [],
  watch,
  setValue,
  setConstituencyOptions,
}) => {
  const constituencyType = watch?.("constituencyType");
  const [stateIso, setStateIso] = useState(null);

  const stateoptions = State.getStatesOfCountry("US").map((state) => ({
    name: state.name,
    value: state,
  }));

  const cityoptions = City.getCitiesOfState("US", stateIso).map((city) => ({
    name: city.name,
    value: city.name,
  }));

  return (
    <div>
      <div className="constituency-form-group">
        <label className="constituency-form-label">County</label>
        <Controller
          name="county"
          control={control}
          rules={{ required: "Please select your county" }}
          render={({ field }) => (
            <div className="position-relative">
              <Dropdown
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={countyList}
                optionLabel="countyName"
                optionValue="countyName"
                placeholder="Select county"
                className="w-100 text_input"
              />
              {errors.county && (
                <span className="constituency-error-text">
                  {errors.county.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className="constituency-form-group">
        <label className="constituency-form-label">State</label>
        <Controller
          name="state"
          control={control}
          rules={{ required: "Please select your state" }}
          render={({ field }) => (
            <div className="position-relative">
              <Dropdown
                value={
                  stateoptions.find((opt) => opt.name === field.value) || null
                }
                onChange={(e) => {
                  field.onChange(e.value?.name);
                  setStateIso(e.value?.isoCode);
                }}
                options={stateoptions}
                optionLabel="name"
                optionValue="value"
                placeholder="Select state"
                className="w-100 text_input"
              />
              {errors.state && (
                <span className="constituency-error-text">
                  {errors.state.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className="constituency-form-group">
        <label className="constituency-form-label">City</label>
        <Controller
          name="city"
          control={control}
          rules={{ required: "Please select your city" }}
          render={({ field }) => (
            <div className="position-relative">
              <Dropdown
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={cityoptions}
                optionLabel="name"
                optionValue="value"
                placeholder="Select city"
                className="w-100 text_input"
                emptyMessage={
                  !watch("state")
                    ? "Please select a state first"
                    : "No cities found"
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

      <div className="constituency-form-group">
        <label className="constituency-form-label">Constituency Type</label>
        <Controller
          name="constituencyType"
          control={control}
          render={({ field }) => (
            <>
              <select {...field} className="constituency-form-select">
                <option value="" defaultValue disabled hidden>
                  Select...
                </option>
                {constituencyOptions?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className={option.className}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.constituencyType && (
                <span className="constituency-error-text">
                  {errors.constituencyType.message}
                </span>
              )}
            </>
          )}
        />

        {/* Custom input appears only when 'custom' is selected */}
        {constituencyType === "custom" && (
          <div className="mt-2">
            <Controller
              name="customConstituencyType"
              control={control}
              render={({ field }) => {
                const isDisabled = !field.value || !field.value.trim();
                const handleAdd = () => {
                  const value = field.value.trim();
                  if (!value) return;

                  setConstituencyOptions((prev = []) => {
                    const exists = prev.some(
                      (o) => o?.value?.toLowerCase() === value.toLowerCase(),
                    );

                    if (exists) return prev;

                    return [
                      ...prev.filter((o) => o?.value !== "custom"),
                      { label: value, value },
                      { label: "+ Add new constituency", value: "custom" },
                    ];
                  });

                  setValue("constituencyType", value, { shouldValidate: true });
                  setValue("customConstituencyType", "");
                };

                return (
                  <div className="position-relative d-flex align-items-center gap-2">
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter custom constituency type"
                      className="constituency-form-input"
                    />

                    <button
                      type="button"
                      className="addbtn"
                      disabled={isDisabled}
                      onClick={handleAdd}
                    >
                      + Add
                    </button>
                  </div>
                );
              }}
            />

            {errors.customConstituencyType && (
              <span className="constituency-error-text">
                {errors.customConstituencyType.message}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="constituency-question-box">
        <label className="constituency-form-label">
          Is this a district constituency?
        </label>
        <div className="constituency-button-group">
          <button
            type="button"
            onClick={() => setIsDistrict(false)}
            className={`constituency-option-btn ${
              isDistrict === false ? "constituency-option-btn-active" : ""
            }`}
          >
            No
          </button>
          <button
            type="button"
            onClick={() => setIsDistrict(true)}
            className={`constituency-option-btn ${
              isDistrict === true ? "constituency-option-btn-active" : ""
            }`}
          >
            Yes
          </button>
        </div>
        {isDistrict === true && (
          <p className="constituency-helper-text fw-bold">
            You'll be asked to configure districts in the next step
          </p>
        )}
      </div>

      {isDistrict === true && (
        <div className="constituency-form-group">
          <label className="constituency-form-label">
            How many districts are there?
          </label>
          <Controller
            name="districtsValue"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="number"
                  placeholder="0"
                  className="constituency-form-input constituency-input-uppercase"
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
                {errors.districtsValue && (
                  <span className="constituency-error-text">
                    {errors.districtsValue.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      )}

      <div className="constituency-form-group">
        <label className="constituency-form-label">
          Name this Constituency
        </label>
        <Controller
          name="constituencyName"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder="All caps"
                className="constituency-form-input constituency-input-uppercase"
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
              {errors.constituencyName && (
                <span className="constituency-error-text">
                  {errors.constituencyName.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      <div className="constituency-form-group">
        <label className="constituency-form-label">
          Job Description of elected official
        </label>
        <Controller
          name="jobDescription"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder="All caps"
                className="constituency-form-input constituency-input-uppercase"
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
              {errors.jobDescription && (
                <span className="constituency-error-text">
                  {errors.jobDescription.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      <div className="constituency-form-group">
        <label className="constituency-form-label">
          How many selected seats for this constituency?
        </label>
        <Controller
          name="selectedSeats"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="number"
                placeholder="#"
                className="constituency-form-input"
              />
              {errors.selectedSeats && (
                <span className="constituency-error-text">
                  {errors.selectedSeats.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      <div className="constituency-form-group">
        <label className="constituency-form-label">
          Enter next election date for each seat
        </label>
        <Controller
          name="nextElectionDate"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="date"
                className="constituency-form-input"
              />
              {errors.nextElectionDate && (
                <span className="constituency-error-text">
                  {errors.nextElectionDate.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      <div className="constituency-form-group">
        <label className="constituency-form-label">
          How long is the term for elected seats?
        </label>
        <Controller
          name="termLength"
          control={control}
          render={({ field }) => (
            <>
              <select {...field} className="constituency-form-select">
                <option value="">Custom option</option>
                {termOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.termLength && (
                <span className="constituency-error-text">
                  {errors.termLength.message}
                </span>
              )}
            </>
          )}
        />
        {termLength === "custom" && (
          <Controller
            name="customTermLength"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="Enter custom term length"
                  className="constituency-form-input constituency-mt-8"
                />
                {errors.customTermLength && (
                  <span className="constituency-error-text">
                    {errors.customTermLength.message}
                  </span>
                )}
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default AddconsitStep1;
