import { Sequelize } from "sequelize";

import { DATABASE, PASSWORD } from "../config";

const connectToDb = () => {
  try {
    const user: string = "postgres";
    const password: string = PASSWORD;
    const port: number = 5432;
    return new Sequelize(DATABASE, user, password, {
      host: "localhost",
      port,
      dialect: "postgres",
      logging: true,
    });
  } catch (error: any) {
    //Throw so that the other parts don't continue to function if we are not
    //connected to the database.
    throw new Error(error);
  }
};

export default connectToDb();
