import { NotificationDto } from "src/notification/dtos/notification.dto";
import { NotificationType } from "src/notification/enums/notification-type.enum";
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
            type: NotificationType.EMAIL,
            recipients: ['test@example.com'],
            templateName: 'welcome',
            params: { 'key': 'value' }
        };

        const expectedResult = 'job-123';
        senderMock.send.mockResolvedValue(expectedResult);

        const result = await notificationService.sendNotification(dto);

        expect(senderFactoryMock.getSender).toHaveBeenCalledWith(dto.type);
        expect(senderMock.send).toHaveBeenCalledWith(dto);
        expect(result).toBe(expectedResult);
    });
});
