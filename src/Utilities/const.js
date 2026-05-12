
import citiesData from "cities.json";
export const currency = "AED";

export const AddsModuleType = {
  MOTORS: "MOTORS",
  CLASSIFIEDS: "CLASSIFIEDS",
  JOBS: "JOBS",
  PROPERYRENT: "PROPERYRENT",
  PROPERTYSALE: "PROPERTYSALE",
};

export const AddsModuleTypeArr = [
  AddsModuleType?.MOTORS,
  AddsModuleType?.CLASSIFIEDS,
  AddsModuleType.JOBS,
  AddsModuleType.PROPERYRENT,
  AddsModuleType.PROPERTYSALE,
];

export const addsModuleOptionsArr = [
  { value: AddsModuleType?.MOTORS, label: "Motors" },
  { value: AddsModuleType?.CLASSIFIEDS, label: "Classified" },
  { value: AddsModuleType?.JOBS, label: "Jobs" },
  { value: AddsModuleType?.PROPERYRENT, label: "Property for rent" },
  { value: AddsModuleType?.PROPERTYSALE, label: "Property for sale" },
];

export const AddsSortByFilterOptions = [
  { label: "Relevant", value: "relevant" },
  { label: "Newest", value: "newest" },
  { label: "Price: High to Low", value: "price_high_to_low" },
  { label: "Price: Low to High", value: "price_low_to_high" },
];

export const fallBackLocation = {
  lng: 76.6926715378603,
  lat: 30.700058562593583,
};

export const countrylist = [
  { name: "Afghanistan" },
  { name: "Albania" },
  { name: "Algeria" },
  { name: "Andorra" },
  { name: "Angola" },
  { name: "Antigua and Barbuda" },
  { name: "Argentina" },
  { name: "Armenia" },
  { name: "Australia" },
  { name: "Austria" },
  { name: "Azerbaijan" },
  { name: "Bahamas" },
  { name: "Bahrain" },
  { name: "Bangladesh" },
  { name: "Barbados" },
  { name: "Belarus" },
  { name: "Belgium" },
  { name: "Belize" },
  { name: "Benin" },
  { name: "Bhutan" },
  { name: "Bolivia" },
  { name: "Bosnia and Herzegovina" },
  { name: "Botswana" },
  { name: "Brazil" },
  { name: "Brunei" },
  { name: "Bulgaria" },
  { name: "Burkina Faso" },
  { name: "Burundi" },
  { name: "Cabo Verde" },
  { name: "Cambodia" },
  { name: "Cameroon" },
  { name: "Canada" },
  { name: "Central African Republic" },
  { name: "Chad" },
  { name: "Chile" },
  { name: "China" },
  { name: "Colombia" },
  { name: "Comoros" },
  { name: "Congo, Democratic Republic of the" },
  { name: "Congo, Republic of the" },
  { name: "Costa Rica" },
  { name: "Croatia" },
  { name: "Cuba" },
  { name: "Cyprus" },
  { name: "Czech Republic" },
  { name: "Denmark" },
  { name: "Djibouti" },
  { name: "Dominica" },
  { name: "Dominican Republic" },
  { name: "Ecuador" },
  { name: "Egypt" },
  { name: "El Salvador" },
  { name: "Equatorial Guinea" },
  { name: "Eritrea" },
  { name: "Estonia" },
  { name: "Eswatini" },
  { name: "Ethiopia" },
  { name: "Fiji" },
  { name: "Finland" },
  { name: "France" },
  { name: "Gabon" },
  { name: "Gambia" },
  { name: "Georgia" },
  { name: "Germany" },
  { name: "Ghana" },
  { name: "Greece" },
  { name: "Grenada" },
  { name: "Guatemala" },
  { name: "Guinea" },
  { name: "Guinea-Bissau" },
  { name: "Guyana" },
  { name: "Haiti" },
  { name: "Honduras" },
  { name: "Hungary" },
  { name: "Iceland" },
  { name: "India" },
  { name: "Indonesia" },
  { name: "Iran" },
  { name: "Iraq" },
  { name: "Ireland" },
  { name: "Israel" },
  { name: "Italy" },
  { name: "Jamaica" },
  { name: "Japan" },
  { name: "Jordan" },
  { name: "Kazakhstan" },
  { name: "Kenya" },
  { name: "Kiribati" },
  { name: "Korea, North" },
  { name: "Korea, South" },
  { name: "Kosovo" },
  { name: "Kuwait" },
  { name: "Kyrgyzstan" },
  { name: "Laos" },
  { name: "Latvia" },
  { name: "Lebanon" },
  { name: "Lesotho" },
  { name: "Liberia" },
  { name: "Libya" },
  { name: "Liechtenstein" },
  { name: "Lithuania" },
  { name: "Luxembourg" },
  { name: "Madagascar" },
  { name: "Malawi" },
  { name: "Malaysia" },
  { name: "Maldives" },
  { name: "Mali" },
  { name: "Malta" },
  { name: "Marshall Islands" },
  { name: "Mauritania" },
  { name: "Mauritius" },
  { name: "Mexico" },
  { name: "Micronesia" },
  { name: "Moldova" },
  { name: "Monaco" },
  { name: "Mongolia" },
  { name: "Montenegro" },
  { name: "Morocco" },
  { name: "Mozambique" },
  { name: "Myanmar" },
  { name: "Namibia" },
  { name: "Nauru" },
  { name: "Nepal" },
  { name: "Netherlands" },
  { name: "New Zealand" },
  { name: "Nicaragua" },
  { name: "Niger" },
  { name: "Nigeria" },
  { name: "North Macedonia" },
  { name: "Norway" },
  { name: "Oman" },
  { name: "Pakistan" },
  { name: "Palau" },
  { name: "Palestine" },
  { name: "Panama" },
  { name: "Papua New Guinea" },
  { name: "Paraguay" },
  { name: "Peru" },
  { name: "Philippines" },
  { name: "Poland" },
  { name: "Portugal" },
  { name: "Qatar" },
  { name: "Romania" },
  { name: "Russia" },
  { name: "Rwanda" },
  { name: "Saint Kitts and Nevis" },
  { name: "Saint Lucia" },
  { name: "Saint Vincent and the Grenadines" },
  { name: "Samoa" },
  { name: "San Marino" },
  { name: "Sao Tome and Principe" },
  { name: "Saudi Arabia" },
  { name: "Senegal" },
  { name: "Serbia" },
  { name: "Seychelles" },
  { name: "Sierra Leone" },
  { name: "Singapore" },
  { name: "Slovakia" },
  { name: "Slovenia" },
  { name: "Solomon Islands" },
  { name: "Somalia" },
  { name: "South Africa" },
  { name: "South Sudan" },
  { name: "Spain" },
  { name: "Sri Lanka" },
  { name: "Sudan" },
  { name: "Suriname" },
  { name: "Sweden" },
  { name: "Switzerland" },
  { name: "Syria" },
  { name: "Taiwan" },
  { name: "Tajikistan" },
  { name: "Tanzania" },
  { name: "Thailand" },
  { name: "Timor-Leste" },
  { name: "Togo" },
  { name: "Tonga" },
  { name: "Trinidad and Tobago" },
  { name: "Tunisia" },
  { name: "Turkey" },
  { name: "Turkmenistan" },
  { name: "Tuvalu" },
  { name: "Uganda" },
  { name: "Ukraine" },
  { name: "United Arab Emirates" },
  { name: "United Kingdom" },
  { name: "United States" },
  { name: "Uruguay" },
  { name: "Uzbekistan" },
  { name: "Vanuatu" },
  { name: "Vatican City" },
  { name: "Venezuela" },
  { name: "Vietnam" },
  { name: "Yemen" },
  { name: "Zambia" },
  { name: "Zimbabwe" },
];
export const visastatuslist = [
  { name: "Visit Visa" },
  { name: "Work Visa" },
  { name: "Student Visa" },
  { name: "Dependent Visa" },
  { name: "Freelance Visa" },
  { name: "Sponsorship Visa" },
  { name: "No Visa" },
  { name: "Other" },
];

export const careerLevelList = [
  { name: "Entry" },
  { name: "Mid" },
  { name: "Senior" },
];


export const eventTypeOptions = [
  { label: "Meet & Greet", value: "MEET_AND_GREET" },
  { label: "Rally", value: "RALLY" },
  { label: "Town Hall", value: "TOWN_HALL" },
  { label: "Campaign Event", value: "CAMPAIGN_EVENT" },
  { label: "Volunteer Event", value: "VOLUNTEER_EVENT" },
  { label: "Other", value: "OTHER" },
]

export const typeFilterOptionArr = [
  {
    label: "Government",
    value: "Government",
  },
  {
    label: "Non-Government",
    value: "Non-Government",
  },
];

export const constituencyLabelOptionArr = [
  {
    label: "National",
    value: "National",
  },
  {
    label: "Federal",
    value: "Federal",
  },
  {
    label: "State",
    value: "State",
  },
  {
    label: "Local",
    value: "Local",
  },
];



export const countyList = [
  { "countyName": "Abbeville", "isoCode": "AB" },
  { "countyName": "Aiken", "isoCode": "AK" },
  { "countyName": "Allendale", "isoCode": "AL" },
  { "countyName": "Anderson", "isoCode": "AN" },
  { "countyName": "Bamberg", "isoCode": "BA" },
  { "countyName": "Barnwell", "isoCode": "BR" },
  { "countyName": "Beaufort", "isoCode": "BU" },
  { "countyName": "Berkeley", "isoCode": "BK" },
  { "countyName": "Calhoun", "isoCode": "CL" },
  { "countyName": "Charleston", "isoCode": "CH" },
  { "countyName": "Cherokee", "isoCode": "CK" },
  { "countyName": "Chester", "isoCode": "CS" },
  { "countyName": "Chesterfield", "isoCode": "CT" },
  { "countyName": "Clarendon", "isoCode": "CR" },
  { "countyName": "Colleton", "isoCode": "CN" },
  { "countyName": "Darlington", "isoCode": "DA" },
  { "countyName": "Dillon", "isoCode": "DN" },
  { "countyName": "Dorchester", "isoCode": "DR" },
  { "countyName": "Edgefield", "isoCode": "ED" },
  { "countyName": "Fairfield", "isoCode": "FA" },
  { "countyName": "Florence", "isoCode": "FL" },
  { "countyName": "Georgetown", "isoCode": "GE" },
  { "countyName": "Greenville", "isoCode": "GVL" },
  { "countyName": "Greenwood", "isoCode": "GN" },
  { "countyName": "Hampton", "isoCode": "HA" },
  { "countyName": "Horry", "isoCode": "HR" },
  { "countyName": "Jasper", "isoCode": "JA" },
  { "countyName": "Kershaw", "isoCode": "KE" },
  { "countyName": "Lancaster", "isoCode": "LA" },
  { "countyName": "Laurens", "isoCode": "LU" },
  { "countyName": "Lee", "isoCode": "LE" },
  { "countyName": "Lexington", "isoCode": "LX" },
  { "countyName": "Marion", "isoCode": "MA" },
  { "countyName": "Marlboro", "isoCode": "ML" },
  { "countyName": "McCormick", "isoCode": "MC" },
  { "countyName": "Newberry", "isoCode": "NB" },
  { "countyName": "Oconee", "isoCode": "OC" },
  { "countyName": "Orangeburg", "isoCode": "OR" },
  { "countyName": "Pickens", "isoCode": "PN" },
  { "countyName": "Richland", "isoCode": "RD" },
  { "countyName": "Saluda", "isoCode": "SA" },
  { "countyName": "Spartanburg", "isoCode": "SP" },
  { "countyName": "Sumter", "isoCode": "SU" },
  { "countyName": "Union", "isoCode": "UN" },
  { "countyName": "Williamsburg", "isoCode": "WG" },
  { "countyName": "York", "isoCode": "YK" }
];

// US State to Counties mapping with state ISO codes
// This maps US state ISO codes to their respective counties

export const US_COUNTY_BY_STATE = {
  // Alabama (AL)
  "AL": [
    { countyName: "Autauga County", countyFips: "001" },
    { countyName: "Baldwin County", countyFips: "003" },
    { countyName: "Barbour County", countyFips: "005" },
    { countyName: "Bibb County", countyFips: "007" },
    { countyName: "Blount County", countyFips: "009" },
    { countyName: "Bullock County", countyFips: "011" },
    { countyName: "Butler County", countyFips: "013" },
    { countyName: "Calhoun County", countyFips: "015" },
    { countyName: "Chambers County", countyFips: "017" },
    { countyName: "Cherokee County", countyFips: "019" },
    { countyName: "Chilton County", countyFips: "021" },
    { countyName: "Choctaw County", countyFips: "023" },
    { countyName: "Clarke County", countyFips: "025" },
    { countyName: "Clay County", countyFips: "027" },
    { countyName: "Cleburne County", countyFips: "029" },
    { countyName: "Coffee County", countyFips: "031" },
    { countyName: "Colbert County", countyFips: "033" },
    { countyName: "Conecuh County", countyFips: "035" },
    { countyName: "Coosa County", countyFips: "037" },
    { countyName: "Covington County", countyFips: "039" },
    { countyName: "Crenshaw County", countyFips: "041" },
    { countyName: "Cullman County", countyFips: "043" },
    { countyName: "Dale County", countyFips: "045" },
    { countyName: "Dallas County", countyFips: "047" },
    { countyName: "DeKalb County", countyFips: "049" },
    { countyName: "Elmore County", countyFips: "051" },
    { countyName: "Escambia County", countyFips: "053" },
    { countyName: "Etowah County", countyFips: "055" },
    { countyName: "Fayette County", countyFips: "057" },
    { countyName: "Franklin County", countyFips: "059" },
    { countyName: "Geneva County", countyFips: "061" },
    { countyName: "Greene County", countyFips: "063" },
    { countyName: "Hale County", countyFips: "065" },
    { countyName: "Henry County", countyFips: "067" },
    { countyName: "Houston County", countyFips: "069" },
    { countyName: "Jackson County", countyFips: "071" },
    { countyName: "Jefferson County", countyFips: "073" },
    { countyName: "Lamar County", countyFips: "075" },
    { countyName: "Lauderdale County", countyFips: "077" },
    { countyName: "Lawrence County", countyFips: "079" },
    { countyName: "Lee County", countyFips: "081" },
    { countyName: "Limestone County", countyFips: "083" },
    { countyName: "Lowndes County", countyFips: "085" },
    { countyName: "Macon County", countyFips: "087" },
    { countyName: "Madison County", countyFips: "089" },
    { countyName: "Marengo County", countyFips: "091" },
    { countyName: "Marion County", countyFips: "093" },
    { countyName: "Marshall County", countyFips: "095" },
    { countyName: "Mobile County", countyFips: "097" },
    { countyName: "Monroe County", countyFips: "099" },
    { countyName: "Montgomery County", countyFips: "101" },
    { countyName: "Morgan County", countyFips: "103" },
    { countyName: "Perry County", countyFips: "105" },
    { countyName: "Pickens County", countyFips: "107" },
    { countyName: "Pike County", countyFips: "109" },
    { countyName: "Randolph County", countyFips: "111" },
    { countyName: "Russell County", countyFips: "113" },
    { countyName: "St. Clair County", countyFips: "115" },
    { countyName: "Shelby County", countyFips: "117" },
    { countyName: "Sumter County", countyFips: "119" },
    { countyName: "Talladega County", countyFips: "121" },
    { countyName: "Tallapoosa County", countyFips: "123" },
    { countyName: "Tuscaloosa County", countyFips: "125" },
    { countyName: "Walker County", countyFips: "127" },
    { countyName: "Washington County", countyFips: "129" },
    { countyName: "Wilcox County", countyFips: "131" },
    { countyName: "Winston County", countyFips: "133" }
  ],
  // Alaska (AK) - Boroughs and Census Areas
  "AK": [
    { countyName: "Aleutians East Borough", countyFips: "013" },
    { countyName: "Aleutians West Census Area", countyFips: "016" },
    { countyName: "Anchorage Municipality", countyFips: "020" },
    { countyName: "Bethel Census Area", countyFips: "050" },
    { countyName: "Bristol Bay Borough", countyFips: "060" },
    { countyName: "Denali Borough", countyFips: "068" },
    { countyName: "Dillingham Census Area", countyFips: "070" },
    { countyName: "Fairbanks North Star Borough", countyFips: "090" },
    { countyName: "Haines Borough", countyFips: "100" },
    { countyName: "Hoonah-Angoon Census Area", countyFips: "105" },
    { countyName: "Juneau City and Borough", countyFips: "110" },
    { countyName: "Kenai Peninsula Borough", countyFips: "122" },
    { countyName: "Ketchikan Gateway Borough", countyFips: "130" },
    { countyName: "Kodiak Island Borough", countyFips: "150" },
    { countyName: "Kusilvak Census Area", countyFips: "158" },
    { countyName: "Lake and Peninsula Borough", countyFips: "164" },
    { countyName: "Matanuska-Susitna Borough", countyFips: "170" },
    { countyName: "Nome Census Area", countyFips: "180" },
    { countyName: "North Slope Borough", countyFips: "185" },
    { countyName: "Northwest Arctic Borough", countyFips: "188" },
    { countyName: "Petersburg Borough", countyFips: "195" },
    { countyName: "Prince of Wales-Hyder Census Area", countyFips: "198" },
    { countyName: "Sitka City and Borough", countyFips: "220" },
    { countyName: "Skagway Municipality", countyFips: "230" },
    { countyName: "Southeast Fairbanks Census Area", countyFips: "240" },
    { countyName: "Valdez-Cordova Census Area", countyFips: "261" },
    { countyName: "Wrangell City and Borough", countyFips: "270" },
    { countyName: "Yakutat City and Borough", countyFips: "275" },
    { countyName: "Yukon-Koyukuk Census Area", countyFips: "290" }
  ],
  // South Carolina (SC) - Keep existing counties
  "SC": countyList.map(item => ({ countyName: item.countyName, countyFips: item.isoCode }))
};

// Helper function to get counties for a state
export const getCountiesByState = (stateIsoCode) => {
  if (!stateIsoCode) return [];
  const counties = US_COUNTY_BY_STATE[stateIsoCode];
  if (!counties) return [];
  return counties.map(county => ({
    countyName: county.countyName,
    value: county.countyName
  }));
};
export const getCountyOptionsByStateByCode = (stateCode) => {
  if (!stateCode) return [];

  const countyNames = new Set();

  citiesData.forEach((city) => {
    if (city.country !== "US" || city.admin1 !== stateCode || !city.admin2) {
      return;
    }

    let countyName = "";

    if (/^\d+$/.test(city.admin2)) {
      const key = String(city.admin2).padStart(3, "0");
      const stateCounty = US_COUNTY_BY_STATE[stateCode]?.find(
        (county) => String(county.countyFips).padStart(3, "0") === key,
      );

      countyName = stateCounty?.countyName || `County ${key}`;
    } else {
      countyName = city.admin2.includes("County")
        ? city.admin2
        : `${city.admin2} County`;
    }

    if (countyName) {
      countyNames.add(countyName);
    }
  });

  return Array.from(countyNames)
    .sort((a, b) => a.localeCompare(b))
    .map((countyName) => ({
      label: countyName,
      value: countyName,
    }));
};

// Get county options by state code (returns label/value format for select components)
export const getCountyOptionsByState = (stateCode) => {
  if (!stateCode) return [];

  const counties = US_COUNTY_BY_STATE[stateCode];
  if (!counties || !Array.isArray(counties)) return [];

  return counties
    .map((county) => ({
      label: county.countyName,
      value: county.countyName,
    }))
    .sort((a, b) => a.label.localeCompare(b));
};

export const alaskaBoroughList = [
  { "boroughName": "Aleutians East Borough", "isoCode": "AEB" },
  { "boroughName": "Aleutians West Census Area", "isoCode": "AWCA" },
  { "boroughName": "Anchorage Borough", "isoCode": "ANC" },
  { "boroughName": "Bethel Census Area", "isoCode": "BCA" },
  { "boroughName": "Bristol Bay Borough", "isoCode": "BBB" },
  { "boroughName": "Denali Borough", "isoCode": "DEN" },
  { "boroughName": "Dillingham Census Area", "isoCode": "DCA" },
  { "boroughName": "Fairbanks North Star Borough", "isoCode": "FNSB" },
  { "boroughName": "Haines Borough", "isoCode": "HAI" },
  { "boroughName": "Hoonah-Angoon Census Area", "isoCode": "HACA" },
  { "boroughName": "Juneau Borough", "isoCode": "JUN" },
  { "boroughName": "Kenai Peninsula Borough", "isoCode": "KPB" },
  { "boroughName": "Ketchikan Gateway Borough", "isoCode": "KGB" },
  { "boroughName": "Kodiak Island Borough", "isoCode": "KIB" },
  { "boroughName": "Lake and Peninsula Borough", "isoCode": "LPB" },
  { "boroughName": "Matanuska-Susitna Borough", "isoCode": "MSB" },
  { "boroughName": "Nome Census Area", "isoCode": "NCA" },
  { "boroughName": "North Slope Borough", "isoCode": "NSB" },
  { "boroughName": "Northwest Arctic Borough", "isoCode": "NAB" },
  { "boroughName": "Petersburg Borough", "isoCode": "PET" },
  { "boroughName": "Prince of Wales-Hyder Census Area", "isoCode": "PWHCA" },
  { "boroughName": "Sitka Borough", "isoCode": "SIT" },
  { "boroughName": "Skagway Borough", "isoCode": "SKA" },
  { "boroughName": "Southeast Fairbanks Census Area", "isoCode": "SFCA" },
  { "boroughName": "Valdez-Cordova Census Area", "isoCode": "VCCA" },
  { "boroughName": "Wrangell Borough", "isoCode": "WRA" },
  { "boroughName": "Yakutat Borough", "isoCode": "YAK" },
  { "boroughName": "Yukon-Koyukuk Census Area", "isoCode": "YKCA" }
];
