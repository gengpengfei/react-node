import React, { Component } from "react";
import { Breadcrumb, Icon } from "antd";
import { Link } from "react-router";
import Bread from "../../common/components/Bread";
import styles from "../sass/App";
import { ajax } from "../../shared/utils";
class UserList extends Component {
    constructor(props) {
        super();
        this.getUserList = this.getUserList.bind(this);
    }
    componentWillMount() {
        this.getUserList();
    }
    getUserList() {
        const data = {};
        ajax({ url: "userList", data: data }).then(res => {
            console.log(res, "111111111111");
        });
    }
    render() {
        return (
            <div className={styles.app}>
                <Bread routes={this.props.routes} />
                <div className={styles.main}>123</div>
            </div>
        );
    }
}

export default UserList;
