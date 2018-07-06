import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Table,
  Pagination,
  message,
  Select,
  DatePicker,
  Tooltip
} from "antd";
import { addTab } from "../../../store/actions";
import { connect } from "react-redux";
import { getCorePolicyQUery, querySpecialRemark } from "../../../services/api";
import SpecialRemark from "../../tools/specialRemark";

import moment from "moment";
import "moment/locale/zh-cn";
import Ellipsis from "ant-design-pro/lib/Ellipsis";
moment.locale("zh-cn");
const { Item } = Form;
const { Option } = Select;
//核心保单查询
class HorizontalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.isdisable = true;
    this.state = {};
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.searchMethod(values);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  showCertiNo = value => {
    this.isdisable = value === "false" ? true : false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{ background: "#fff", padding: "32px 15px" }}
        className="health"
      >
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row style={{ marginBottom: "14px" }}>
            <Col md={12} xl={8} xxl={6}>
              <Item
                colon={false}
                label={<span className="wo-form-item-label">投保人姓名：</span>}
              >
                {getFieldDecorator("policyHolderName")(
                  <Input
                    placeholder="请输入投保人姓名"
                    autoComplete="policyHolderName"
                  />
                )}
              </Item>
            </Col>
            <Col md={12} xl={8} xxl={6}>
              <Item
                colon={false}
                label={
                  <span className="wo-form-item-label">投保开始时间：</span>
                }
              >
                {getFieldDecorator("insureDateStart")(
                  <DatePicker
                    showTime
                    placeholder={"投保开始时间"}
                    format={"YYYY-MM-DD HH:mm:ss"}
                  />
                )}
              </Item>
            </Col>
            <Col md={12} xl={8} xxl={6}>
              <Item
                colon={false}
                label={
                  <span className="wo-form-item-label">投保结束时间：</span>
                }
              >
                {getFieldDecorator("insureDateEnd")(
                  <DatePicker
                    showTime
                    placeholder={"投保结束时间"}
                    format={"YYYY-MM-DD HH:mm:ss"}
                  />
                )}
              </Item>
            </Col>
            <Col
              md={{ span: 12, offset: 0 }}
              xl={{ span: 8, offset: 0 }}
              xxl={{ span: 6, offset: 0 }}
            >
              <Item colon={false} className="checkbutton">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    margin: "3px 10px 3px 0px"
                  }}
                >
                  查询
                </Button>
                <Button onClick={this.handleReset}>重置</Button>
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
class CorePolicyQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      datalist: [],
      pageSize: 10,
      pageNum: 1,
      policyNo: "",
      insuredId: "",
      policyHolderName: "",
      policyHolderCertificateNo: "",
      insurantName: "",
      insurantCertificateNo: "",
      insurantPhoneNo: "",
      insuredNo: "",
      isCert: "",
      insuranceCertiNo: "",
      channelPolicyNo: "",
      insureDateStart: "",
      insureDateEnd: "",
      loading: false,
      specialData: [],
      columns: [
        {
          title: "保单号",
          dataIndex: "policyNo",
          key: "policyNo",
          width: 200,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={2}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "保单类型",
          dataIndex: "policyTypeName",
          key: "policyTypeName",
          width: 100,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "凭证号",
          dataIndex: "insuranceCertiNo",
          key: "insuranceCertiNo",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "订单号",
          dataIndex: "insuredId",
          key: "insuredId",
          width: 220,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={2}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "投保时间",
          dataIndex: "gmtCreate",
          key: "gmtCreate",
          align: "center",
          width: 150,
          render: text => (
            <Tooltip
              title={
                text
                  ? text !== "" && moment(text).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }
            >
              <Ellipsis lines={1}>
                {text
                  ? text !== "" && moment(text).format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "投保人姓名",
          dataIndex: "policyHolderName",
          key: "policyHolderName",
          align: "center",
          width: 150,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "被保人姓名",
          dataIndex: "insurantName",
          key: "insurantName",
          align: "center",
          width: 150,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "生效时间",
          dataIndex: "effectiveDate",
          key: "effectiveDate",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={
                text
                  ? text !== "" && moment(text).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }
            >
              <Ellipsis lines={1}>
                {text
                  ? text !== "" && moment(text).format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "失效时间",
          dataIndex: "expiryDate",
          key: "expiryDate",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={
                text
                  ? text !== "" && moment(text).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }
            >
              <Ellipsis lines={1}>
                {text
                  ? text !== "" && moment(text).format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "保额",
          dataIndex: "sumInsured",
          key: "sumInsured",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "保费",
          dataIndex: "premium",
          key: "premium",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "保单状态",
          dataIndex: "policyStatusName",
          key: "policyStatusName",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "营销活动",
          dataIndex: "campaignName",
          key: "campaignName",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "产品组合",
          dataIndex: "packageDefName",
          key: "packageDefName",
          align: "center",
          width: 100,
          render: text => (
            <Tooltip
              title={<div style={{ wordWrap: "break-word" }}>{text}</div>}
              placement="topLeft"
            >
              <Ellipsis lines={1}>{text}</Ellipsis>
            </Tooltip>
          )
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: 100,
          fixed: "right",
          render: (text, record) => (
            <span>
              <a
                onClick={() => {
                  this.props.dispatch(
                    addTab({
                      type: "CorePolicyQueryDetail",
                      policyNo: record.policyNo,
                      policyId: record.policyId
                    })
                  );
                }}
              >
                详情
              </a>
            </span>
          )
        }
      ]
    };
  }
  _requireCorePolicyQUery = () => {
    let { pageSize, pageNum } = this.state;
    let data = {
      policyNo: this.state.policyNo,
      insuredId: this.state.insuredId,
      policyHolderName: this.state.policyHolderName,
      policyHolderCertificateNo: this.state.policyHolderCertificateNo,
      insurantName: this.state.insurantName,
      insurantCertificateNo: this.state.insurantCertificateNo,
      insurantPhoneNo: this.state.insurantPhoneNo,
      insuredNo: this.state.insuredNo,
      isCert: this.state.isCert,
      insuranceCertiNo: this.state.insuranceCertiNo,
      channelPolicyNo: this.state.channelPolicyNo,
      insureDateStart: this.state.insureDateStart,
      insureDateEnd: this.state.insureDateEnd
    };
    getCorePolicyQUery(pageSize, pageNum, data).then(res => {
      //console.log(res);
      message.destroy();
      if (res.data.status === 200) {
        let rows = res.data.data.rows
          ? res.data.data.rows.map((item, i) => {
              item.key = i;
              return item;
            })
          : [];
        this.setState(
          {
            total: res.data.data.results,
            datalist: rows,
            loading: false
          },
          () => {
            this.state.datalist &&
              this.state.datalist.length === 0 &&
              message.warning("查询无结果", 0.8);
          }
        );

        //特殊备注
        let policyNoList = rows.map(i => {
          return i.policyNo;
        });
        if (policyNoList.length > 0) {
          let cardNo = [
            data.insurantCertificateNo,
            data.policyHolderCertificateNo
          ].filter(i => {
            return i !== "" && i;
          });
          querySpecialRemark({
            policyNoList: policyNoList,
            policyCardnoList: cardNo
          }).then(res => {
            if (res.data.status === 200 && res.data.data.length > 0) {
              let dataTime = new Date().getTime();
              let data = res.data.data.map(i => {
                i.dataTime = dataTime;
                return i;
              });
              this.setState({
                specialData: data
              });
            }
          });
        }
      } else {
        this.setState({
          datalist: [],
          loading: false,
          specialData: []
        });
      }
    });
  };
  handleFormSubmit = values => {
    let insureDateStart = "";
    let insureDateEnd = "";
    if (values.insureDateStart || values.insureDateStart != null) {
      insureDateStart = values.insureDateStart.format("YYYY-MM-DD HH:mm:ss");
    }
    if (values.insureDateEnd || values.insureDateEnd != null) {
      insureDateEnd = values.insureDateEnd.format("YYYY-MM-DD HH:mm:ss");
    }
    let isnull =
      values.policyNo ||
      values.insuredId ||
      values.policyHolderName ||
      values.policyHolderCertificateNo ||
      values.insurantName ||
      values.insurantCertificateNo ||
      values.insurantPhoneNo ||
      values.insuredNo ||
      values.insuranceCertiNo ||
      values.channelPolicyNo;
    if (!isnull) {
      message.info("请完整查询条件", 0.7);
      this.setState({
        datalist: [],
        pageNum: 1,
        total: 0
      });
      return false;
    } else {
      this.setState(
        {
          policyNo: values.policyNo,
          insuredId: values.insuredId,
          policyHolderName: values.policyHolderName,
          policyHolderCertificateNo: values.policyHolderCertificateNo,
          insurantName: values.insurantName,
          insurantCertificateNo: values.insurantCertificateNo,
          insurantPhoneNo: values.insurantPhoneNo,
          insuredNo: values.insuredNo,
          isCert: values.isCert,
          insuranceCertiNo: values.insuranceCertiNo,
          channelPolicyNo: values.channelPolicyNo,
          insureDateStart: insureDateStart,
          insureDateEnd: insureDateEnd
        },
        () => {
          this.setState(
            {
              datalist: [],
              pageNum: 1,
              total: 0,
              loading: true
            },
            () => {
              this._requireCorePolicyQUery();
            }
          );
        }
      );
    }
  };
  //显示翻页总数
  showTotal = total => {
    return `共 ${total} 条`;
  };
  //每页显示条数调整
  onShowSizeChange = (current, pageSize) => {
    this.setState(
      {
        pageNum: 1,
        pageSize: pageSize
      },
      () => {
        this._requireCorePolicyQUery();
      }
    );
  };
  //翻页
  onChange = pageNum => {
    this.setState(
      {
        pageNum: pageNum
      },
      () => {
        this._requireCorePolicyQUery();
      }
    );
  };

  render() {
    let { total, columns, datalist } = this.state;
    return (
      <div>
        <WrappedHorizontalLoginForm searchMethod={this.handleFormSubmit} />
        <div
          style={{ padding: "20px 2%", background: "#fff", marginTop: "20px" }}
        >
          <Table
            loading={this.state.loading}
            dataSource={datalist}
            columns={columns}
            pagination={false}
            rowKey="key"
            scroll={{ x: 1870 }}
          />
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Pagination
              total={total}
              showTotal={this.showTotal}
              showSizeChanger
              showQuickJumper
              current={this.state.pageNum}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onChange}
            />
          </div>
        </div>
        <SpecialRemark specialData={this.state.specialData} />
      </div>
    );
  }
}

export default connect()(CorePolicyQuery);
