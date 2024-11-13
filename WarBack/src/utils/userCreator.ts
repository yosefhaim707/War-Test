import Organization, { IOrganization } from '../models/Organization';
import UserDTO from '../DTO/userDTO';
import User, { IUser } from '../models/User';

const userCreator = async (data: UserDTO): Promise<IUser> => {
  const organization: IOrganization | null = await Organization.findOne({
    name: data.organization,
  });
  if (!organization) {
    throw new Error('Organization not found');
  }

  const user: IUser = new User({
    name: data.name,
    password: data.password,
    organization: organization._id,
    area: data.area,
  });
  return user;
};

export default userCreator;
