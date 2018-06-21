import React, { Component } from "react";
import { connect } from "react-redux";
import { userInfoAction } from "../actions/userAction";
import md5 from "crypto-js/md5";
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from "antd";
const FormItem = Form.Item;
import utils from "../../shared/utils";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
class Logins extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //-- 提交验证
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.password = md5(md5(values.password)).toString();
                console.log("checkUserLogin-param:", values);
                utils
                    .ajax({
                        url: "/api/user/checkUserLogin",
                        type: "post",
                        data: values
                    })
                    .then(res => {
                        if (res.code == "1") {
                            console.log("checkUserLogin-res:", res.data);
                            this.props.dispatch(
                                userInfoAction("GET_USER_INFO", res.data)
                            );
                            this.props.cookies.set("users", res.data);
                            this.props.router.push("home");
                            message.success("登录成功", 3);
                        } else {
                            message.error(res.mes, 3);
                        }
                    });
            } else {
                message.error(err, 3);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col lg={{ span: 4, offset: 10 }} style={{ marginTop: "20%" }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator("userName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入您的账户!"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{
                                                color: "rgba(0,0,0,.25)"
                                            }}
                                        />
                                    }
                                    placeholder="Username"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入您的密码!"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{
                                                color: "rgba(0,0,0,.25)"
                                            }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Row type="flex" justify="space-between">
                                <Col>
                                    {getFieldDecorator("remember", {
                                        valuePropName: "checked",
                                        initialValue: true
                                    })(<Checkbox>记住我</Checkbox>)}
                                </Col>
                                <Col>
                                    <a className="login-form-forgot" href="">
                                        忘记密码?
                                    </a>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-around">
                                <Col>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        登录
                                    </Button>
                                </Col>
                                <Col>
                                    <Button className="login-form-button">
                                        注册
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const Login = Form.create()(Logins);

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(withCookies(Login));
