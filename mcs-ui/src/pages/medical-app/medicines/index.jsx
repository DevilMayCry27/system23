import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { module } from "../../../utils/constant.js";
import { currency } from "../../../utils/formatter.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getMedicineList,
  postMedicine,
  putMedicine,
  delMedicine,
} from "../../../actions/medicine.js";
import { getUomListAction } from "../../../actions/uom.js";

import MedicineModal from "./components/medicineModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const MedicineListPage = (props) => {
  const {
    access,
    medicineListLoading,
    medicineListSuccess,
    medicineListFailed,
    medicineListData,
    OnGetmedicineList,
    postMedicineLoading,
    postMedicineSuccess,
    postMedicineFailed,
    OnPostMedicine,
    putMedicineLoading,
    putMedicineSuccess,
    putMedicineFailed,
    OnPutMedicine,
    delMedicineLoading,
    delMedicineSuccess,
    delMedicineFailed,
    OnDelMedicine,

    uomListLoading,
    uomListSuccess,
    uomListFailed,
    uomListData,
    OnGetUomList,
  } = props;
  const [form] = Form.useForm();
  const [uoms, setUoms] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [medicine, setMedicine] = useState(0);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setMedicine(values);
    form.resetFields();
    form.setFieldsValue({
      ...values,
      Status: values?.ID ? parseInt(values.Status) : values.Status,
    });
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!medicine?.ID) {
      await OnPostMedicine(values);
    } else {
      await OnPutMedicine(medicine?.ID, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelMedicine(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = medicines.filter(
        (item) =>
          item.Code.toLowerCase().includes(text.toLowerCase()) ||
          item.GenericName.toLowerCase().includes(text.toLowerCase()) ||
          item.LabelClaim.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(medicines);
    }
  };

  const getData = async () => {
    await OnGetUomList();
    await OnGetmedicineList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (uomListSuccess) {
      setUoms(uomListData);
    }

    if (uomListFailed) {
      console.log("Get UOM List Failed...");
    }
  }, [uomListSuccess, uomListFailed, uomListData]);

  useEffect(() => {
    if (medicineListSuccess) {
      setData(medicineListData);
      setMedicines(medicineListData);
    }

    if (medicineListFailed) {
      console.log("Get Medicine List Failed...");
    }
  }, [medicineListSuccess, medicineListFailed, medicineListData]);

  useEffect(() => {
    if (postMedicineSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Medicine Successfully Created!");
    }

    if (postMedicineFailed) {
      Message.error("New Medicine Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postMedicineSuccess, postMedicineFailed]);

  useEffect(() => {
    if (putMedicineSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Medicine Successfully Updated!");
    }

    if (putMedicineFailed) {
      Message.error("Medicine Update Failed!");
    }
    // eslint-disable-next-line
  }, [putMedicineSuccess, putMedicineFailed]);

  useEffect(() => {
    if (delMedicineSuccess) {
      getData();
      Message.success("Medicine Successfully Deleted!");
    }

    if (delMedicineFailed) {
      Message.error("Medicine Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delMedicineSuccess, delMedicineFailed]);

  const columns = [
    {
      title: "CODE",
      dataIndex: "Code",
      key: "Code",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "GENERIC NAME",
      dataIndex: "GenericName",
      key: "GenericName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "LABEL CLAIM",
      dataIndex: "LabelClaim",
      key: "LabelClaim",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    // {
    //   title: "STOCK",
    //   dataIndex: "Stock",
    //   key: "Stock",
    //   align: "center",
    //   width: 200,
    //   render: (value, row) => <div className="field-text">{value}</div>,
    // },
    {
      title: "UOM",
      dataIndex: "UomName",
      key: "UomName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "UNIT PRICE",
      dataIndex: "UnitPrice",
      key: "UnitPrice",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{currency(value)}</div>
      ),
    },
    {
      title: "ACTIONS",
      dataIndex: "ID",
      key: "ID",
      align: "center",
      width: 200,
      render: (value, row) => (
        <TableRowAction
          showModal={() => showModal(row)}
          confirmDelete={() => confirmDelete(value)}
          canUpdate={
            getModuleAccess(access?.reference, module?.medicines)?.update
          }
          canDelete={
            getModuleAccess(access?.reference, module?.medicines)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    uomListLoading ||
    medicineListLoading ||
    postMedicineLoading ||
    putMedicineLoading ||
    delMedicineLoading;

  return (
    <Row className="main-body medicine-list-page">
      <PageAction
        pageName="Medicine"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={
          getModuleAccess(access?.reference, module?.medicines)?.create
        }
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <MedicineModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        medicine={medicine}
        uoms={uoms}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    medicineListLoading: state.medicine.medicineListLoading,
    medicineListSuccess: state.medicine.medicineListSuccess,
    medicineListFailed: state.medicine.medicineListFailed,
    medicineListData: state.medicine.medicineListData,

    postMedicineLoading: state.medicine.postMedicineLoading,
    postMedicineSuccess: state.medicine.postMedicineSuccess,
    postMedicineFailed: state.medicine.postMedicineFailed,
    postMedicineData: state.medicine.postMedicineData,

    putMedicineLoading: state.medicine.putMedicineLoading,
    putMedicineSuccess: state.medicine.putMedicineSuccess,
    putMedicineFailed: state.medicine.putMedicineFailed,
    putMedicineData: state.medicine.putMedicineData,

    delMedicineLoading: state.medicine.delMedicineLoading,
    delMedicineSuccess: state.medicine.delMedicineSuccess,
    delMedicineFailed: state.medicine.delMedicineFailed,
    delMedicineData: state.medicine.delMedicineData,

    uomListLoading: state.uom.uomListLoading,
    uomListSuccess: state.uom.uomListSuccess,
    uomListFailed: state.uom.uomListFailed,
    uomListData: state.uom.uomListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetmedicineList: () => dispatch(getMedicineList()),
    OnPostMedicine: (data) => dispatch(postMedicine(data)),
    OnPutMedicine: (id, data) => dispatch(putMedicine(id, data)),
    OnDelMedicine: (id) => dispatch(delMedicine(id)),

    OnGetUomList: () => dispatch(getUomListAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicineListPage);
