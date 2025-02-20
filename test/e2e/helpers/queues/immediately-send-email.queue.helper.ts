import { Injectable } from '@nestjs/common'
import { AbstractEmailSenderService } from 'src/email/abstracts/email-sender.service.abstract'
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto'
import { AbstractQueue } from 'src/queue/abstracts/queue.abstract'
import { Job } from 'bull'

@Injectable()
export class ImmediatelySendEmailQueue extends AbstractQueue<EmailSenderDto> {
  constructor (
    private readonly emailService: AbstractEmailSenderService
  ) {
    // We do not need an actual Bull queue instance in test,
    // so we pass null to the parent.
    super(null)
  }

  async add (dto: EmailSenderDto): Promise<Job<EmailSenderDto>> {
    // Instead of enqueuing the job, process it synchronously:
    await this.emailService.send(dto)
    // Create a fake Job object to return. Fill in only what you need.
    return {
      id: 'immediate-job-test',
      data: dto,
      attemptsMade: 0,
      opts: {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 3000
        }
      }
      // The rest of the job properties can be omitted or stubbed.
    } as Job<EmailSenderDto>
  }
}
