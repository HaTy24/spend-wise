import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { OperationResult } from 'src/interfaces'
import { User, extractPublicUserInfo } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { LoginDTO, RegisterDTO } from './dto/auth.dto'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RequestUser } from 'src/common/decorators/request-user'
import { AuthGuard } from './auth.guard'

@ApiTags('user/authentication')
@Controller('auth')
export class AuthController {
  constructor(
    protected authService: AuthService,
    protected jwtService: JwtService,
    protected userService: UserService,
    protected configService: ConfigService
  ) {}

  @Post('register')
  public async register(@Body() dto: RegisterDTO): Promise<OperationResult> {
    const validationResult = dto.validate()
    if (!validationResult.success) {
      return validationResult
    }

    const registerResult = await this.authService.register(dto)
    if (!registerResult.success) {
      return registerResult
    }

    return {
      success: true,
    }
  }

  @Post('login')
  public async login(@Body() dto: LoginDTO): Promise<OperationResult> {
    const loginResult = await this.authService.login(dto)
    if (!loginResult.success) {
      return loginResult
    }

    const { data } = loginResult

    return {
      success: true,
      data: {
        access_token: await this.jwtService.signAsync({ id: data.id }),
        user: extractPublicUserInfo(data),
      },
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'user info' })
  @Get('whoami')
  public async whoami(@RequestUser() user: User): Promise<OperationResult> {
    return {
      success: true,
      data: extractPublicUserInfo(user),
    }
  }
}
