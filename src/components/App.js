import React from "react";
import Branding from "./Branding.js";
import Form from "./Form.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showQR: false
        };

        this.handleShowQR = this.handleShowQR.bind(this);
    }

    handleShowQR(value) {
        this.setState({showQR: value});
    }

    render() {
        return (
            <div className="wrapper">
                <Branding showQR={this.state.showQR} />
                <Form handleShowQR={this.handleShowQR} />
            </div>
        );
    }
}

module.exports = App;