export const wizardSteps = [
  {
    id: "caseType",
    path: "/",
    label: "Case Type",
    title: "What type of case is this?",
    description:
      "Choose whether this matter is a new filing or an existing case record.",
  },
  {
    id: "caseCategory",
    path: "/category",
    label: "Case Category",
    title: "Select the case category",
    description:
      "This step depends on the case type selected in the previous step.",
  },
  {
    id: "country",
    path: "/country",
    label: "Country",
    title: "Select the country",
    description: "This question appears only when the case category is ODI.",
  },
];

export const optionGroups = {
  caseType: [
    {
      value: "Existing",
      label: "Existing",
      description: "This case already exists in the system.",
    },
    {
      value: "New Case",
      label: "New Case",
      description: "Start a fresh matter from the beginning.",
    },
  ],
  caseCategory: {
    "New Case": [
      {
        value: "FDI",
        label: "FDI",
        description: "Foreign Direct Investment case.",
      },
      {
        value: "ODI",
        label: "ODI",
        description: "Overseas Direct Investment case.",
      },
      {
        value: "DCB",
        label: "DCB",
        description: "Debt Capital Bond case.",
      },
      {
        value: "LOBO",
        label: "LOBO",
        description: "Lobo transaction case.",
      },
    ],
    Existing: [],
  },
  country: [
    { value: "USA", label: "USA", description: "United States of America" },
    { value: "UAE", label: "UAE", description: "United Arab Emirates" },
    {
      value: "Singapore",
      label: "Singapore",
      description: "Republic of Singapore",
    },
    {
      value: "United Kingdom",
      label: "United Kingdom",
      description: "United Kingdom",
    },
    { value: "India", label: "India", description: "Republic of India" },
  ],
};

export const defaultAnswers = {
  caseType: "",
  caseCategory: "",
  country: "",
};

export const flowRules = {
  caseType: {
    Existing: {
      nextStep: "/category",
      allowCategory: false,
      categoryOptions: [],
    },
    "New Case": {
      nextStep: "/category",
      allowCategory: true,
      categoryOptions: optionGroups.caseCategory["New Case"],
    },
  },
};
