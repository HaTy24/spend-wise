import { HttpStatus } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ERR_CODE } from 'src/constants'
import { OperationResult } from 'src/interfaces'

export class RegisterDTO {
  public validate(): OperationResult {
    if (this.email) {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      if (!isEmailValid) {
        return {
          success: false,
          message: 'invalid email format',
          code: ERR_CODE.INVALID_EMAIL_FORMAT,
          httpCode: HttpStatus.BAD_REQUEST,
        }
      }
    }

    if (this.username) {
      const isUsernameValid = /^[^\d][a-zA-Z0-9_]*$/
      if (!isUsernameValid) {
        return {
          success: false,
          message: 'username is invalid',
          code: ERR_CODE.INVALID_USERNAME_FORMAT,
          httpCode: HttpStatus.BAD_REQUEST,
        }
      }
    }

    return {
      success: true,
    }
  }

  @ApiProperty({
    example: 'abc@gmail.com',
  })
  @IsOptional()
  @MaxLength(100)
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'user123',
  })
  @MinLength(5)
  @MaxLength(30)
  @IsAlphanumeric()
  username: string

  @ApiProperty({
    example: 'Abcd@1234',
  })
  @MinLength(8)
  @MaxLength(60)
  password: string

  @ApiProperty({
    example: 'C70803DEA0',
  })
  refCode: string
}

export class LoginDTO {
  @ApiPropertyOptional({
    example: 'user1234',
  })
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  @IsString()
  username: string

  @ApiProperty({
    example: 'Abcd@1234',
  })
  @MinLength(8)
  @MaxLength(60)
  password: string
}
