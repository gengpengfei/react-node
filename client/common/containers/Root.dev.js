import React, { Component } from "react";
import DevTools from "./DevTools";
import Welcome from "./Welcome";

class Root extends Component {
    constructor() {
        super();
        this.state = { isMounted: false };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
        console.log(
            'Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.'
        );
    }

    render() {
        const { isMounted } = this.state;
        const { children } = this.props;
        return (
            <div>
                <Welcome {...this.props} />
                {isMounted && <DevTools />}
            </div>
        );
    }
}

export default Root;
