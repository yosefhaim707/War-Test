

interface UserDTO {
  name: string;
  password: string;
  organization: string;
  area?: 'north' | 'south' | 'east' | 'west';
}

export default UserDTO;