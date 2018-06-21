import React, { Component } from "react";
import styles from "../sass/SectionMain";

class SectionMain extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section className={styles.sectionMain}>
                <div style={{ margin: "200px" }}>首页</div>
            </section>
        );
    }
}

export default SectionMain;
