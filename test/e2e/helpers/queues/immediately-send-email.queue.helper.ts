import { Injectable } from '@nestjs/common'
import { AbstractEmailSenderService } from 'src/email/abstracts/email-sender.service.abstract'
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto'
import { AbstractQueue } from 'src/queue/abstracts/queue.abstract'
import { Job, JobOptions } from 'bull'

@Injectable()
export class ImmediatelySendEmailQueue extends AbstractQueue<EmailSenderDto> {
  constructor (
    private readonly emailService: AbstractEmailSenderService
  ) {
    // We do not need an actual Bull queue instance in test,
    // so we pass undefined to the parent.
    super(undefined)
  }

  async add (dto: EmailSenderDto): Promise<Job<EmailSenderDto>> {
    // Instead of enqueuing the job, process it synchronously:
    await this.emailService.send(dto)
    const opts: JobOptions = {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 3000
      }
    }
    // Create a fake Job object to return. Fill in only what you need.
    const job: Partial<Job<EmailSenderDto>> = {
      id: 'immediate-job-test',
      data: dto,
      attemptsMade: 0,
      opts
      // The rest of the job properties can be omitted or stubbed as needed.
    }
    return job as Job<EmailSenderDto>
  }
}
