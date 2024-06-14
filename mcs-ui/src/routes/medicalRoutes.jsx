import PatientListPage from "../pages/medical-app/patients";
import MedicineListPage from "../pages/medical-app/medicines";
import SalesListPage from "../pages/medical-app/sales";
import ReleaseListPage from "../pages/medical-app/release";
import ApeListPage from "../pages/medical-app/ape";
import SicknessListPage from "../pages/medical-app/sickness";
import UomListPage from "../pages/medical-app/uom";
import DosageListPage from "../pages/medical-app/dosage";
import LaboratoryListPage from "../pages/medical-app/laboratory";

export const medicalRoutes = [
  {
    path: "/patient-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: PatientListPage,
  },
  {
    path: "/medicine-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: MedicineListPage,
  },
  {
    path: "/sickness-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: SicknessListPage,
  },
  {
    path: "/sales-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: SalesListPage,
  },
  {
    path: "/medicinerelease-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: ReleaseListPage,
  },
  {
    path: "/ape-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: ApeListPage,
  },
  {
    path: "/uom-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: UomListPage,
  },
  {
    path: "/dosage-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: DosageListPage,
  },
  {
    path: "/laboratory-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: LaboratoryListPage,
  },
];
