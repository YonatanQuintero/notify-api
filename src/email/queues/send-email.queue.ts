import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bull";
import { AbstractQueue } from "src/queue/abstracts/queue.abstract";
import { SEND_EMAIL_QUEUE } from "src/queue/constants/queue.constants";
import { EmailSenderDto } from "../dtos/email-sender.dto";

@Injectable()
export class SendEmailQueue extends AbstractQueue<EmailSenderDto> {

    constructor(
        @InjectQueue(SEND_EMAIL_QUEUE)
        protected readonly queue: Queue,
    ) {
        super(queue);
    }

    async add(dto: EmailSenderDto): Promise<Job<EmailSenderDto>> {
        return await this.queue.add(dto, {
            attempts: 5,
            backoff: {
                type: 'exponential',
                delay: 3000,
            }
        });
    }
}
