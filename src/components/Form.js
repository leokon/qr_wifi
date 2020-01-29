import React from "react";
import ReactTooltip from "react-tooltip";
import QRCode from "qrcode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ssid: "",
            password: "",
            encryption: "WPA/WPA2",
            showPassword: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
    }

    toggleShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Build QR code wifi connection string and generate QR code image
            // https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
        let encryptionString = "";
        if (this.state.encryption === "WPA/WPA2") {
            encryptionString = "WPA";
        } else if (this.state.encryption === "WEP") {
            encryptionString = "WEP";
        }
        let ssidString = this.state.ssid.replace(/[\\"';:,]/g, "\\$&");
        let passwordString = this.state.password.replace(/[\\"';:,]/g, "\\$&");

        let qrString = "WIFI:T:" + encryptionString + ";S:" + ssidString;
        if (passwordString.length > 0) {
            qrString += ";P:" + passwordString + ";;";
        } else {
            qrString += ";;";
        }

        // Draw to on-page canvas
        QRCode.toCanvas(document.getElementById("qr-canvas"), qrString, {
            errorCorrectionLevel: "H",
            width: 256
        });

        // Draw to printable canvas
        QRCode.toCanvas(document.getElementById("qr-canvas-print"), qrString, {
            errorCorrectionLevel: "H",
            width: 512
        });

        // Generate DataURL for download as image and update parent state in callback
        QRCode.toDataURL(qrString, {
            errorCorrectionLevel: "H",
            type: "image/png"
        }, (err, url) => {
            this.props.handleUpdateQR(this.state.ssid, this.state.password, this.state.encryption, url);
        });
    }

    render () {
        return (
            <div className="form-wrapper">
                <div className="form-header">Generate a QR code</div>

                <form onSubmit={this.handleSubmit}>
                    <div className="input-wrapper">
                        <input type="text" name="ssid" placeholder="SSID" value={this.state.ssid} onChange={this.handleChange} required maxLength="32" />
                        <FontAwesomeIcon icon={faQuestionCircle} data-tip="The name of your wifi network." />
                    </div>
                    <div className="input-wrapper">
                        <div className="input-wrapper-inner">
                            <input type={this.state.showPassword ? "text" : "password"} name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            {this.state.showPassword ? (
                                <FontAwesomeIcon icon={faEyeSlash} className="password-toggle" onClick={this.toggleShowPassword} />
                            ) : (
                                <FontAwesomeIcon icon={faEye} className="password-toggle" onClick={this.toggleShowPassword} />
                            )}
                        </div>
                        <FontAwesomeIcon icon={faQuestionCircle} data-tip="The password you use to connect to your wifi network." />
                    </div>
                    <div className="input-wrapper">
                        <select name="encryption" value={this.state.encryption} onChange={this.handleChange}>
                            <option value="WPA/WPA2">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="None">None</option>
                        </select>
                        <FontAwesomeIcon icon={faQuestionCircle} data-tip="The type of encryption your wifi network uses. <br /> If you're not sure, don't touch!" />
                    </div>
                    <input className="submit" type="submit" value="Generate" />
                </form>

                <ReactTooltip place="top" effect="solid" multiline={true} />
            </div>
        );
    }
}

module.exports = Form;