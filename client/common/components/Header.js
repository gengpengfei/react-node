import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import styles from "../scss/Common";
class Header extends Component {
    constructor(props) {
        super();
        this.loginout = this.loginout.bind(this);
    }
    loginout = () => {
        this.props.cookies.set("users", "");
        this.props.router.push("login");
    };
    render() {
        const userInfo = this.props.cookies.get("users");
        return (
            <header className={styles.header}>
                <div className={styles.left}>
                    <span className={styles.span}>
                        <Link to="/home">REACT+NODE</Link>
                    </span>
                </div>
                <div className={styles.right}>
                    <span className={styles.loginout} onClick={this.loginout}>
                        <a>退出登录</a>
                    </span>
                    <span className={styles.description}>
                        {userInfo.user_name}
                    </span>
                    <img className={styles.img} src={userInfo.head_img} />
                </div>
            </header>
        );
    }
}
function mapStateToProps(state) {
    return { userInfo: state.userInfoReducer.userInfo };
}
export default connect(mapStateToProps)(Header);
