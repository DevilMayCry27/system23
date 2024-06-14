import Col from "antd/lib/col";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import DatePicker from "antd/lib/date-picker";
import Select from "antd/lib/select";

import SearchOutlined from "@ant-design/icons/SearchOutlined";
import PlusCircleFilled from "@ant-design/icons/PlusCircleFilled";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import DollarCircleFilled from "@ant-design/icons/DollarCircleFilled";
import LinkOutlined from "@ant-design/icons/LinkOutlined";

import { disabledLaterDate, mmDdYyyy } from "../utils/formatter.js";
import { exportToCSV } from "../utils/excelExport.js";

const { RangePicker } = DatePicker;
const { Option } = Select;

const PageAction = ({
  onSearch,
  showModal,
  pageName,
  isDisabled,
  canCreate,
  rangeProps,
  statusProps,
  customerProps,
  excelProps,
  priorityProps,
  sectionProps,
  salesReportProps,
  joDashProps,
  etdProps,
  irProps,
  drProps,
  jobTypeProps,
  companyProps,
  artistProps,
  actionProps,
  isBene,
  showModalcrud,
}) => {
  return (
    <Col span={20} className="page-actions">
      <div className="field-filters">
        <div className="filters-container">
          {rangeProps?.show ? (
            <RangePicker
              allowClear={false}
              className="range-picker"
              format={"MM/DD/YYYY"}
              defaultValue={rangeProps?.rangeDefault}
              disabledDate={(e) => disabledLaterDate(e)}
              onChange={(range) => {
                rangeProps?.onSelectRange(
                  mmDdYyyy(range[0]),
                  mmDdYyyy(range[1])
                );
              }}
            />
          ) : (
            <></>
          )}
          <Input
            allowClear
            className="search-field"
            suffix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={`Search ${pageName}`}
          />
          {customerProps?.show ? (
            <Select
              allowClear
              placeholder="Select Customer"
              className="select-field"
              onChange={customerProps?.onSelectCustomer}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {customerProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.customer_name}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {etdProps?.show ? (
            <RangePicker
              allowClear={false}
              className="range-picker"
              format={"MM/DD/YYYY"}
              defaultValue={etdProps?.rangeDefault}
              placeholder={etdProps?.placeholder}
              onChange={(range) => {
                etdProps?.onSelectRange(mmDdYyyy(range[0]), mmDdYyyy(range[1]));
              }}
            />
          ) : (
            <></>
          )}
          {priorityProps?.show ? (
            <Select
              allowClear
              placeholder="Select Priority"
              className="select-field"
              onChange={priorityProps?.onSelectPriority}
            >
              {priorityProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.value}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {statusProps?.show ? (
            <Select
              allowClear
              placeholder="Select Status"
              className="select-field"
              onChange={statusProps?.onSelectStatus}
            >
              {statusProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.value}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {sectionProps?.show ? (
            <Select
              allowClear
              placeholder="Select Section"
              className="select-field"
              onChange={sectionProps?.onSelectSection}
              disabled={sectionProps?.disabled}
            >
              {sectionProps?.options?.map((option, index) => (
                <Option key={index} value={option?.level}>
                  {option?.section_name}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {jobTypeProps?.show ? (
            <Select
              allowClear
              placeholder="Select Job Type"
              className="select-field"
              onChange={jobTypeProps?.onSelectJobType}
            >
              {jobTypeProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.type_name}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {irProps?.show ? (
            <Select
              allowClear
              placeholder="Select IR Status"
              className="select-field"
              onChange={irProps?.onSelectIrStatus}
            >
              {irProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.value}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {drProps?.show ? (
            <Select
              allowClear
              placeholder="Select DR Status"
              className="select-field"
              onChange={drProps?.onSelectDrStatus}
              disabled={drProps?.disabled}
            >
              {drProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.value}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {companyProps?.show ? (
            <Select
              allowClear
              placeholder="Select Company"
              className="select-field"
              onChange={companyProps?.onSelectCompany}
              disabled={companyProps?.disabled}
            >
              {companyProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.company_name}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {artistProps?.show ? (
            <Select
              allowClear
              placeholder="Select Artist"
              className="select-field"
              onChange={artistProps?.onSelectArtist}
              disabled={artistProps?.disabled}
            >
              {artistProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.full_name}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
          {actionProps?.show ? (
            <Select
              allowClear
              placeholder="Select Action"
              className="select-field"
              onChange={actionProps?.onSelectAction}
            >
              {actionProps?.options?.map((option, index) => (
                <Option key={index} value={option?.id}>
                  {option?.action}
                </Option>
              ))}
            </Select>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="action-btns-row">
        {salesReportProps?.show ? (
          <Button
            className="download-btn"
            icon={<DollarCircleFilled />}
            disabled={salesReportProps?.isDisabled}
            onClick={() => salesReportProps?.click()}
          ></Button>
        ) : (
          <></>
        )}
        {excelProps?.show ? (
          <Button
            className="download-btn"
            icon={<DownloadOutlined />}
            onClick={() =>
              exportToCSV({
                rows: excelProps?.data,
                columns: excelProps?.headers,
                fileName: excelProps?.filename,
                dateRange: excelProps?.range,
                sheetName: excelProps?.sheetname,
              })
            }
            disabled={excelProps?.isDisabled}
          ></Button>
        ) : (
          <></>
        )}
        <Button
          className={canCreate ? "new-item-btn" : "hide-element"}
          icon={<PlusCircleFilled />}
          onClick={() => (isBene ? showModalcrud() : showModal())}
          disabled={isDisabled}
        />
        {joDashProps?.show ? (
          <Button
            className="download-btn"
            icon={<LinkOutlined />}
            onClick={() => window.open(joDashProps?.url, "_blank")}
            disabled={joDashProps?.isDisabled}
          ></Button>
        ) : (
          <></>
        )}
      </div>
    </Col>
  );
};

export default PageAction;
