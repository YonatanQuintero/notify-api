import { Injectable } from "@nestjs/common";
import { EmailSender } from "../entities/email-sender.entity";

@Injectable()
export abstract class AbstractEmailSenderService {
    abstract send(emailSender: EmailSender): Promise<boolean>;
}