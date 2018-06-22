import React, { Component } from "react";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Row, Col, Divider } from "antd";
class Welcome extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.props = this.props.bind(this);
    }

    check = () => {
        const userInfo = this.props.cookies.get("users");
        if (userInfo == null) {
            //-- 跳转到登录页
            this.props.router.push("login");
        } else {
            //-- 跳转到后台首页
            this.props.router.push("home");
        }
    };
    render() {
        return (
            <div
                style={{
                    width: "20%",
                    fontFamily: "microsoft yahei ui",
                    margin: "0 auto",
                    marginTop: "15%",
                    fontSize: 30,
                    fontWeight: 2
                }}
            >
                <Row type="flex" justify="space-around" align="top">
                    <Col>REACT</Col>
                    <Col>+</Col>
                    <Col>NODE</Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: "15%" }}>
                    <Col style={{ fontSize: 16 }} onClick={this.check}>
                        -----> <a>欢迎使用</a>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { userInfo: state.userInfoReducer.userInfo };
}

export default connect(mapStateToProps)(withCookies(Welcome));
