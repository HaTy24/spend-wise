import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ENV_KEY } from './constants';

const JwtModuleProvider = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const secret = configService.getOrThrow(ENV_KEY.JWT_SECRET);

    return {
      secret,
      signOptions: {
        expiresIn: configService.get(ENV_KEY.JWT_EXPIRATION, '24h'),
      },
    };
  },
});

@Global()
@Module({
  exports: [JwtModuleProvider],
  imports: [JwtModuleProvider],
})
export class GlobalModule {}
