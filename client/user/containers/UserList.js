import React, { Component } from "react";
import {
    Breadcrumb,
    Icon,
    Pagination,
    message,
    Table,
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    Button
} from "antd";
import { Link } from "react-router";
import Bread from "../../common/components/Bread";
import styles from "../sass/App";
import utils from "../../shared/utils";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { Item } = Form;
class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("search-value", values);
                this.props.searchMethod(values);
            }
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ background: "#fff", marginBottom: "15px" }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={12} xl={8} xxl={6}>
                            <Item colon={false} label={<span>用户姓名：</span>}>
                                {getFieldDecorator("user_name")(
                                    <Input
                                        placeholder="请输入用户姓名"
                                        autoComplete="user_name"
                                    />
                                )}
                            </Item>
                        </Col>
                        <Col md={12} xl={8} xxl={6}>
                            <Item
                                colon={false}
                                label={<span>投保开始时间：</span>}
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
                                label={<span>投保结束时间：</span>}
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
const WrappedSearchForm = Form.create()(SearchForm);

class UserList extends Component {
    constructor(props) {
        super();
        this.state = {
            userList: [],
            columns: [
                {
                    align: "center"
                }, //-- 列对齐方式
                {
                    title: "是否启用",
                    dataIndex: "disabled",
                    key: "disabled",
                    filters: [
                        {
                            text: "启用",
                            value: "1"
                        },
                        {
                            text: "冻结",
                            value: "0"
                        }
                    ],
                    onFilter: (value, record) =>
                        record.name.indexOf(value) === 0,
                    sorter: (a, b) => a.name.length - b.name.length
                },
                {
                    title: "用户姓名",
                    dataIndex: "user_name",
                    defaultSortOrder: "descend", //-- 设置列的默认排序
                    onFilter: (value, record) =>
                        record.user_name.indexOf(value) === 0,
                    sorter: (a, b) => a.user_name.length - b.user_name.length
                },
                {
                    title: "手机号",
                    dataIndex: "mobile"
                }
            ]
        };
        this.getUserList = this.getUserList.bind(this);
    }
    componentWillMount() {
        this.getUserList();
    }
    getUserList(page, limit) {
        const data = {
            page: page ? page : 1,
            limit: limit ? limit : 10
        };
        utils
            .ajax({
                url: "userList",
                data: data
            })
            .then(res => {
                if (res.code == "1") {
                    this.setState({ userList: res.data });
                } else {
                    message.error(res.mes, 3);
                }
            });
    }

    onChange = (pagination, filters, sorter) => {
        console.log("params", pagination, filters, sorter);
    };
    render() {
        return (
            <div className={styles.app}>
                <Bread routes={this.props.routes} />
                <div className={styles.main}>
                    <WrappedSearchForm searchMethod={() => {}} />
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.userList}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}

export default UserList;
