import { Process, Processor } from "@nestjs/bull";
import { AbstractProcessor } from "src/queue/abstracts/processor.abstract";
import { SEND_EMAIL_QUEUE } from "src/queue/constants/queue.constants";
import { Job } from "bull";
import { Logger } from "@nestjs/common";
import { AbstractEmailSenderService } from "../abstracts/email-sender.service.abstract";
import { EmailSenderDto } from "../dtos/email-sender.dto";

@Processor(SEND_EMAIL_QUEUE)
export class SendEmailProcessor extends AbstractProcessor<EmailSenderDto> {

    private readonly logger = new Logger(SendEmailProcessor.name);

    constructor(
        private readonly emailService: AbstractEmailSenderService
    ) {
        super();
    }

    @Process()
    async run(job: Job<EmailSenderDto>): Promise<void> {

        const currentAttempt = job.attemptsMade + 1;
        this.logger.log(`Attempt ${currentAttempt} for job ${job.id}: Starting email send.`);

        try {

            await this.emailService.send(job.data);
            this.logger.log(`Email sent successfully for job ${job.id} on attempt ${currentAttempt}.`);

        } catch (error) {

            this.logger.error(
                `Failed to send email for job ${job.id} on attempt ${currentAttempt}.`,
                error.stack,
            );

            if (currentAttempt >= job.opts.attempts) {
                this.logger.error(`Job ${job.id} failed after ${currentAttempt} attempts. No further retries.`);
            }

            // Re-throw to let the queue handle the retry
            throw error;
        }
    }
}