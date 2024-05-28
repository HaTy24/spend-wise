import { Module } from '@nestjs/common';
import { GlobalModule } from 'src/global.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, GlobalModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
