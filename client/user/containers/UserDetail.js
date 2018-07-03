import React, { Component } from "react";
import { Breadcrumb, Icon } from "antd";
import { Link } from "react-router";
import Bread from "../../common/components/Bread";
import styles from "../sass/App";

class UserDetail extends Component {
    constructor(props) {
        super();
    }
    componentWillMount(){
        
    }
    getUserList = ()=>{
        this.props.dispatch        
    }
    render() {
        return (
            <div className={styles.app}>
                <Bread routes={this.props.routes} />
                <div className={styles.main} />
            </div>
        );
    }
}

export default UserDetail;
