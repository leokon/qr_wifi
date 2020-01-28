import React from "react";
import Branding from "./Branding.js";
import Form from "./Form.js";

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Branding />
                <Form />
            </div>
        );
    }
}

module.exports = App;