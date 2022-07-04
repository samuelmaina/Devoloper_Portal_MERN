import mongoose from "mongoose";

import Base from "./Auth";
export default Base.discriminator("user", new mongoose.Schema({}));
