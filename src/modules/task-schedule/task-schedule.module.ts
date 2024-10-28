import { Module } from '@nestjs/common'
import { GlobalModule } from 'src/global.module'
import { TaskScheduleController } from './task-schedule.controller'
import { TaskScheduleService } from './task-schedule.service'

@Module({
  imports: [GlobalModule],
  providers: [TaskScheduleService],
  controllers: [TaskScheduleController],
})
export class TaskScheduleModule {}
