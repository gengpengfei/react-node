import React, { Component } from "react";
import styles from "../sass/SectionMain";

class SectionMain extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section className={styles.sectionMain}>
                <div style={{ margin: "200px" }}>about</div>
            </section>
        );
    }
}

export default SectionMain;
