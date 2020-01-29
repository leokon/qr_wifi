import {parseQRCode} from "./parser";

test("parses valid input into a wifi connection string", () => {
    expect(parseQRCode("foo", "bar", "WEP")).toBe("WIFI:T:WEP;S:foo;P:bar;;");
});

test("handles an empty password string silently", () => {
    expect(parseQRCode("foo", "", "WEP")).toBe("WIFI:T:WEP;S:foo;;");
});

test("errors on an empty encryption string", () => {
    expect(() => {parseQRCode("foo", "bar", "")}).toThrow();
});

test("errors on an invalid encryption string", () => {
    expect(() => {parseQRCode("foo", "bar", "baz")}).toThrow();
});

test("errors on an empty ssid string", () => {
    expect(() => {parseQRCode("", "bar", "WEP")}).toThrow();
});

test("errors on an ssid string over 32 characters long", () => {
    expect(() => {parseQRCode("", "bar", "thisisaverylongstringthathappenstobeover32characterslong")}).toThrow();
});

test("escapes special characters", () => {
    expect(parseQRCode('"foo;bar\\baz"', "pass", "WEP")).toMatch(/WIFI:T:WEP;S:\\"foo\\;bar\\\\baz\\";P:pass;;/);
});

test("encodes WPA2 encryption properly", () => {
    expect(parseQRCode("foo", "bar", "WPA/WPA2")).toBe("WIFI:T:WPA;S:foo;P:bar;;");
});