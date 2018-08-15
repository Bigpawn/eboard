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
            collapsed: true,
            mode: "inline",
        };
    }

    public render(): JSX.Element {
        const defaultSelectedKeys = /^#\/html/.test(location.hash)?"3":/^#\/simple/.test(location.hash)?"2":/^#\/image/.test(location.hash)?"4":/^#\/pdf/.test(location.hash)?"5":/^#\/pager/.test(location.hash)?"1":"2";
        return (
            <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>
                <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={[defaultSelectedKeys]}>
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
                        <Link to="/pdf">
                            <Icon type="edit" />
                            <span className="nav-text">PdfCanvas</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/mix">
                            <Icon type="edit" />
                            <span className="nav-text">MixCanvas</span>
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
