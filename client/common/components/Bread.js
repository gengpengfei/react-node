import React, { Component } from "react";
import { Breadcrumb, Icon, Row, Col } from "antd";
import styles from "../scss/Common";
class Bread extends Component {
    constructor(props) {
        super(props);
    }
    itemRender = (route, params, routes, paths) => {
        return <span>{route.breadcrumbName}</span>;
    };
    render() {
        return (
            <div className={styles.bread}>
                <Breadcrumb
                    routes={this.props.routes}
                    itemRender={this.itemRender}
                />
            </div>
        );
    }
}
export default Bread;
