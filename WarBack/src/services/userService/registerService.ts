import User, { IUser } from '../../models/User';
import UserDTO from '../../DTO/userDTO';
import userCreator from '../../utils/userCreator';


const registerService = async (data: UserDTO): Promise<IUser>  => {
  const user: IUser = await  userCreator(data);

  if (!user) {
    throw new Error('User is required');
  }
  return await user.save();
};

export default registerService;