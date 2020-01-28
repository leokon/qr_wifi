import React from "react";
import {SwitchTransition, CSSTransition} from "react-transition-group";

class Branding extends React.Component {
    render() {
        return (
            <div className="branding">
                <div className="branding-name">
                    <a href="/">qr_wifi</a>
                </div>

                <CSSTransition in={!this.props.showQR} timeout={1200} classNames="fade">
                    <div className="branding-text">Give anyone wifi access with just a QR code</div>
                </CSSTransition>
                <CSSTransition in={this.props.showQR} timeout={1200} classNames="fade">
                    <div className="canvas-container">
                        <canvas id="qr-canvas" height="256px" width="256px"></canvas>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

module.exports = Branding;