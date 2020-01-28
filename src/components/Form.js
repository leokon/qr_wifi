import React from "react";
import ReactTooltip from "react-tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ssid: "",
            password: "",
            encryption: "WPA/WPA2"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log("SSID: " + this.state.ssid);
        console.log("password: " + this.state.password);
        console.log("encryption: " + this.state.encryption);
        event.preventDefault();
    }

    render () {
        return (
            <div className="form-wrapper">
                <div className="form-header">Generate a QR code</div>

                <form onSubmit={this.handleSubmit}>
                    <div className="input-wrapper">
                        <input type="text" name="ssid" placeholder="Network SSID" value={this.state.ssid} onChange={this.handleChange} />
                        <FontAwesomeIcon icon={faQuestionCircle} data-tip="The name you use to connect to your wifi network." />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" name="password" placeholder="Network Password" value={this.state.password} onChange={this.handleChange} />
                        <FontAwesomeIcon icon={faQuestionCircle} data-tip="The password you use to connect to your wifi network." />
                    </div>
                    <div className="input-wrapper">
                        <select name="encryption" value={this.state.encryption} onChange={this.handleChange}>
                            <option value="WPA/WPA2">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="None">None</option>
                        </select>
                        <FontAwesomeIcon icon={faQuestionCircle} data-tip="The type of encryption your wifi network uses. <br /> If you're not sure, leave the default!" />
                    </div>
                    <input className="submit" type="submit" value="Generate" />
                </form>

                <ReactTooltip place="right" effect="solid" multiline={true} />
            </div>
        );
    }
}

module.exports = Form;