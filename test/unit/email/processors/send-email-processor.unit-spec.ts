import { Job } from 'bull'
import { AbstractEmailSenderService } from 'src/email/abstracts/email-sender.service.abstract'
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto'
import { SendEmailProcessor } from 'src/email/processors/send-email.processor'

describe('SendEmailProcessor', () => {
  let processor: SendEmailProcessor
  let emailServiceMock: Partial<AbstractEmailSenderService>

  beforeEach(() => {
    emailServiceMock = {
      send: jest.fn()
    }

    processor = new SendEmailProcessor(emailServiceMock as AbstractEmailSenderService)
  })

  describe('run', () => {
    it('should process the job successfully and log success messages', async () => {
      const emailSenderData: EmailSenderDto = {
        fromEmail: 'from@example.com',
        fromName: 'Sender Name',
        toEmail: ['to1@example.com', 'to2@example.com'],
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        ccEmail: ['cc@example.com'],
        bccEmail: ['bcc@example.com']
      }

      const job: Partial<Job<EmailSenderDto>> = {
        id: 'job1',
        data: emailSenderData,
        attemptsMade: 0, // currentAttempt = 1
        opts: { attempts: 3 }
      };

      (emailServiceMock.send as jest.Mock).mockResolvedValue(true)

      const loggerLogSpy = jest.spyOn(processor.logger, 'log').mockImplementation(() => { })

      await processor.run(job as Job<EmailSenderDto>)

      expect(loggerLogSpy).toHaveBeenCalledWith('Attempt 1 for job job1: Starting email send.')
      expect(emailServiceMock.send).toHaveBeenCalledWith(emailSenderData)
      expect(loggerLogSpy).toHaveBeenCalledWith('Email sent successfully for job job1 on attempt 1.')
    })

    it('should log an error and rethrow when emailService.send fails (currentAttempt < max attempts)', async () => {
      const emailSenderData: EmailSenderDto = {
        fromEmail: 'from@example.com',
        fromName: 'Sender Name',
        toEmail: ['to@example.com'],
        subject: 'Hello',
        html: '<p>Hi</p>',
        ccEmail: ['cc@example.com'],
        bccEmail: ['bcc@example.com']
      }

      const job: Partial<Job<EmailSenderDto>> = {
        id: 'job2',
        data: emailSenderData,
        attemptsMade: 1, // currentAttempt = 2
        opts: { attempts: 3 }
      }

      const error = new Error('Sending failed');
      (emailServiceMock.send as jest.Mock).mockRejectedValue(error)

      const loggerErrorSpy = jest.spyOn(processor.logger, 'error').mockImplementation(() => { })
      const loggerLogSpy = jest.spyOn(processor.logger, 'log').mockImplementation(() => { })

      await expect(processor.run(job as Job<EmailSenderDto>)).rejects.toThrow(error)

      expect(loggerLogSpy).toHaveBeenCalledWith('Attempt 2 for job job2: Starting email send.')
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Failed to send email for job job2 on attempt 2.',
        error.stack
      )
      // Because currentAttempt (2) is less than max attempts (3), no "no further retries" message should be logged.
      expect(loggerErrorSpy).not.toHaveBeenCalledWith('Job job2 failed after 2 attempts. No further retries.')
    })

    it('should log final error message when maximum attempts are reached and rethrow error', async () => {
      const emailSenderData: EmailSenderDto = {
        fromEmail: 'from@example.com',
        fromName: 'Sender Name',
        toEmail: ['to@example.com'],
        subject: 'Hello',
        html: '<p>Hi</p>',
        ccEmail: ['cc@example.com'],
        bccEmail: ['bcc@example.com']
      }

      const job: Partial<Job<EmailSenderDto>> = {
        id: 'job3',
        data: emailSenderData,
        attemptsMade: 2, // currentAttempt = 3
        opts: { attempts: 3 }
      }

      const error = new Error('Final attempt failed');
      (emailServiceMock.send as jest.Mock).mockRejectedValue(error)

      const loggerErrorSpy = jest.spyOn(processor.logger, 'error').mockImplementation(() => { })
      const loggerLogSpy = jest.spyOn(processor.logger, 'log').mockImplementation(() => { })

      await expect(processor.run(job as Job<EmailSenderDto>)).rejects.toThrow(error)

      expect(loggerLogSpy).toHaveBeenCalledWith('Attempt 3 for job job3: Starting email send.')
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Failed to send email for job job3 on attempt 3.',
        error.stack
      )
      expect(loggerErrorSpy).toHaveBeenCalledWith('Job job3 failed after 3 attempts. No further retries.')
    })
  })
})
