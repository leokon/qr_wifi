import React from "react";
import {SwitchTransition, CSSTransition} from "react-transition-group";

class Branding extends React.Component {
    render() {
        return (
            <div className="branding">
                <div className="branding-name">
                    <a href="./">qr_wifi</a>
                </div>

                <CSSTransition in={!this.props.showQR} timeout={1200} classNames="fade">
                    <div className="branding-text">Give anyone quick & easy wifi access with a QR code</div>
                </CSSTransition>

                <CSSTransition in={this.props.showQR} timeout={1200} classNames="fade">
                    <div className="canvas-container">
                        <canvas id="qr-canvas"></canvas>
                        <div className="buttons">
                            <button className="print-button" onClick={() => window.print()}>Print</button>
                            <a className="save-button-wrapper" href={this.props.dataURL} download="qr_wifi.png">
                                <button className="save-button">Save</button>
                            </a>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

module.exports = Branding;