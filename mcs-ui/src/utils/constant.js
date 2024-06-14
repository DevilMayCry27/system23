export const APP_NAME = {
  DASHBOARD: "DASHBOARD",
  COMMUNICATION: "COMMUNICATION",
  MEDICAL: "MEDICAL",
};

export const module = {
  positions: 33,
  users: 34,
  forums: 35,
  chats: 36,
  surveys: 37,
  suggestions: 38,
  faqs: 39,
  patients: 40,
  consultation: 41,
  medicines: 42,
  company: 43,
  departments: 44,
  section: 45,
  gender: 46,
  civilstatus: 47,
  bloodtype: 48,
  relationship: 49,
  country: 50,
  region: 51,
  province: 52,
  city: 53,
  sales: 54,
  medicineapprover: 55,
  medicinerelease: 56,
  ape: 57,
  sickness: 58,
  uom: 59,
  dosage: 60,
  laboratory: 61,
};

export const sideMenus = [
  {
    key: "/admin-module",
    label: "ADMIN",
    menu: "admin",
    children: [
      {
        module: "positions",
        label: "Positions",
        href: "/job-position-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "users",
        label: "Users",
        href: "/user-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "company",
        label: "Company",
        href: "/company-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "departments",
        label: "Departments",
        href: "/department-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "section",
        label: "Sections",
        href: "/section-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "gender",
        label: "Genders",
        href: "/gender-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "civilstatus",
        label: "Civil Status",
        href: "/civilstatus-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "bloodtype",
        label: "Blood Types",
        href: "/bloodtype-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "relationship",
        label: "Relation",
        href: "/relationship-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "country",
        label: "Country",
        href: "/country-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "region",
        label: "Region",
        href: "/region-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "province",
        label: "Province",
        href: "/province-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "city",
        label: "City",
        href: "/city-list-page",
        appName: APP_NAME.DASHBOARD,
      },
      {
        module: "medicineapprover",
        label: "Medicine Approver",
        href: "/medicineapprover-list-page",
        appName: APP_NAME.DASHBOARD,
      },
    ],
  },
  {
    key: "/reference-module",
    label: "REFERENCE",
    menu: "reference",
    children: [
      {
        module: "medicines",
        label: "Medicines",
        href: "/medicine-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "sickness",
        label: "Sickness",
        href: "/sickness-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "uom",
        label: "Unit of measurements",
        href: "/uom-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "dosage",
        label: "Dosage",
        href: "/dosage-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "patients",
        label: "Patients",
        href: "/patient-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "sales",
        label: "Sales",
        href: "/sales-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "medicinerelease",
        label: "Release",
        href: "/medicinerelease-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "ape",
        label: "APE",
        href: "/ape-list-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "laboratory",
        label: "Laboratory",
        href: "/laboratory-list-page",
        appName: APP_NAME.MEDICAL,
      },
    ],
  },
  {
    key: "/general-module",
    label: "GENERAL",
    menu: "general",
    children: [
      {
        module: "forums",
        label: "Forums",
        href: "/forum-list-page",
        appName: APP_NAME.COMMUNICATION,
      },
      {
        module: "chats",
        label: "Groupchat",
        href: "/groupchat-list-page",
        appName: APP_NAME.COMMUNICATION,
      },
      // {
      //   module: "surveys",
      //   label: "Survey",
      //   href: "/survey-page",
      //   appName: APP_NAME.COMMUNICATION,
      // },
      // {
      //   module: "faqs",
      //   label: "FAQ",
      //   href: "/faq-page",
      //   appName: APP_NAME.COMMUNICATION,
      // },
      // {
      //   module: "suggestions",
      //   label: "Suggestions",
      //   href: "/suggestions-page",
      //   appName: APP_NAME.COMMUNICATION,
      // },
    ],
  },
  {
    key: "/report-module",
    label: "REPORT",
    menu: "report",
    children: [
      {
        module: "consultation",
        label: "Consultation",
        href: "/consultation-report-page",
        appName: APP_NAME.MEDICAL,
      },
      {
        module: "sales",
        label: "Medicine",
        href: "/medicine-report-page",
        appName: APP_NAME.MEDICAL,
      },
    ],
  },
];

export const moduleType = {
  authentication: 0,
  admin: 1,
  reference: 2,
  general: 3,
  report: 4,
};

export const getModuleName = (type) => {
  switch (type) {
    case moduleType.authentication:
      return "AUTHENTICATION";
    case moduleType.admin:
      return "ADMIN";
    case moduleType.reference:
      return "REFERENCE";
    case moduleType.general:
      return "GENERAL";
    case moduleType.report:
      return "REPORT";
    default:
      return "";
  }
};

export const getStatusType = (status) => {
  switch (status) {
    case 0:
      return {
        text: "INACTIVE",
        class: "failed-text",
      };
    case 1:
      return {
        text: "ACTIVE",
        class: "success-text",
      };
    case 2:
      return {
        text: "DELETED",
        class: "field-text",
      };
    default:
      return "";
  }
};

export const getHttpStatusType = (status) => {
  switch (status) {
    case 1:
      return {
        text: "OK",
        class: "success-text",
      };
    case 0:
      return {
        text: "ERROR",
        class: "failed-text",
      };
    case 2:
      return {
        text: "DENIED",
        class: "field-text",
      };
    default:
      return "";
  }
};
