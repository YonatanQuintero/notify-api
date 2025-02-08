import { LanguageEnum } from "src/config/enums/language.enum";
import { NotificationMetaDto } from "src/notification/dtos/notification-meta.dto";
import { NotificationDto } from "src/notification/dtos/notification.dto";
import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";
import { NotificationTypeEnum } from "src/notification/enums/notification-type.enum";
import { NotificationSenderFactory } from "src/notification/factories/notification-sender.factory";
import { NotificationService } from "src/notification/services/notification.service";

describe('NotificationService', () => {
    let notificationService: NotificationService;
    let senderFactoryMock: Partial<NotificationSenderFactory>;
    let senderMock: { send: jest.Mock };

    beforeEach(() => {
        senderMock = {
            send: jest.fn(),
        };

        senderFactoryMock = {
            getSender: jest.fn().mockReturnValue(senderMock),
        };

        notificationService = new NotificationService(senderFactoryMock as NotificationSenderFactory);
    });

    it('should use the correct sender and return its result', async () => {
        const dto: NotificationDto = {
            type: NotificationTypeEnum.EMAIL,
            recipients: ['test@example.com'],
            name: NotificationNameEnum.WELCOME,
            params: { 'key': 'value' }
        };

        const metaDto: NotificationMetaDto = {
            lang: LanguageEnum.EN_US,
            ipClient: '::1',
        }

        const expectedResult = 'job-123';
        senderMock.send.mockResolvedValue(expectedResult);

        const result = await notificationService.sendNotification(dto, metaDto);

        expect(senderFactoryMock.getSender).toHaveBeenCalledWith(dto.type);
        expect(senderMock.send).toHaveBeenCalledWith(dto, metaDto);
        expect(result).toBe(expectedResult);
    });
});
