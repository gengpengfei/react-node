import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "../sass/SectionMain";

class SectionMain extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <section className={styles.sectionMain}>
                <Row>
                    <Col>
                        <h2>欢迎使用新零售管理后台</h2>
                    </Col>
                    <Col>上次登录IP:139.0.0.1,上次登录时间:2018-10-11</Col>
                </Row>
                <div className={styles.tableHeader}>订单信息统计</div>
                <div className={styles.orderRow}>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                </div>
                <div className={styles.tableHeader}>待处理事物</div>
                <div className={styles.orderRow}>
                    <div>1</div>
                    <div>2</div>
                </div>
            </section>
        );
    }
}

export default SectionMain;
