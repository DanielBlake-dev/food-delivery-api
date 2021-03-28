import { UserRoles } from '../interfaces/user-role.enum';

export class CreateUserDTO {
  username: string;

  password: string;

  firstName: string;

  lastName: string;

  role: UserRoles;
}
