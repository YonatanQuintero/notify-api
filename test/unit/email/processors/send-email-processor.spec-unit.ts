import { Job } from 'bull';
import { AbstractEmailSenderService } from 'src/email/abstracts/email-sender.service.abstract';
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto';
import { EmailSender } from 'src/email/entities/email-sender.entity';
import { SendEmailProcessor } from 'src/email/processors/send-email.processor';


describe('SendEmailProcessor', () => {
    let emailServiceMock: Partial<AbstractEmailSenderService>;
    let sendEmailProcessor: SendEmailProcessor;

    beforeEach(() => {
        emailServiceMock = {
            send: jest.fn(),
        };

        sendEmailProcessor = new SendEmailProcessor(emailServiceMock as AbstractEmailSenderService);
    });

    describe('run', () => {
        it('should process the job successfully and log attempt and success messages', async () => {
            const emailSenderDto: EmailSenderDto = {
                fromEmail: 'from@example.com',
                fromName: 'From Name',
                toEmail: ['to@example.com'],
                lang: 'en',
                templateName: 'welcome',
                params: { 'key': 'value' },
                ccEmail: ['cc@example.com'],
                bccEmail: ['bcc@example.com'],
            };

            // Simulate a job with no attempts made yet.
            const job: Partial<Job<EmailSenderDto>> = {
                id: 'job1',
                data: emailSenderDto,
                attemptsMade: 0,
                opts: { attempts: 3 },
            };

            // Spy on the logger methods of the processor instance.
            const loggerLogSpy = jest.spyOn(sendEmailProcessor['logger'], 'log');
            const loggerErrorSpy = jest.spyOn(sendEmailProcessor['logger'], 'error');

            // Spy on EmailSender.create to ensure it's called with job.data.
            const fakeEmailSender = {} as any;
            const emailSenderCreateSpy = jest.spyOn(EmailSender, 'create').mockReturnValue(fakeEmailSender);

            // Simulate successful email sending.
            (emailServiceMock.send as jest.Mock).mockResolvedValue(true);

            // Execute the processor's run method.
            await sendEmailProcessor.run(job as Job<EmailSenderDto>);

            // Verify logs and method calls.
            expect(loggerLogSpy).toHaveBeenCalledWith(`Attempt 1 for job job1: Starting email send.`);
            expect(emailSenderCreateSpy).toHaveBeenCalledWith(emailSenderDto);
            expect(emailServiceMock.send).toHaveBeenCalledWith(fakeEmailSender);
            expect(loggerLogSpy).toHaveBeenCalledWith(`Email sent successfully for job job1 on attempt 1.`);
            expect(loggerErrorSpy).not.toHaveBeenCalled();
        });

        it('should log error and re-throw error when emailService.send fails (without reaching max attempts)', async () => {
            const emailSenderDto: EmailSenderDto = {
                fromEmail: 'from@example.com',
                fromName: 'From Name',
                toEmail: ['to@example.com'],
                lang: 'en',
                templateName: 'welcome',
                params: { 'key': 'value' },
                ccEmail: ['cc@example.com'],
                bccEmail: ['bcc@example.com'],
            };

            const error = new Error('Sending failed');

            // Simulate a job with 1 attempt already made (currentAttempt = 2) and max attempts = 3.
            const job: Partial<Job<EmailSenderDto>> = {
                id: 'job2',
                data: emailSenderDto,
                attemptsMade: 1,
                opts: { attempts: 3 },
            };

            const loggerLogSpy = jest.spyOn(sendEmailProcessor['logger'], 'log');
            const loggerErrorSpy = jest.spyOn(sendEmailProcessor['logger'], 'error');

            const fakeEmailSender = {} as any;
            const emailSenderCreateSpy = jest.spyOn(EmailSender, 'create').mockReturnValue(fakeEmailSender);

            (emailServiceMock.send as jest.Mock).mockRejectedValue(error);

            // Execute and expect the error to be re-thrown.
            await expect(sendEmailProcessor.run(job as Job<EmailSenderDto>)).rejects.toThrow(error);

            // Verify logging: initial attempt message and error message.
            expect(loggerLogSpy).toHaveBeenCalledWith(`Attempt 2 for job job2: Starting email send.`);
            expect(loggerErrorSpy).toHaveBeenCalledWith(
                `Failed to send email for job job2 on attempt 2.`,
                error.stack,
            );
            // Since currentAttempt (2) is less than max attempts (3), the final "no further retries" message should not be logged.
            expect(loggerErrorSpy).not.toHaveBeenCalledWith(`Job job2 failed after 2 attempts. No further retries.`);
        });

        it('should log final error when max attempts are reached and re-throw error', async () => {
            const emailSenderDto: EmailSenderDto = {
                fromEmail: 'from@example.com',
                fromName: 'From Name',
                toEmail: ['to@example.com'],
                lang: 'en',
                templateName: 'welcome',
                params: { 'key': 'value' },
                ccEmail: ['cc@example.com'],
                bccEmail: ['bcc@example.com'],
            };

            const error = new Error('Sending failed on max attempt');

            // Simulate a job with 2 attempts already made (currentAttempt = 3) and max attempts = 3.
            const job: Partial<Job<EmailSenderDto>> = {
                id: 'job3',
                data: emailSenderDto,
                attemptsMade: 2,
                opts: { attempts: 3 },
            };

            const loggerLogSpy = jest.spyOn(sendEmailProcessor['logger'], 'log');
            const loggerErrorSpy = jest.spyOn(sendEmailProcessor['logger'], 'error');

            const fakeEmailSender = {} as any;
            const emailSenderCreateSpy = jest.spyOn(EmailSender, 'create').mockReturnValue(fakeEmailSender);

            (emailServiceMock.send as jest.Mock).mockRejectedValue(error);

            await expect(sendEmailProcessor.run(job as Job<EmailSenderDto>)).rejects.toThrow(error);

            // Verify that the processor logs the attempt, error, and the "no further retries" message.
            expect(loggerLogSpy).toHaveBeenCalledWith(`Attempt 3 for job job3: Starting email send.`);
            expect(loggerErrorSpy).toHaveBeenCalledWith(
                `Failed to send email for job job3 on attempt 3.`,
                error.stack,
            );
            expect(loggerErrorSpy).toHaveBeenCalledWith(`Job job3 failed after 3 attempts. No further retries.`);
        });
    });
});
