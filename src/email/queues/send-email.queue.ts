import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { EmailSender } from "src/email/entities/email-sender.entity";
import { AbstractQueue } from "src/queue/abstracts/queue.abstract";
import { SEND_EMAIL_QUEUE } from "src/queue/constants/queue.constants";

@Injectable()
export class SendEmailQueue extends AbstractQueue<EmailSender> {

    constructor(
        @InjectQueue(SEND_EMAIL_QUEUE)
        protected readonly queue: Queue,
    ) {
        super(queue);
    }
}