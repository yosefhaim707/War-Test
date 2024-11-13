import bcrypt from 'bcrypt';




const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  return isPasswordValid;
};

export default validatePassword;