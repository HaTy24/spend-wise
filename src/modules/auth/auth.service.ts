import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ERR_CODE } from 'src/constants';
import { OperationResult } from 'src/interfaces';
import { UserService } from '../user/user.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  protected logger = new Logger(AuthService.name);
  constructor(protected userService: UserService) {}

  public async register(data: RegisterDTO): Promise<OperationResult> {
    try {
      const checkUniqueUserResult = await this.checkUniqueUser(data);
      if (!checkUniqueUserResult.success) {
        return checkUniqueUserResult;
      }
      const passwordHashed = await bcrypt.hash(data.password, 10);

      const newUser = await this.userService.save({
        email: data.email,
        username: data.username,
        password: passwordHashed,
      });

      return { success: true, data: newUser };
    } catch (error) {
      this.logger.error(error.message, error.stack);

      return { success: false };
    }
  }

  public async login(data: LoginDTO): Promise<OperationResult> {
    try {
      const user = await this.userService.findOne({ username: data.username });
      if (!user) {
        return {
          success: false,
          message: 'user not found',
          code: ERR_CODE.NOT_FOUND,
        };
      }

      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'password incorrect',
          code: ERR_CODE.UNAUTHORIZED,
        };
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);

      return { success: false };
    }
  }

  private async checkUniqueUser(data: {
    username: string;
    email: string;
  }): Promise<OperationResult> {
    if (data.username) {
      const foundUserWithUsername = await this.userService.findOne({
        username: data.username,
      });

      if (foundUserWithUsername) {
        return {
          success: false,
          message: 'username already exists',
          code: ERR_CODE.USERNAME_ALREADY_EXISTS,
        };
      }
    }
    if (data.email) {
      const foundUserWithEmail = await this.userService.findOne({
        email: data.email,
      });

      if (foundUserWithEmail) {
        return {
          success: false,
          message: 'email already exists',
          code: ERR_CODE.EMAIL_ALREADY_EXISTS,
        };
      }
    }

    return { success: true };
  }
}
