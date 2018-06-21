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
        super(props);
    }
    componentDidMount() {
        const userInfo = this.props.cookies.get("users");
        if (userInfo === null || userInfo === "" || userInfo === undefined) {
            this.props.router.push("login");
        }
        console.log(
            'Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.'
        );
    }
    render() {
        const { children, ...props } = this.props;
        return (
            <div className={styles.app}>
                <Header {...this.props} />
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

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(withCookies(Common));
