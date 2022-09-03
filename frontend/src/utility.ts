import { SITE_NAME } from "./constants";

export function setPageTitle(pagePrefix: string): void {
    document.title = `${pagePrefix} | ${SITE_NAME}`;
}

export function stringValueIsValid(val: string): boolean {
    return !!val;
}
export function emailIsValid(val: string): boolean {
    return stringValueIsValid(val) && /(uts\.edu\.au)/gm.test(val);
}
// TODO add more password strength checks here
export function passwordIsValid(val: string): boolean {
    return stringValueIsValid(val) && val.length >= 8 && val.length <= 64;
}
