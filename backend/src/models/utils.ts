import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 12;

const hashPassword = async (plain: string) => {
  return await bcrypt.hash(plain, SALT_ROUNDS);
};
const confirmPassword = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};

export { hashPassword, confirmPassword };
