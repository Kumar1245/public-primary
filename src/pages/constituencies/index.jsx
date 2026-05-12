import React, { useCallback, useEffect, useMemo, useState } from "react";
import Homelayout from "../../Layout/Homelayout";
import Buttontheme from "../../Component/ui/Buttontheme";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { State } from "country-state-city";
import { Elements } from "@stripe/react-stripe-js";
import Votebanner from "../../Assets/images/votebanner.png";
import { Donationicon, Modalclose } from "../../Assets/svg/Allsvgicons";
import ConsitsCard from "../../Component/CommonCard/ConsitsCard";
import ConsitsCardskelton from "../../Component/Skelton/ConsitsCardskelton";
import { useQuery } from "@tanstack/react-query";
import { CONSTITUENCY_LIST } from "../../services/ApiCalls";
import { checkResponse } from "../../Utilities/commonFunc";
import { useAuth } from "../../context/AuthContext";
import Nodata from "../../Component/ui/Nodata";
import Link from "next/link";
import AddConsitutencyMod from "../../Component/Modals/AddConsitutencyMod";
import {
  DonationCheckoutModal,
  donationStripePromise,
} from "../../Component/CommonCard/DonationCard";
import { getCountyOptionsByState } from "../../Utilities/const";

const ITEMS_PER_PAGE = 20;
const FETCH_LIMIT = 20;

const LEGISLATURE_OPTIONS = [
  { name: "All Legislature", value: "" },
  { name: "US Senator", value: "US_SENATOR" },
  { name: "US Representative", value: "US_REPRESENTATIVE" },
  { name: "State Senator", value: "STATE_SENATOR" },
  { name: "State Representative", value: "STATE_REPRESENTATIVE" },
];

const ALASKA_EXECUTIVE_OPTIONS = [
  { name: "All Executive", value: "" },
  { name: "Governor", value: "GOVERNOR" },
  { name: "Lt. Governor", value: "LT_GOVERNOR" },
  { name: "Borough Mayor", value: "BOROUGH_MAYOR" },
  { name: "City Mayor", value: "CITY_MAYOR" },
];

const EXECUTIVE_OPTIONS = [
  { name: "All Executive", value: "" },
  { name: "Governor", value: "GOVERNOR" },
  { name: "Lt. Governor", value: "LT_GOVERNOR" },
  { name: "Attorney General", value: "ATTORNEY_GENERAL" },
  { name: "Auditor", value: "AUDITOR" },
];

const CATEGORY_OPTIONS = [
  { name: "Select Category", value: "" },
  { name: "County", value: "county" },
  { name: "Legislature", value: "legislative" },
  { name: "Executive", value: "executive" },
];

const PUBLIC_TYPE_OPTIONS = [
  { name: "Select Type", value: "" },
  { name: "State", value: "state" },
  { name: "President", value: "president" },
];

const SUBTYPE_LABELS = [
  ...LEGISLATURE_OPTIONS,
  ...ALASKA_EXECUTIVE_OPTIONS,
  ...EXECUTIVE_OPTIONS,
].reduce((accumulator, option) => {
  if (option.value) {
    accumulator[option.value] = option.name;
  }
  return accumulator;
}, {});

const normalizeValue = (value) => {
  if (!value) return "";
  return value.toString().toLowerCase().trim();
};

const getFirstPositiveInteger = (...values) => {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return value;
    }

    if (typeof value === "string") {
      const match = value.match(/\d+/);
      if (match) {
        const parsed = Number(match[0]);
        if (Number.isFinite(parsed) && parsed > 0) {
          return parsed;
        }
      }
    }
  }

  return null;
};

const getUserDistrictSelections = (user) => {
  if (user?.districtSelections) {
    return user.districtSelections;
  }

  const officeSelectionValue = user?.meta_data?.find(
    (item) => item.key === "office_selection",
  )?.value;

  if (!officeSelectionValue || typeof officeSelectionValue !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(officeSelectionValue);
    return parsed?.districtSelections || null;
  } catch (error) {
    return null;
  }
};

const getConstituencyDistrictNumber = (item = {}) =>
  getFirstPositiveInteger(
    item?.districtNumber,
    item?.totalDistrict,
    item?.districtName,
    item?.name,
  );

const filterConstituenciesForUserDistricts = ({
  constituencies = [],
  districtSelections,
}) => {
  if (!Array.isArray(constituencies) || !districtSelections) {
    return constituencies;
  }

  const seen = new Set();

  return constituencies.filter((item) => {
    const type = item?.type;
    const districtNumber = getConstituencyDistrictNumber(item);

    if (type === "US_REPRESENTATIVE") {
      const requiredDistrict = getFirstPositiveInteger(
        districtSelections?.usRepresentativeDistrict,
      );
      if (!requiredDistrict || districtNumber !== requiredDistrict) {
        return false;
      }

      const key = `${type}-${requiredDistrict}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }

    if (type === "STATE_SENATOR") {
      const requiredDistrict = getFirstPositiveInteger(
        districtSelections?.stateSenatorDistrict,
      );
      if (!requiredDistrict || districtNumber !== requiredDistrict) {
        return false;
      }

      const key = `${type}-${requiredDistrict}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }

    if (type === "STATE_REPRESENTATIVE") {
      const requiredDistricts = Array.isArray(
        districtSelections?.stateRepresentativeDistricts,
      )
        ? districtSelections.stateRepresentativeDistricts
            .map((value) => getFirstPositiveInteger(value))
            .filter(Boolean)
        : [];

      if (!requiredDistricts.length || !requiredDistricts.includes(districtNumber)) {
        return false;
      }

      const key = `${type}-${districtNumber}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }

    return true;
  });
};

const getExecutiveOptions = (stateCode) => {
  switch (stateCode) {
    case "AK":
      return ALASKA_EXECUTIVE_OPTIONS;
    default:
      return EXECUTIVE_OPTIONS;
  }
};

const buildConstituencyPayload = (body = {}) => {
  const payload = {
    constituency: body.constituency ?? "",
    country: body.country ?? "",
    page: body.page,
    limit: body.limit,
    search: body.search ?? "",
    status: body.status ?? "",
    orderBy: body.orderBy ?? "date_created_utc",
    orderStatus: body.orderStatus ?? "",
    sortOrder: body.sortOrder ?? -1,
  };

  if (body.state) payload.state = body.state;
  if (body.constituencyBranchType) {
    payload.constituencyBranchType = body.constituencyBranchType;
  }
  if (body.county) payload.county = body.county;
  if (body.type) payload.type = body.type;
  if (body.level) payload.level = body.level;

  return payload;
};

const SteppedConstituencyFilter = ({
  showPublicTypeStep,
  viewTypeValue,
  countryLabel,
  stateOptions,
  countyOptions,
  executiveOptions,
  hasLockedState,
  lockedStateLabel,
  stateValue,
  categoryValue,
  countyValue,
  subTypeValue,
  onStateChange,
  onViewTypeChange,
  onCategoryChange,
  onCountyChange,
  onSubTypeChange,
  onSearch,
  onClear,
  loading,
}) => {
  const isPresidentView = showPublicTypeStep && viewTypeValue === "president";
  const requiresStateSelection =
    !showPublicTypeStep || viewTypeValue === "state";
  const hasSelectedViewType = !showPublicTypeStep || Boolean(viewTypeValue);
  const hasState =
    hasSelectedViewType && (isPresidentView || Boolean(stateValue));
  const showsCategoryField = requiresStateSelection && hasState;
  const hasCategory = showsCategoryField && Boolean(categoryValue);
  const isCounty = hasCategory && categoryValue === "county";
  const isLegislative = hasCategory && categoryValue === "legislative";
  const isExecutive = hasCategory && categoryValue === "executive";
  const showsDetailField = isCounty || isLegislative || isExecutive;
  const gridClassName =
    showsDetailField
      ? "constituencyFilterGrid constituencyFilterGridSteppedDetail"
      : hasCategory
        ? "constituencyFilterGrid constituencyFilterGridSteppedCategory"
        : hasState
          ? "constituencyFilterGrid constituencyFilterGridSteppedState"
          : hasSelectedViewType
            ? "constituencyFilterGrid constituencyFilterGridWithoutType"
            : "constituencyFilterGrid constituencyFilterGridOnlyType";

  return (
    <div className={gridClassName}>
      {showPublicTypeStep ? (
        <div className="constituencyBarItem">
          <select
            className="constituencyBarNativeSelect"
            value={viewTypeValue}
            onChange={(event) => onViewTypeChange(event.target.value)}
          >
            {PUBLIC_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {hasSelectedViewType && requiresStateSelection && (
        <div className="constituencyBarItem">
          {hasLockedState ? (
            <div className="constituencyBarValue">{lockedStateLabel}</div>
          ) : (
            <select
              className="constituencyBarNativeSelect"
              value={stateValue}
              onChange={(event) => onStateChange(event.target.value)}
            >
              <option value="">Select State</option>
              {stateOptions.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {showsCategoryField && (
        <div className="constituencyBarItem constituencyBarItemReveal w-100">
          <select
            className="constituencyBarNativeSelect"
            value={categoryValue}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {isCounty && (
        <div className="constituencyBarItem constituencyBarItemReveal w-100">
          <select
            className="constituencyBarNativeSelect"
            value={countyValue}
            onChange={(event) => onCountyChange(event.target.value)}
          >
            <option value="">All Counties</option>
            {countyOptions.map((county) => (
              <option key={county.value} value={county.value}>
                {county.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {isLegislative && (
        <div className="constituencyBarItem constituencyBarItemReveal w-100">
          <select
            className="constituencyBarNativeSelect"
            value={subTypeValue}
            onChange={(event) => onSubTypeChange(event.target.value)}
          >
            {LEGISLATURE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {isExecutive && (
        <div className="constituencyBarItem constituencyBarItemReveal w-100">
          <select
            className="constituencyBarNativeSelect"
            value={subTypeValue}
            onChange={(event) => onSubTypeChange(event.target.value)}
          >
            {executiveOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="constituencyBarAction constituencyBarActionGroup">
        <Buttontheme
          className="constituencyFilterButton w-100"
          onClick={onSearch}
          disabled={!hasState || loading}
        >
          {!loading ? "Search" : "Searching..."}
        </Buttontheme>
        <button
          type="button"
          className="constituencyFilterButton w-100 constituencyFilterClearButton"
          onClick={onClear}
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const Constituencies = () => {
  const { user, isAuthenticated } = useAuth();
  const [addConstituencyModal, setAddConstituencyModal] = useState(false);
  const [showBannerFilters, setShowBannerFilters] = useState(false);
  const [donationAmountModal, setDonationAmountModal] = useState(false);
  const [donationCheckoutModal, setDonationCheckoutModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationAmountError, setDonationAmountError] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donor, setDonor] = useState({
    name: "",
    email: "",
  });
  const [useUserStateFilter, setUseUserStateFilter] = useState(true);
  const [selectedViewType, setSelectedViewType] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [body, setBody] = useState({
    constituency: "",
    country: "",
    page: 1,
    limit: FETCH_LIMIT,
    search: "",
    status: "",
    orderBy: "date_created_utc",
    orderStatus: "",
    sortOrder: -1,
    state: "",
    constituencyBranchType: "",
    county: "",
    type: "",
    level: "",
  });
  const [totalCount, setTotalCount] = useState(0);

  const countryLabel = "United States President";
  const states = useMemo(() => State.getStatesOfCountry("US"), []);

  const stateoptions = useMemo(
    () =>
      states.map((state) => ({
        name: state.name,
        value: state.isoCode,
      })),
    [states],
  );

  const getStateCode = useCallback((value) => {
    if (!value) return "";
    const normalized = normalizeValue(value);
    const matchedState = states.find(
      (state) =>
        normalizeValue(state.name) === normalized ||
        normalizeValue(state.isoCode) === normalized,
    );
    return matchedState?.isoCode || "";
  }, [states]);

  const getStateName = useCallback((value) => {
    if (!value) return "All States";
    const normalized = normalizeValue(value);
    const matchedState = states.find(
      (state) =>
        normalizeValue(state.isoCode) === normalized ||
        normalizeValue(state.name) === normalized,
    );
    return matchedState?.name || value;
  }, [states]);

  useEffect(() => {
    if (user?.state) {
      const userStateCode = getStateCode(user.state);
      setUseUserStateFilter(true);
      setSelectedViewType("state");
      setSelectedStateCode(userStateCode);
      setSelectedCategory("");
      setSelectedCounty("");
      setSelectedSubType("");
      setBody((prev) => ({
        ...prev,
        page: 1,
        constituency: "",
        country: "",
        search: "",
        status: "",
        orderBy: "date_created_utc",
        orderStatus: "",
        sortOrder: -1,
        state: userStateCode,
        constituencyBranchType: "",
        county: "",
        type: "",
        level: "",
      }));
    } else {
      setUseUserStateFilter(false);
      setSelectedViewType("");
      setSelectedStateCode("");
      setSelectedCategory("");
      setSelectedCounty("");
      setSelectedSubType("");
    }
  }, [getStateCode, user]);

  const {
    data: constituencies,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      "constituency-list",
      body.constituency,
      body.country,
      body.search,
      body.status,
      body.orderBy,
      body.orderStatus,
      body.sortOrder,
      body.state,
      body.constituencyBranchType,
      body.county,
      body.type,
      body.level,
      body.page,
      body.limit,
    ],
    queryFn: async () => {
      const res = await CONSTITUENCY_LIST(buildConstituencyPayload(body));
      const success = checkResponse({ res });

      if (success) {
        const payload = res?.data?.data;
        const resolvedTotalCount =
          res?.data?.totalcount ??
          res?.data?.total_count ??
          payload?.totalcount ??
          payload?.total_count ??
          payload?.totalRecord ??
          payload?.totalRecords ??
          payload?.count ??
          (Array.isArray(payload) ? payload.length : 0);

        setTotalCount(Number(resolvedTotalCount) || 0);

        return Array.isArray(payload)
          ? payload
          : payload?.data ||
              payload?.docs ||
              payload?.records ||
              payload?.items ||
              [];
      }

      setTotalCount(0);
      return [];
    },
    keepPreviousData: true,
  });

  const activeDraftStateCode = useUserStateFilter
    ? getStateCode(user?.state)
    : selectedStateCode;
  const countyOptions = useMemo(
    () => getCountyOptionsByState(activeDraftStateCode),
    [activeDraftStateCode],
  );
  const executiveOptions = useMemo(
    () => getExecutiveOptions(activeDraftStateCode),
    [activeDraftStateCode],
  );

  useEffect(() => {
    setSelectedCategory("");
    setSelectedCounty("");
    setSelectedSubType("");
  }, [activeDraftStateCode]);

  const handleCategoryChange = useCallback((value) => {
    setSelectedCategory(value);
    setSelectedCounty("");
    setSelectedSubType("");
  }, []);

  const handleViewTypeChange = useCallback((value) => {
    setSelectedViewType(value);
    setSelectedStateCode("");
    setSelectedCategory("");
    setSelectedCounty("");
    setSelectedSubType("");

    if (value === "president") {
      setBody((prev) => ({
        ...prev,
        page: 1,
        constituency: "",
        country: "",
        search: "",
        status: "",
        orderBy: "date_created_utc",
        orderStatus: "",
        sortOrder: -1,
        state: "",
        constituencyBranchType: "",
        county: "",
        type: "US_PRESIDENT",
        level: "National",
      }));
    }
  }, []);

  const handleSearch = useCallback(() => {
    const nextFilters = {};

    if (selectedViewType === "president") {
      nextFilters.type = "US_PRESIDENT";
      nextFilters.level = "National";
    }
    if (activeDraftStateCode) {
      nextFilters.state = activeDraftStateCode;
    }
    if (selectedCategory) {
      nextFilters.constituencyBranchType = selectedCategory;
    }
    if (selectedCategory === "county" && selectedCounty) {
      nextFilters.county = selectedCounty;
    }
    if (selectedCategory !== "county" && selectedSubType) {
      nextFilters.type = selectedSubType;
    }

    setBody((prev) => ({
      ...prev,
      page: 1,
      constituency: "",
      country: "",
      search: "",
      status: "",
      orderBy: "date_created_utc",
      orderStatus: "",
      sortOrder: -1,
      state: "",
      constituencyBranchType: "",
      county: "",
      type: "",
      level: "",
      ...nextFilters,
    }));
  }, [
    activeDraftStateCode,
    selectedCategory,
    selectedCounty,
    selectedSubType,
    selectedViewType,
  ]);

  const handleClearFilters = useCallback(() => {
    const resetState = useUserStateFilter ? getStateCode(user?.state) : "";
    const resetViewType = isAuthenticated ? "state" : "";

    setSelectedViewType(resetViewType);
    setSelectedStateCode(resetState);
    setSelectedCategory("");
    setSelectedCounty("");
    setSelectedSubType("");
    setBody((prev) => ({
      ...prev,
      page: 1,
      constituency: "",
      country: "",
      search: "",
      status: "",
      orderBy: "date_created_utc",
      orderStatus: "",
      sortOrder: -1,
      state: resetState,
      constituencyBranchType: "",
      county: "",
      type: "",
      level: "",
    }));
  }, [getStateCode, isAuthenticated, useUserStateFilter, user?.state]);

  const filteredConstituencies = constituencies || [];
  const totalPages = Math.ceil(totalCount / body.limit);
  const paginatedConstituencies = filteredConstituencies;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, body.page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };    

  const activeStateCode = useUserStateFilter
    ? getStateCode(user?.state)
    : body.state;
  const userDistrictSelections = useMemo(
    () => getUserDistrictSelections(user),
    [user],
  );
  const stateLabel = getStateName(body.state || activeStateCode || "");
  const categoryLabel =
    CATEGORY_OPTIONS.find((item) => item.value === body.constituencyBranchType)
      ?.name || "All Categories";
  const viewLabel = SUBTYPE_LABELS[body.type] || body.type || "All Types";
  const countyLabel = body.county || "All Counties";
  const hasUserState = isAuthenticated && Boolean(user?.state);
  const showDraftFilterClear =
    Boolean(activeDraftStateCode) ||
    Boolean(selectedCategory) ||
    Boolean(selectedCounty) ||
    Boolean(selectedSubType);

  const visibleConstituencies = useMemo(() => {
    const shouldFilterLegislativeSeats =
      isAuthenticated &&
      Boolean(userDistrictSelections) &&
      activeStateCode &&
      (!body.constituencyBranchType ||
        body.constituencyBranchType === "legislative");

    if (!shouldFilterLegislativeSeats) {
      return paginatedConstituencies;
    }

    return filterConstituenciesForUserDistricts({
      constituencies: paginatedConstituencies,
      districtSelections: userDistrictSelections,
    });
  }, [
    activeStateCode,
    body.constituencyBranchType,
    isAuthenticated,
    paginatedConstituencies,
    userDistrictSelections,
  ]);

  const visibleTotalCount = visibleConstituencies.length;

  const openDonationAmountModal = () => {
    setDonationAmountModal(true);
    setDonationSuccess(false);
    setDonationAmountError("");
  };

  const handleContinueDonation = () => {
    const value = Number(donationAmount);

    if (!donationAmount || Number.isNaN(value) || value < 5 || value > 20) {
      setDonationAmountError("Please enter a valid amount between $5 and $20.");
      return;
    }

    setDonationAmountError("");
    setDonationAmountModal(false);
    setDonationCheckoutModal(true);
  };

  const handleDonationSuccess = () => {
    setDonationCheckoutModal(false);
    setDonationSuccess(true);
    setDonationAmount("");
    setDonor({
      name: "",
      email: "",
    }); 
  };

  const handleVisitAnyConstituency = () => {
    setShowBannerFilters(true);
    setUseUserStateFilter(false);
    setSelectedViewType("state");
    setSelectedStateCode("");
    setSelectedCategory("");
    setSelectedCounty("");
    setSelectedSubType("");
    setBody((prev) => ({
      ...prev,
      page: 1,
      constituency: "",
      country: "",
      search: "",
      status: "",
      orderBy: "date_created_utc",
      orderStatus: "",
      sortOrder: -1,
      state: "",
      constituencyBranchType: "",
      county: "",
      type: "",
      level: "",
    }));
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
        <Elements stripe={donationStripePromise}>
          <DonationCheckoutModal
            show={donationCheckoutModal}
            amount={donationAmount}
            donor={donor}
            onClose={() => setDonationCheckoutModal(false)}
            onSuccess={handleDonationSuccess}
            onDonorChange={(field, value) =>
              setDonor((previous) => ({ ...previous, [field]: value }))
            }
          />
        </Elements>
      ) : null}

      <Modal
        centered
        show={donationAmountModal}
        onHide={() => setDonationAmountModal(false)}
        contentClassName="rounded-5 overflow-hidden"
      >
        <Modal.Body className="p-0">
          <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
            <div>
              <h5 className="fw-semibold mb-1">Make a Contribution</h5>
              {/* <p className="text-muted mb-0">
                Enter a donation amount to continue.
              </p> */}
              <p className="text-muted mb-0">Democracy is a privilege. Help us keep the lights on.</p>
            </div>
            <Button
              className="flexedclose"
              onClick={() => setDonationAmountModal(false)}
            >
              <Modalclose />
            </Button>
          </div>

          <div className="p-4">
            <label className="mb-2 fw-semibold">Donation Amount</label>
            <input
              type="number"
              min="5"
              max="20"
              step="1"
              placeholder="Enter monthly donation amount $5 - $20"
              value={donationAmount}
              onChange={(event) => {
                setDonationAmount(event.target.value);
                setDonationAmountError("");
              }}
              onKeyDown={(event) => {
                if (
                  event.key === "." ||
                  event.key === "e" ||
                  event.key === "E" ||
                  event.key === "-"
                ) {
                  event.preventDefault();
                }
              }}
              className="constituencyDonationInput"
            />

            {donationAmountError ? (
              <p className="text-danger mt-2 mb-0" style={{ fontSize: "13px" }}>
                {donationAmountError}
              </p>
            ) : null}

            {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
              <p className="text-danger mt-2 mb-0" style={{ fontSize: "13px" }}>
                Stripe key missing. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in
                `.env`.
              </p>
            ) : null}

            <div className="d-flex gap-2 mt-4">
              <Buttontheme
                type="button"
                className="w-100"
                onClick={handleContinueDonation}
                disabled={!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
              >
                Continue
              </Buttontheme>

              <Buttontheme
                type="button"
                className="cancelWhiteBtn w-100"
                onClick={() => setDonationAmountModal(false)}
              >
                Cancel
              </Buttontheme>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <AddConsitutencyMod
        show={addConstituencyModal}
        onhide={() => setAddConstituencyModal(false)}
        refetch={refetch}
      />

      <section className="constituenciesPage">
        <div
          className="constitBanner position-relative"
          style={{
            backgroundImage: `url(${Votebanner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "420px",
            width: "100%",
          }}
        >
          <div className="constitBanner_fillter text-center">
            <h2>Constituencies</h2>

            {!isAuthenticated || showBannerFilters ? (
              <div className="constituencyFilterShell my-3">
                <SteppedConstituencyFilter
                  showPublicTypeStep={!isAuthenticated}
                  viewTypeValue={selectedViewType}
                  stateOptions={stateoptions}
                  countyOptions={countyOptions}
                  executiveOptions={executiveOptions}
                  hasLockedState={hasUserState && useUserStateFilter}
                  lockedStateLabel={getStateName(user?.state)}
                  stateValue={activeDraftStateCode}
                  categoryValue={selectedCategory}
                  countyValue={selectedCounty}
                  subTypeValue={selectedSubType}
                  onViewTypeChange={handleViewTypeChange}
                  onStateChange={setSelectedStateCode}
                  onCategoryChange={handleCategoryChange}
                  onCountyChange={setSelectedCounty}
                  onSubTypeChange={setSelectedSubType}
                  onSearch={handleSearch}
                  onClear={handleClearFilters}
                  loading={isFetching}
                />
              </div>
            ) : null}
          </div>
        </div>

        <Container className="px-lg-5 px-0">
          <div className="constitBottmdata">
            {isAuthenticated && (
              <div className="constituencyTopActions">
                <Buttontheme
                  className="constituencyDonateTrigger constituencyTopActionStart"
                  type="button"
                  onClick={openDonationAmountModal}
                >
                  Donate <Donationicon />
                </Buttontheme>

                <div
                  className="constituencyTopActionCenter constituencyTopActionSpacer"
                >
                  <Buttontheme
                    className="constituencyVisitAction"
                    type="button"
                    onClick={handleVisitAnyConstituency}
                  >
                    Visit Any Constituency
                  </Buttontheme>
                </div>

                <Link
                  href="#"
                  className="editprofile_btn constituencyAddAction constituencyTopActionEnd"
                  onClick={() => setAddConstituencyModal(true)}
                >
                  Add Constituency
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="constituencyDonateBar">
                {donationSuccess ? (
                  <p className="constituencyDonateSuccess mb-0">
                    Donation sent successfully. Thank you for your support.
                  </p>
                ) : null}
              </div>
            )}

            <div className="topfilterHeader constituencySummaryBar d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="topfilterHeader_text constituencySummaryInfo d-flex align-items-center gap-3 flex-wrap">
                <p>
                  Country:
                  <span className="theme_text fw-semibold ms-2">
                    {countryLabel}
                  </span>
                </p>
                <p>
                  State:
                  <span className="theme_text fw-semibold ms-2">
                    {stateLabel}
                  </span>
                </p>
                {body.constituencyBranchType ? (
                  <p>
                    Category:
                    <span className="theme_text fw-semibold text-capitalize ms-2">
                      {categoryLabel}
                    </span>
                  </p>
                ) : null}
                {body.constituencyBranchType === "county" ? (
                  <p>
                    County:
                    <span className="theme_text fw-semibold text-capitalize ms-2">
                      {countyLabel}
                    </span>
                  </p>
                ) : null}
                {body.constituencyBranchType &&
                body.constituencyBranchType !== "county" &&
                body.type ? (
                  <p>
                    Type:
                    <span className="theme_text fw-semibold text-capitalize ms-2">
                      {viewLabel}
                    </span>
                  </p>
                ) : null}
              </div>

              <div className="topfilterHeader_text constituencySummaryCount">
                <p>
                  Total Results:
                  <span className="theme_text fw-semibold ms-2">
                    {visibleTotalCount || 0}
                  </span>
                </p>
              </div>
            </div>

            <hr className="my-4" />

            <div className="Consistlist_Show">
              <Row>
                {isLoading || isFetching
                  ? [...Array(ITEMS_PER_PAGE)].map((_, idx) => (
                      <Col lg={3} md={6} sm={12} key={idx}>
                        <ConsitsCardskelton />
                      </Col>
                    ))
                  : visibleConstituencies?.map((item, idx) => (
                      <Col lg={3} md={6} sm={12} key={idx}>
                        <ConsitsCard data={item} />
                      </Col>
                    ))}
                {!isFetching && visibleConstituencies?.length === 0 && (
                  <Nodata />
                )}
              </Row>
            </div>

            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "3rem",
                }}
              >
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() =>
                      body.page > 1 &&
                      setBody((prev) => ({ ...prev, page: prev.page - 1 }))
                    }
                    disabled={body.page === 1}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                      backgroundColor: body.page === 1 ? "#e9ecef" : "white",
                      color: body.page === 1 ? "#6c757d" : "#1e3a8a",
                      cursor: body.page === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    ‹
                  </button>

                  {getPageNumbers().map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        page !== "..." && setBody((prev) => ({ ...prev, page }))
                      }
                      disabled={page === "..."}
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #dee2e6",
                        borderRadius: "4px",
                        backgroundColor:
                          body.page === page ? "#1e3a8a" : "white",
                        color: body.page === page ? "white" : "#1e3a8a",
                        fontWeight: body.page === page ? "bold" : "normal",
                        cursor: page === "..." ? "default" : "pointer",
                      }}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      body.page < totalPages &&
                      setBody((prev) => ({ ...prev, page: prev.page + 1 }))
                    }
                    disabled={body.page === totalPages}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                      backgroundColor:
                        body.page === totalPages ? "#e9ecef" : "white",
                      color: body.page === totalPages ? "#6c757d" : "#1e3a8a",
                      cursor:
                        body.page === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <style jsx global>{`
        .constituenciesPage .constituencyFilterShell {
          max-width: 1220px;
          padding: 14px 18px;
        }
        .constituencyVisitAction {
          min-width: 220px;
        }
        .constituencyFilterGridSteppedState {

        }
        .constituencyFilterGridSteppedCategory {
        
        }
        .constituencyFilterGridSteppedDetail {
       
        }
        .constituencyBarNativeSelect {
          width: 100%;
          min-height: 52px;
          padding: 0 42px 0 16px;
          border: 1px solid #ececec;
          border-radius: 999px;
          background: #ffffff;
          color: #1f2937;
          font-size: 16px;
          outline: none;
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M2 1.5 7 6.5l5-5' stroke='%236b7280' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          text-overflow: ellipsis;
        }
        .constituencyBarNativeSelect:focus {
          border-color: #d1d5db;
        }
        .constituenciesPage .constituencyBarValue,
        .constituenciesPage .constituencyBarNativeSelect {
          font-size: 15px;
        }
        .constituencyBarItemReveal {
          animation: constituencyFilterReveal 0.18s ease both;
        }
        .constituencyBarActionGroup {
          display: flex;
          gap: 10px;
          align-items: center;
          width: 100%;
        }
        .constituencyBarActionGroup .constituencyFilterButton {
          min-width: 0;
          flex: 1 1 0;
        }
        .constituencyFilterClearButton {
          background: #f8fafc !important;
          color: #64748b !important;
          border: 1px solid #ececec !important;
        }
        .constituencyFilterClearButton:hover:not(:disabled),
        .constituencyFilterClearButton:focus:not(:disabled) {
          background: #eef2ff !important;
          color: #1e3a8a !important;
        }
        .constituencyFilterClearButton:disabled {
          opacity: 0.6;
        }
        @keyframes constituencyFilterReveal {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 991px) {
          .constituencyVisitAction {
            width: 100%;
          }
          .constituencyFilterGridSteppedState,
          .constituencyFilterGridSteppedCategory,
          .constituencyFilterGridSteppedDetail {
        
          }
          .constituencyBarActionGroup {
            flex-direction: column;
          }
          .constituencyBarActionGroup .constituencyFilterButton {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Constituencies;

Constituencies.getLayout = function getLayout(page) {
  return <Homelayout>{page}</Homelayout>;
};
