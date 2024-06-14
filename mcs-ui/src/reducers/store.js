import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./loginSlice.js";
import accessReducer from "./accessSlice.js";
import trailReducer from "./trailSlice.js";
import userReducer from "./userSlice.js";
import positionReducer from "./positionSlice.js";
import patientReducer from "./patientSlice.js";
import consultationReducer from "./consultationSlice.js";
import medicineReducer from "./medicineSlice.js";
import dossageReducer from "./dossageFormSlice.js";
import uomReducer from "./uomSlice.js";
import consultationreportReducer from "./consultationreportSlice.js";
import medicinesalesreportReducer from "./medicinesalesreportSlice.js";
import companyReducer from "./companySlice.js";
import departmentReducer from "./departmentSlice.js";
import sectionReducer from "./sectionSlice.js";
import genderReducer from "./genderSlice.js";
import civilstatusReducer from "./civilstatusSlice.js";
import bloodtypeReducer from "./bloodtypeSlice.js";
import relationReducer from "./relationSlice.js";
import countryReducer from "./countrySlice.js";
import regionReducer from "./regionSlice.js";
import provinceReducer from "./provinceSlice.js";
import cityReducer from "./citySlice.js";
import medicalrecordReducer from "./medicalrecordSlice.js";
import salesorderReducer from "./salesorderSlice.js";
import medicineorderReducer from "./medicineorderSlice.js";
import medicineapproverReducer from "./medicineapproverSlice.js";
import medicinereleaseReducer from "./medicinereleaseSlice.js";
import apeReducer from "./apeSlice.js";
import laboratoryReducer from "./laboratorySlice.js";
import sicknessReducer from "./sicknessSlice.js";
import beneficiariesReducer from "./beneficiariesSlice.js";
import profileReducer from "./profileSlice.js";
import clinicpatientsReducer from "./clinicpatientsSlice.js";

import switchAppReducer from "./features/switchAppSlice.js";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    access: accessReducer,
    trail: trailReducer,
    user: userReducer,
    position: positionReducer,
    profile: profileReducer,
    switchApp: switchAppReducer,
    patient: patientReducer,
    consultation: consultationReducer,
    medicine: medicineReducer,
    dossage: dossageReducer,
    uom: uomReducer,
    consultationreport: consultationreportReducer,
    company: companyReducer,
    department: departmentReducer,
    section: sectionReducer,
    gender: genderReducer,
    civilstatus: civilstatusReducer,
    bloodtype: bloodtypeReducer,
    relation: relationReducer,
    country: countryReducer,
    region: regionReducer,
    province: provinceReducer,
    city: cityReducer,
    medicalrecord: medicalrecordReducer,
    beneficiaries: beneficiariesReducer,
    salesorder: salesorderReducer,
    medicineorder: medicineorderReducer,
    medicineapprover: medicineapproverReducer,
    medicinerelease: medicinereleaseReducer,
    ape: apeReducer,
    sickness: sicknessReducer,
    medicinesalesreport: medicinesalesreportReducer,
    laboratory: laboratoryReducer,
    clinicpatients: clinicpatientsReducer,
  },
});
