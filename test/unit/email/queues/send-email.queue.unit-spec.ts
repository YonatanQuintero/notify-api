import { Queue, Job } from 'bull'
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto'
import { SendEmailQueue } from 'src/email/queues/send-email.queue'

describe('SendEmailQueue', () => {
  let sendEmailQueue: SendEmailQueue
  let queueMock: Partial<Queue>

  beforeEach(() => {
    queueMock = {
      add: jest.fn()
    }

    sendEmailQueue = new SendEmailQueue(queueMock as Queue)
  })

  it('should add a job to the queue with correct options', async () => {
    // Arrange
    const dto: EmailSenderDto = {
      fromEmail: 'test@example.com',
      fromName: 'Test Sender',
      toEmail: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Hello</p>'
    }

    const fakeJob: Partial<Job<EmailSenderDto>> = {
      id: 'job123'
    };

    (queueMock.add as jest.Mock).mockResolvedValue(fakeJob)

    // Act
    const job = await sendEmailQueue.add(dto)

    // Assert
    expect(queueMock.add).toHaveBeenCalledWith(dto, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 3000
      }
    })
    expect(job).toEqual(fakeJob)
  })
})
