import { Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OperationResult } from 'src/interfaces'
import { TaskScheduleService } from './task-schedule.service'
import { CronExpression } from '@nestjs/schedule'

@ApiTags('schedule')
@Controller('schedule')
export class TaskScheduleController {
  constructor(protected taskScheduleService: TaskScheduleService) {}

  @Get()
  public async get(): Promise<OperationResult> {
    const cronjobs = this.taskScheduleService.getCron()

    return {
      success: true,
      data: cronjobs,
    }
  }

  @Post('register')
  public async register(): Promise<OperationResult> {
    this.taskScheduleService.addCronJob('erver-10-seconds', CronExpression.EVERY_10_SECONDS)
    return {
      success: true,
    }
  }
}
