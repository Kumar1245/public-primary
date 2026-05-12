import { alaskaBoroughList, countyList } from "./const";

export const formatDateForApi = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
};

const COUNTY_KEYS = [
  "county",
  "countyName",
  "county_name",
  "parish",
  "parishName",
  "municipality",
  "municipalityName",
];

const BOROUGH_KEYS = [
  "borough",
  "boroughName",
  "borough_name",
  "censusArea",
  "census_area",
  "county",
  "countyName",
];

const CITY_KEYS = [
  "city",
  "cityName",
  "city_name",
  "town",
  "townName",
  "municipality",
  "municipalityName",
];

const normalizeLocationValue = (value) =>
  typeof value === "string" ? value.trim() : "";

const getFirstLocationValue = (item, keys = []) => {
  for (const key of keys) {
    const value = normalizeLocationValue(item?.[key]);

    if (value) {
      return value;
    }
  }

  return "";
};

const buildUniqueLocationOptions = (values = []) =>
  Array.from(
    new Map(
      values
        .map((value) => normalizeLocationValue(value))
        .filter(Boolean)
        .map((value) => [value.toLowerCase(), value]),
    ).values(),
  )
    .sort((left, right) => left.localeCompare(right))
    .map((value) => ({
      label: value,
      value,
    }));

export const getConstituencyCountyValue = (item, isAlaska = false) =>
  getFirstLocationValue(item, isAlaska ? BOROUGH_KEYS : COUNTY_KEYS);

export const getConstituencyCityValue = (item) =>
  getFirstLocationValue(item, CITY_KEYS);

export const getCountyOptionsForState = ({
  state,
  constituencies = [],
} = {}) => {
  if (!state?.isoCode) return [];

  const dynamicOptions = buildUniqueLocationOptions(
    constituencies.map((item) =>
      getConstituencyCountyValue(item, state?.isoCode === "AK"),
    ),
  );

  if (dynamicOptions.length) {
    return dynamicOptions;
  }

  if (state.isoCode === "SC") {
    return countyList.map((item) => ({
      label: item.countyName,
      value: item.countyName,
    }));
  }

  return [];
};

export const getBoroughOptionsForState = ({
  state,
  constituencies = [],
} = {}) => {
  if (state?.isoCode !== "AK") return [];

  const dynamicOptions = buildUniqueLocationOptions(
    constituencies.map((item) => getConstituencyCountyValue(item, true)),
  );

  if (dynamicOptions.length) {
    return dynamicOptions;
  }

  return alaskaBoroughList.map((item) => ({
    label: item.boroughName,
    value: item.boroughName,
  }));
};

export const getCityOptionsForConstituencies = (constituencies = []) =>
  buildUniqueLocationOptions(
    constituencies.map((item) => getConstituencyCityValue(item)),
  );

export const filterConstituenciesByLocation = (
  constituencies = [],
  { county = "", city = "", isAlaska = false } = {},
) => {
  const normalizedCounty = normalizeLocationValue(county).toLowerCase();
  const normalizedCity = normalizeLocationValue(city).toLowerCase();

  return constituencies.filter((item) => {
    const itemCounty = getConstituencyCountyValue(item, isAlaska).toLowerCase();
    const itemCity = getConstituencyCityValue(item).toLowerCase();

    const matchesCounty =
      !normalizedCounty || !itemCounty || itemCounty === normalizedCounty;
    const matchesCity = !normalizedCity || !itemCity || itemCity === normalizedCity;

    return matchesCounty && matchesCity;
  });
};

const buildDistrictOption = (item, index, prefix = "District") => {
  if (typeof item === "string" || typeof item === "number") {
    return {
      label: String(item),
      value: String(item),
    };
  }

  const label =
    item?.label ||
    item?.name ||
    item?.title ||
    item?.districtName ||
    item?.seatName ||
    item?.constituencyName ||
    (item?.districtNumber !== undefined
      ? `${prefix} ${item.districtNumber}`
      : `${prefix} ${index + 1}`);

  const value =
    item?._id ||
    item?.id ||
    item?.value ||
    item?.districtNumber ||
    item?.number ||
    label;

  return {
    label: String(label),
    value: String(value),
  };
};

export const getDistrictOptionsFromDetails = (details) => {
  if (!details) return [];

  const arrays = [];

  if (Array.isArray(details)) {
    arrays.push(...details);
  }

  if (Array.isArray(details?.districts)) {
    arrays.push(...details.districts);
  }

  if (Array.isArray(details?.districtList)) {
    arrays.push(...details.districtList);
  }

  if (Array.isArray(details?.seats)) {
    arrays.push(...details.seats);
  }

  if (Array.isArray(details?.atLargeSeats)) {
    arrays.push(
      ...details.atLargeSeats.map((item) =>
        typeof item === "object" && item !== null
          ? { ...item, name: item.name || item.label || "At Large" }
          : item,
      ),
    );
  }

  if (!arrays.length && details && typeof details === "object") {
    const firstArray = Object.values(details).find((value) => Array.isArray(value));
    if (Array.isArray(firstArray)) {
      arrays.push(...firstArray);
    }
  }

  return arrays.map((item, index) => buildDistrictOption(item, index));
};

const buildAutoAssignedConstituencies = ({ state }) => {
  const assignments = [{ label: "U.S. President", type: "AUTO" }];

  if (state?.name) {
    assignments.push({
      label: `${state.name} - U.S. Senate Seat 1`,
      type: "AUTO",
    });
    assignments.push({
      label: `${state.name} - U.S. Senate Seat 2`,
      type: "AUTO",
    });
  }

  return assignments;
};

export const buildSignupConstituencyMeta = ({ data }) => ({
  state: data.state?.name || "",
  stateCode: data.state?.isoCode || "",
  county: data.county || data.borough || "",
  city: data.city || "",
  constituencyId: data.seat || "",
  constituencyLabel: data.selectedSeatLabel || "",
  districtId: data.district || "",
  districtLabel: data.selectedDistrictLabel || "",
  autoAssignedConstituencies: buildAutoAssignedConstituencies({
    state: data.state,
  }),
});

export const buildSignupRegistrationPayload = ({ data, activeTab }) => {
  const meta_data = [
    {
      key: "government_id_front",
      value: data.governmentIdImages?.[0] || "",
    },
    {
      key: "government_id_back",
      value: data.governmentIdImages?.[1] || "",
    },
    {
      key: "face_id",
      value: data.faceScanImage || "",
    },
  ];

  if (activeTab === "voterparticipant") {
    meta_data.push({
      key: "voter_registeration_number",
      value: data.voter_registeration_number,
    });
  } else {
    meta_data.push({
      key: "state_or_driving_license_number",
      value: data.state_or_driving_license_number,
    });
  }

  meta_data.push({
    key: "signup_constituency_flow",
    value: JSON.stringify(buildSignupConstituencyMeta({ data })),
  });

  return {
    constituency: data.seat || "",
    role: activeTab === "voterparticipant" ? "VOTER" : "USER",
    name: data.name,
    password: data.password || "",
    dateOfBirth: formatDateForApi(data.dob),
    mobileNumber: data.phone,
    email: data.email,
    state: data.state?.name || "",
    county: data.county || data.borough || "",
    city: data.city || "",
    userLocation: {
      type: "Point",
      coordinates: [76.72425, 30.71289],
    },
    meta_data,
  };
};
