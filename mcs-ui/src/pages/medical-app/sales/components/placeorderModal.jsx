import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import MainTable from "../../../../components/maintable.jsx";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import Message from "antd/lib/message";
import Popconfirm from "antd/lib/popconfirm";
import DeleteFilled from "@ant-design/icons/DeleteFilled";
import { Divider } from "antd";
import { currency } from "../../../../utils/formatter.js";
import { Col } from "antd";
import { connect } from "react-redux";
import { getMedicineList } from "../../../../actions/medicine.js";
import {
  getOrderNumberAction,
  postMedicineOrderListAction,
} from "../../../../actions/medicineorder.js";
import { getSalesOrderListAction } from "../../../../actions/salesorder.js";

const { Option } = Select;

const PlaceOrderModal = (props) => {
  const {
    showPlaceOrderModal,
    isplaceorderVisible,
    salesorderListLoading,
    salesorderListSuccess,
    salesorderListFailed,
    salesorderListData,
    OnGetSalesOrderList,
    medicineListLoading,
    medicineListSuccess,
    medicineListFailed,
    medicineListData,
    OnGetMedicineList,
    medicineordernumberLoading,
    medicineordernumberSuccess,
    medicineordernumberFailed,
    medicineordernumberData,
    OnGetOrderNumber,
    postMedicineorderLoading,
    postMedicineorderSuccess,
    postMedicineorderFailed,
    OnPostMedicineOrder,
  } = props;
  const [formorder] = Form.useForm();
  const [data2, setData2] = useState(0);
  const nextOrderID = data2.length > 0 ? data2[0].NextOrderID : null;
  const [data, setData] = useState([]);
  const [employeeId, setEmployeeId] = useState(0);
  const [info, setInfo] = useState([]);
  const [tempItemlist, settempItemlist] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [item, setItem] = useState([]);
  const [qty, setQty] = useState("");
  const [type, setType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = tempItemlist.reduce((acc, item) => acc + item.Amount, 0);
    setTotalPrice(total);
  }, [tempItemlist]);

  // Disable ADD ITEM button if type, quantity, or item is not set
  const isAddItemDisabled = !type || !qty || !item.GenericName;

  const onAdd = () => {
    const isExist = tempItemlist.some(
      (tempitem) => tempitem.ItemID === item.ItemID
    );

    if (!isExist) {
      let temp = {
        Type: type,
        Qty: qty,
        ...item,
        Price: item?.UnitPrice,
        Amount: item?.UnitPrice * qty,
        NextOrderID: nextOrderID,
        EmployeeId: employeeId,
      };
      settempItemlist([...tempItemlist, temp]);
    } else {
      Message.error("Item Already Exists!");
    }
  };

  const onSubmitFinal = (value) => {
    if (tempItemlist.length <= 0) {
      Message.error("Please add item!");
    } else {
      for (var d = 0; d < tempItemlist.length; d++) {
        let temp = { ...tempItemlist[d] };
        onSubmitOrder(temp);
        showPlaceOrderModal(!isplaceorderVisible);
      }
      settempItemlist([]);
      getData();
    }
  };

  const onSelectEmployeeName = (value) => {
    const splitted = value?.split("||");
    setInfo({
      FirstName: splitted && splitted[0],
      MiddleName: splitted && splitted[1],
      LastName: splitted && splitted[2],
      EmployeeId: splitted && splitted[3],
      Department: splitted && splitted[4],
      Section: splitted && splitted[5],
    });
  };

  useEffect(() => {
    setEmployeeId(info.EmployeeId);
  }, [info]);

  const onSelectItemCode = (value) => {
    const splitted = value?.split("||");

    setItem({
      GenericName: splitted && splitted[0],
      UnitPrice: splitted && splitted[1],
      ItemID: splitted && splitted[2],
    });
  };

  const onSubmitOrder = async (values) => {
    await OnPostMedicineOrder(values);
  };

  const getData = async () => {
    await OnGetSalesOrderList();
    await OnGetMedicineList();
    await OnGetOrderNumber();
  };

  useEffect(() => {
    if (salesorderListSuccess) {
      setData(salesorderListData);
    }

    if (salesorderListFailed) {
      console.log("Get Employee List Failed...");
    }
  }, [salesorderListSuccess, salesorderListFailed, salesorderListData]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (medicineListSuccess) {
      setMedicines(medicineListData);
    }

    if (medicineListFailed) {
      console.log("Get Medicine List Failed...");
    }
  }, [medicineListSuccess, medicineListFailed, medicineListData]);

  useEffect(() => {
    if (medicineordernumberSuccess) {
      setData2(medicineordernumberData);
    }

    if (medicineordernumberFailed) {
      console.log("Get Order Number Failed...");
    }
  }, [
    medicineordernumberSuccess,
    medicineordernumberFailed,
    medicineordernumberData,
  ]);

  useEffect(() => {
    if (postMedicineorderSuccess) {
      getData();
      Message.success("New Medicine Order Successfully Created!");
    }

    if (postMedicineorderFailed) {
      Message.error("New Medicine Order Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postMedicineorderSuccess, postMedicineorderFailed]);

  const confirmDelete = async (ID) => {
    const newData = tempItemlist.filter((item) => item.ItemID !== ID);
    settempItemlist(newData);
  };

  const columns = [
    {
      title: "QUANTITY",
      dataIndex: "Qty",
      key: "Qty",
      align: "center",
      width: 225,
      render: (value, row) => (
        // eslint-disable-next-line
        <div className="field-text">{value + " " + "PC"}</div>
      ),
    },
    {
      title: "ITEMS / DESCRIPTION",
      dataIndex: "GenericName",
      key: "GenericName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "UNIT PRICE",
      dataIndex: "Price",
      key: "Price",
      align: "center",
      width: 200,
      render: (value, row) => (
        // eslint-disable-next-line
        <div className="field-text">{"₱" + " " + currency(value)}</div>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "Amount",
      key: "Amount",
      align: "center",
      width: 200,
      render: (value, row) => (
        // eslint-disable-next-line
        <div className="field-text">{"₱" + " " + currency(value)}</div>
      ),
    },
    {
      title: "TYPE",
      dataIndex: "Type",
      key: "Type",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{value === 1 ? "PURCHASE" : "SUPPLY"}</div>
      ),
    },
    {
      title: "ACTIONS",
      dataIndex: "ItemID",
      key: "ItemID",
      align: "center",
      width: 200,
      render: (value, row) => (
        <Popconfirm
          title="Are you sure ?"
          onConfirm={() => confirmDelete(row.ItemID)}
          okText="Yes"
          cancelText="No"
          placement="left"
          className="delete-confirm"
        >
          <Button
            shape="circle"
            className="delete-icon"
            icon={<DeleteFilled />}
          />
        </Popconfirm>
      ),
    },
  ];

  const isLoadingAndDisabled =
    medicineListLoading ||
    medicineordernumberLoading ||
    postMedicineorderLoading ||
    salesorderListLoading;

  return (
    <Modal
      className="new-modal"
      title={`Place Order`}
      visible={isplaceorderVisible}
      onOk={showPlaceOrderModal}
      onCancel={showPlaceOrderModal}
      maskClosable={false}
      closable={false}
      footer={null}
      centered
      width={"55%"}
    >
      <Form
        name="new form"
        onFinish={onSubmitFinal}
        autoComplete="off"
        className="new-form"
        form={formorder}
      >
        <Row className="main-body medicine-list-page">
          <Divider orientation="left" orientationMargin="0">
            EMPLOYEE DETAILS
          </Divider>
          <Col span={8}>
            <Form.Item
              name="FullName"
              rules={[
                {
                  required: true,
                  message: "Please select authorize personnel!",
                },
              ]}
            >
              <Select
                placeholder="Select Employee"
                className="select-field"
                onChange={onSelectEmployeeName}
                showSearch
              >
                {data
                  .slice()
                  .sort((a, b) => a.FullName.localeCompare(b.FullName))
                  .map((data) => (
                    <Option
                      key={data?.FullName}
                      value={`${data?.FirstName}||${data?.MiddleName}||${data?.LastName}||${data?.EmID}||${data?.Department}||${data?.Section}`}
                    >
                      {data?.FullName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={6}>
            <div>
              <h3>Department:</h3> <span>{info?.Department}</span>
            </div>
          </Col>
          <Col span={1}></Col>
          <Col span={8}>
            <div>
              <h3>Section:</h3> <span>{info?.Section}</span>
            </div>
          </Col>
          <Divider orientation="left" orientationMargin="0">
            ORDER DETAILS
          </Divider>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <div className="field-label">TYPE</div>
                <Form.Item
                  name="Type"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Order Type"
                    className="select-field"
                    onChange={(e) => {
                      setType(e);
                    }}
                  >
                    <Option value={1}>PURCHASE</Option>
                    <Option value={2}>SUPPLY</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={5}>
                <div className="field-label">QUANTITY</div>
                <Form.Item
                  name="Qty"
                  rules={[
                    {
                      required: true,
                      message: "Please input quantity",
                    },
                  ]}
                >
                  <Input
                    min={1}
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    type="number"
                    placeholder="Input Quantity"
                  />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={5}>
                <div className="field-label">ITEMS / DESCRIPTION</div>
                <Form.Item
                  name="GenericName"
                  rules={[
                    {
                      required: true,
                      message: "Please select item!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Item"
                    className="select-field"
                    onChange={onSelectItemCode}
                  >
                    {medicines.map((medicine) => (
                      <Option
                        key={medicine?.ID}
                        value={`${medicine?.GenericName}||${medicine?.UnitPrice}||${medicine?.ID}`}
                      >
                        {medicine?.GenericName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={5}>
                <div>
                  <center>
                    <Form.Item>
                      <Button
                        className="submit-btn"
                        onClick={onAdd}
                        disabled={isAddItemDisabled}
                      >
                        ADD ITEM
                      </Button>
                    </Form.Item>
                  </center>
                </div>
              </Col>
            </Row>
          </Col>

          <Divider orientation="left" orientationMargin="0">
            ITEMS
          </Divider>

          <Col span={24}>
            <center>
              <MainTable
                columns={columns}
                data={tempItemlist}
                isLoading={isLoadingAndDisabled}
              />
            </center>
          </Col>

          <Col span={24}>
            <center>
              <Row>
                <Col span={24}>
                  <h3>TOTAL PRICE: {"₱" + " " + currency(totalPrice)}</h3>
                </Col>
              </Row>
            </center>
          </Col>
        </Row>

        <Row justify="end">
          <Form.Item>
            <Button
              className="cancel-btn"
              onClick={() => showPlaceOrderModal() && settempItemlist([])}
              loading={isLoadingAndDisabled}
            >
              CANCEL
            </Button>

            <Button
              htmlType="submit"
              className="submit-btn"
              loading={isLoadingAndDisabled}
            >
              {"ORDER"}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    salesorderListLoading: state.salesorder.salesorderListLoading,
    salesorderListSuccess: state.salesorder.salesorderListSuccess,
    salesorderListFailed: state.salesorder.salesorderListFailed,
    salesorderListData: state.salesorder.salesorderListData,

    medicineListLoading: state.medicine.medicineListLoading,
    medicineListSuccess: state.medicine.medicineListSuccess,
    medicineListFailed: state.medicine.medicineListFailed,
    medicineListData: state.medicine.medicineListData,

    medicineordernumberLoading: state.medicineorder.medicineordernumberLoading,
    medicineordernumberSuccess: state.medicineorder.medicineordernumberSuccess,
    medicineordernumberFailed: state.medicineorder.medicineordernumberFailed,
    medicineordernumberData: state.medicineorder.medicineordernumberData,

    postMedicineorderLoading: state.medicineorder.postMedicineorderLoading,
    postMedicineorderSuccess: state.medicineorder.postMedicineorderSuccess,
    postMedicineorderFailed: state.medicineorder.postMedicineorderFailed,
    postMedicineorderData: state.medicineorder.postMedicineorderData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetSalesOrderList: () => dispatch(getSalesOrderListAction()),
    OnGetOrderNumber: () => dispatch(getOrderNumberAction()),
    OnGetMedicineList: () => dispatch(getMedicineList()),
    OnPostMedicineOrder: (data) => dispatch(postMedicineOrderListAction(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderModal);
