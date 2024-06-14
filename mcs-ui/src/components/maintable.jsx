import Col from "antd/lib/col";
import Table from "antd/lib/table";

const MainTable = ({ columns, data, isLoading }) => {
  return (
    <Col span={20} className="table-container">
      <Table
        className="main-table"
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
        size="small"
        rowKey={"ID"}
        loading={isLoading}
        scroll={{ x: 100 }}
      />
    </Col>
  );
};

export default MainTable;
