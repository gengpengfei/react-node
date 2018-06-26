import React, { Children, Component, cloneElement } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import styles from "../scss/Common";
import "../scss/Global";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
//-- 状态的可视化管理
import DevTools from "./DevTools";
class Common extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super();
    }
    componentWillMount() {
        console.log(
            'Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.'
        );
    }
    checkLogin(userInfo) {
        if (
            userInfo == null ||
            userInfo == "" ||
            userInfo == undefined ||
            userInfo == {}
        ) {
            this.props.router.push("login");
        }
    }
    loginout = () => {
        this.props.cookies.set("users", "");
        this.props.router.push("login");
    };
    render() {
        const userInfo = this.props.cookies.get("users");
        this.checkLogin(userInfo);
        const { children, ...props } = this.props;
        console.log(this.props, "1111111111111111");
        return (
            <div className={styles.app}>
                <Header {...userInfo} loginout={this.loginout} />
                <Navbar />
                <Main>
                    {Children.map(children, child =>
                        cloneElement(child, { ...props })
                    )}
                </Main>
                <DevTools />
            </div>
        );
    }
}

export default withCookies(Common);
