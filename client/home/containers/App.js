import React, { Component } from "react";
import SectionMain from "../components/SectionMain";
import Bread from "../../common/components/Bread";
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { actions } = this.props;
        return (
            <div>
                <Bread routes={this.props.routes} />
                <SectionMain actions={actions} />
            </div>
        );
    }
}

export default App;
