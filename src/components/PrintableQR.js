import React from "react";

/**
 * Printable QR code layout.
 * Relies on CSS print media queries to be displayed fullscreen only when user attempts to print the page.
 */
class PrintableQR extends React.Component {
    render() {
        return (
            <div className="print-container">
                <canvas id="qr-canvas-print"></canvas>
                <div className="print-ssid">
                    <b>SSID:</b>
                    <div>{this.props.ssid}</div>
                </div>
                {this.props.password.length > 0 &&
                    <div className="print-password">
                        <b>Password:</b>
                        <div>{this.props.password}</div>
                    </div>
                }
            </div>
        );
    }
}

module.exports = PrintableQR;