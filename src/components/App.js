import React from "react";
import Branding from "./Branding.js";
import Form from "./Form.js";
import PrintableQR from "./PrintableQR.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showQR: false,
            ssid: "",
            password: "",
            encryption: ""
        };

        this.handleUpdateQR = this.handleUpdateQR.bind(this);
    }

    handleUpdateQR(ssid, password, encryption) {
        this.setState({
            showQR: true,
            ssid: ssid,
            password: password,
            encryption: encryption
        });
    }

    render() {
        return (
            <div className="wrapper">
                <Branding showQR={this.state.showQR} />
                <Form handleUpdateQR={this.handleUpdateQR} />
                <PrintableQR ssid={this.state.ssid} password={this.state.password} />
            </div>
        );
    }
}

module.exports = App;