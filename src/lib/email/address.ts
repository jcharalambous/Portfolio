/*
 * The contact address is never written whole anywhere the server sends out,
 * nor in the JavaScript: the bundler folds simple joins into one string, so
 * each half is stored back to front and turned around at run time. Scrapers
 * reading the page source or the scripts do not find it. Humans see it as before.
 */
const backwards = ["ssenisub", "krowten.suobmalarahc"];

const turn = (s: string) => s.split("").reverse().join("");

export function emailAddress(): string {
  return backwards.map(turn).join("@");
}

export function mailto(): string {
  return `mailto:${emailAddress()}`;
}
