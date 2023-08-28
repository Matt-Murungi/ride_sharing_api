import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, saltOrRounds);
};

export const checkPassword = async (
  payloadPassword,
  userPassword,
): Promise<boolean> => {
  return await bcrypt.compare(payloadPassword, userPassword);
};
