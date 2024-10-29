import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskScheduleService {
  protected logger = new Logger(TaskScheduleService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string, cronExpression: string) {
    const job = new CronJob(cronExpression, () => {
      this.logger.log(`time (${cronExpression}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.log(`job ${name} added!`);
  }

  getCron() {
    const listJob = [];
    const jobs = this.schedulerRegistry.getCronJobs();

    jobs.forEach((value, key) => {
      let next: Date | string = null;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }

      listJob.push(`job: ${key} -> next: ${next}`);
    });

    return listJob;
  }
}
