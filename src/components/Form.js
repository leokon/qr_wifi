import React from "react";

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
                    <input type="text" name="ssid" placeholder="Network SSID" value={this.state.ssid} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Network Password" value={this.state.password} onChange={this.handleChange} />
                    <select name="encryption" value={this.state.encryption} onChange={this.handleChange}>
                        <option value="WPA/WPA2">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="None">None</option>
                    </select>
                    <input className="submit" type="submit" value="Generate" />
                </form>
            </div>
        );
    }
}

module.exports = Form;