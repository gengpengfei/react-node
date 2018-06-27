import React, { Component } from "react";
import styles from "../scss/Common";

class Main extends Component {
    constructor() {
        super();
    }

    render() {
        const { children } = this.props;
        return <main className={styles.main}>{children}</main>;
    }
}

export default Main;
