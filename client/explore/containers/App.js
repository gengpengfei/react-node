import React, { Component } from "react";
import { Breadcrumb, Icon } from "antd";
import { Link } from "react-router";
import SectionMain from "../components/SectionMain";
import Bread from "../../common/components/Bread";
import styles from "../sass/App";

class App extends Component {
    constructor(props) {
        super();
    }
    render() {
        const { userInfo, actions } = this.props;

        return (
            <div className={styles.app}>
                <Bread routes={this.props.routes} />
                <SectionMain userInfo={userInfo} actions={actions} />
            </div>
        );
    }
}

export default App;
