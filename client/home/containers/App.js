import React, { Component } from "react";
import SectionMain from "../components/SectionMain";
import Bread from "../../common/components/Bread";
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Bread routes={this.props.routes} />
                <SectionMain {...this.props} />
            </div>
        );
    }
}
export default App;
