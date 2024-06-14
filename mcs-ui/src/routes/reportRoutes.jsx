import ConsultationListPage from "../pages/medical-app/reports/consultation";
import MedicineReportListPage from "../pages/medical-app/reports/medicines";

export const reportRoutes = [
  {
    path: "/consultation-report-page",
    exact: true,
    auth: true,
    accessible: true,
    component: ConsultationListPage,
  },
  {
    path: "/medicine-report-page",
    exact: true,
    auth: true,
    accessible: true,
    component: MedicineReportListPage,
  },
];
