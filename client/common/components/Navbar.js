import React, { Component } from "react";
import { IndexLink, Link } from "react-router";
import { Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;
class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    rootSubmenuKeys = ["sub1", "sub2"];
    state = {
        openKeys: ["sub1"]
    };
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };
    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: "12%", float: "left" }}
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="shop" />
                            <span>店铺管理</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">
                        <Link to="explore">店铺列表</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="shared">店铺评价列表</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="user" />
                            <span>会员管理</span>
                        </span>
                    }
                >
                    <Menu.Item key="7">会员列表</Menu.Item>
                    <Menu.Item key="8">会员等级</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default Navbar;
