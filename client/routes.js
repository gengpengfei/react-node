// Hook for server
if (typeof require.ensure !== "function") {
    require.ensure = function(dependencies, callback) {
        callback(require);
    };
}
//-- 由于antd 的原因, 按需加载不能编译公共css
const routes = [
    {
        path: "/",
        component: require("./common/containers/Root")
    },
    {
        path: "login",
        component: require("./common/containers/Login"),
        getComponent(nextState, callback) {
            require.ensure(
                [],
                require => {
                    callback(null, require("./common/containers/Login"));
                },
                "login"
            );
        }
    },
    {
        path: "/home",
        component: require("./common/containers/Common"),
        breadcrumbName: "REACT+NODE首页",
        indexRoute: {
            getComponent(nextState, callback) {
                require.ensure(
                    [],
                    require => {
                        callback(null, require("./home/containers/App"));
                    },
                    "home"
                );
            }
        },
        childRoutes: [
            {
                path: "/explore",
                component: require("./explore/containers/App"),
                breadcrumbName: "列表",
                getComponent(nextState, callback) {
                    require.ensure(
                        [],
                        require => {
                            callback(null, require("./explore/containers/App"));
                        },
                        "explore"
                    );
                },
                childRoutes: [
                    {
                        path: "/explore/:id",
                        component: require("./explore/containers/App"),
                        breadcrumbName: "详情",
                        getComponent(nextState, callback) {
                            require.ensure(
                                [],
                                require => {
                                    callback(
                                        null,
                                        require("./explore/containers/App")
                                    );
                                },
                                "explore/info"
                            );
                        }
                    },
                    {
                        path: "/explore/:id/detail",
                        component: require("./explore/containers/App"),
                        breadcrumbName: "编辑",
                        getComponent(nextState, callback) {
                            require.ensure(
                                [],
                                require => {
                                    callback(
                                        null,
                                        require("./explore/containers/App")
                                    );
                                },
                                "explore/edit"
                            );
                        }
                    }
                ]
            },
            {
                path: "/about",
                component: require("./about/containers/App"),
                getComponent(nextState, callback) {
                    require.ensure(
                        [],
                        require => {
                            callback(null, require("./about/containers/App"));
                        },
                        "about"
                    );
                }
            }
        ]
    }
];

export default routes;
