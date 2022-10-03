import { User } from "../../models";

import guard from "./baseAuth";

const name: string = "jwt";
export default guard(User, name);
