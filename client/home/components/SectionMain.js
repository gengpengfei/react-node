import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "../sass/SectionMain";

class SectionMain extends Component {
    constructor(props) {
        super();
    }
    componentWillMount() {
        console.log(this.props, "22222222222");
    }
    render() {
        return (
            <section className={styles.sectionMain}>
                <Row>
                    <Col>
                        <h2>欢迎使用新零售管理后台</h2>
                    </Col>
                    <Col>上次登录IP:139.0.0.1 上次登录时间:2018-10-11</Col>
                </Row>
                <div className={styles.tableHeader}>订单信息统计</div>
                <div className={styles.order}>
                    <div>商城统计</div>
                    <div>今日订单数 :</div>
                    <div>今日订单总额 :</div>
                    <div>昨日订单数 :</div>
                    <div>昨日订单总额 :</div>
                    <div>店铺统计 :</div>
                    <div>今日订单数 :</div>
                    <div>今日订单总额 :</div>
                    <div>昨日订单数 :</div>
                    <div>昨日订单总额 :</div>
                </div>
                <div className={styles.tableHeader}>待处理事物</div>
                <div className={styles.order}>
                    <div>审核店铺:</div>
                    <div>审核资质:</div>
                    <div>审核评论:</div>
                    <div>退货申请:</div>
                    <div>账单退款:</div>
                </div>
            </section>
        );
    }
}

export default SectionMain;
