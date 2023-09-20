import { SHA256 as sha256 } from "crypto-js";

const hasPassword = (string: string) => sha256(string).toString();

export default hasPassword;
