/**
 * Parses given parameters to generate the wifi connection string to be encoded as a QR code.
 * https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
 */
export function parseQRCode(ssid, password, encryption) {
    let encryptionString = "";
    if (encryption === "WPA/WPA2") {
        encryptionString = "WPA";
    } else if (encryption === "WEP") {
        encryptionString = "WEP";
    } else {
        throw new Error("Invalid encryption string.");
    }

    if (ssid.length === 0 || ssid.length > 32) {
        throw new Error("Invalid SSID string.");
    }

    // Escape necessary characters
    let ssidString = ssid.replace(/[\\"';:,]/g, "\\$&");
    let passwordString = password.replace(/[\\"';:,]/g, "\\$&");

    let qrString = "WIFI:T:" + encryptionString + ";S:" + ssidString;
    if (password.length > 0) {
        qrString += ";P:" + passwordString + ";;";
    } else {
        qrString += ";;";
    }

    return qrString;
}