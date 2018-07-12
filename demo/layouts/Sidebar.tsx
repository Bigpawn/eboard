import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./Sidebar.less";

interface ISidebarState {
    collapsed: boolean;
    mode: "vertical" | "inline" | "horizontal" | undefined;
}

class Sidebar extends React.Component<{}, ISidebarState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            collapsed: false,
            mode: "inline",
        };
    }

    public render(): JSX.Element {
        return (
            <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>
                <div className="ant-layout-logo" />
                <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                        <Link to="/pager">
                            <Icon type="edit" />
                            <span className="nav-text">Pager Canvas</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/simple">
                            <Icon type="home" />
                            <span className="nav-text">Simple Canvas</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/html">
                            <Icon type="check-square-o" />
                            <span className="nav-text">HTMLCanvas</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/image">
                            <Icon type="file" />
                            <span className="nav-text">ImageCanvas</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/materialui">
                            <Icon type="edit" />
                            <span className="nav-text">MaterialUI</span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <div className="sider-trigger">
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}/>
                </div>
            </Layout.Sider>
        );
    }

    private toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: !this.state.collapsed ? "vertical" : "inline",
        });
    }
}

export default Sidebar;
