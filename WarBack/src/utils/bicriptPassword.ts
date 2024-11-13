import bcrypt from 'bcrypt';



const bicriptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (!hashedPassword) {
    throw new Error('Password could not be hashed');
  }
  return hashedPassword;
};

export default bicriptPassword;