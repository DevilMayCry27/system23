import PositionListPage from "./../pages/admin/position";
import UserListPage from "./../pages/admin/user";
import CompanyListPage from "./../pages/admin/company";
import DepartmentListPage from "./../pages/admin/department";
import SectionListPage from "./../pages/admin/section";
import GenderListPage from "./../pages/admin/gender";
import CivilStatusListPage from "./../pages/admin/civil status";
import BloodTypeListPage from "./../pages/admin/blood type";
import RelationListPage from "./../pages/admin/relation";
import CountryListPage from "./../pages/admin/country";
import RegionListPage from "./../pages/admin/region";
import ProvinceListPage from "./../pages/admin/province";
import CityListPage from "./../pages/admin/city";
import MedicineApproverListPage from "./../pages/admin/medicine approvers";

export const adminRoutes = [
  {
    path: "/job-position-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: PositionListPage,
  },
  {
    path: "/user-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: UserListPage,
  },
  {
    path: "/company-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: CompanyListPage,
  },
  {
    path: "/department-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: DepartmentListPage,
  },
  {
    path: "/section-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: SectionListPage,
  },
  {
    path: "/gender-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: GenderListPage,
  },
  {
    path: "/civilstatus-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: CivilStatusListPage,
  },
  {
    path: "/bloodtype-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: BloodTypeListPage,
  },
  {
    path: "/relationship-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: RelationListPage,
  },
  {
    path: "/country-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: CountryListPage,
  },
  {
    path: "/region-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: RegionListPage,
  },
  {
    path: "/province-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: ProvinceListPage,
  },
  {
    path: "/city-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: CityListPage,
  },
  {
    path: "/medicineapprover-list-page",
    exact: true,
    auth: true,
    accessible: true,
    component: MedicineApproverListPage,
  },
];
