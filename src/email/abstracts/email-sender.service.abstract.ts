import { Injectable } from "@nestjs/common";
import { EmailSenderDto } from "../dtos/email-sender.dto";

@Injectable()
export abstract class AbstractEmailSenderService {
    abstract send(emailSender: EmailSenderDto): Promise<boolean>;
}