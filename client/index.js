import React from "react";
import { render } from "react-dom";
import { Router, match, browserHistory } from "react-router";
import { Provider } from "react-redux";
import routes from "./routes";
import configureStore from "./common/store/configureStore";
import { CookiesProvider } from "react-cookie";
const store = configureStore(window.REDUX_STATE);

match(
    { history: browserHistory, routes },
    (error, redirectLocation, renderProps) => {
        render(
            <Provider store={store}>
                <CookiesProvider>
                    <Router {...renderProps} />
                </CookiesProvider>
            </Provider>,
            document.getElementById("root")
        );
    }
);
