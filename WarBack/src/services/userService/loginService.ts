import User, { IUser } from '../../models/User';
import tokenGenerator from '../../utils/tokenGenerator';
import loginDTO from '../../DTO/loginDTO';
import validatePassword from '../../utils/validatePassword';
import Missile, { IMissile } from '../../models/Missile';
import { IOrganization, Resource } from '../../models/Organization';

export interface LoginResponse {
  user: IUser;
  missiles: IMissile[];
  token: string;
}

const loginService = async (loginDTO: loginDTO): Promise<LoginResponse> => {
  try {
    if (!loginDTO.name || !loginDTO.password) {
      throw new Error('Data is missing');
    }
    const user: IUser | null = await User.findOne({
      name: loginDTO.name,
    }).populate('organization');
    console.log(user);
    if (!user) {
      throw new Error('Invalid details');
    }
    const validPassword: boolean = await validatePassword(
      loginDTO.password,
      user.password,
    );
    if (!validPassword) {
      throw new Error('Invalid details');
    }

    const token: string = tokenGenerator(user);
    user.password = '';
    const missiles: IMissile[] = [];
    for (
      let i = 0;
      i < ((user.organization as IOrganization).resources as Resource[]).length;
      i++
    ) {
      const missile: IMissile | null = await Missile.findOne({
        name: ((user.organization as IOrganization).resources as Resource[])[i]
          .name,
      });
      if (missile) {
        missiles.push(missile);
      }
    }
    const response: LoginResponse = { user, missiles, token };
    return response;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An error has occurred');
  }
};

export default loginService;
