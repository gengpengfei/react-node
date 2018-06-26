import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import styles from "../scss/Common";
import header from "../static/avatar.png";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: props.user_name,
            head_img: props.head_img
        };
    }
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.left}>
                    <span className={styles.span}>
                        <Link to="/home">REACT+NODE</Link>
                    </span>
                </div>
                <div className={styles.right}>
                    <span
                        className={styles.loginout}
                        onClick={this.props.loginout}
                    >
                        <a>退出登录</a>
                    </span>
                    <span className={styles.description}>
                        {this.state.user_name}
                    </span>
                    <img
                        className={styles.img}
                        src={this.state.head_img ? this.state.head_img : header}
                    />
                </div>
            </header>
        );
    }
}
export default Header;
