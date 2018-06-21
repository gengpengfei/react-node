import React, { Component } from "react";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
class Welcome extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const userInfo = this.props.cookies.get("users");
        if (userInfo == null) {
            //-- 跳转到登录页
            this.props.router.push("login");
        } else {
            //-- 跳转到后台首页
            this.props.router.push("home");
        }
    }
    render() {
        return (
            <div>
                <h1>欢迎使用node+koa项目</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { userInfo: state.userInfoReducer.userInfo };
}

export default connect(mapStateToProps)(withCookies(Welcome));
