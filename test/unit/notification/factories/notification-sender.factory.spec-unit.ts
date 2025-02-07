import { NotificationTypeEnum } from "src/notification/enums/notification-type.enum";
import { NotificationSenderFactory } from "src/notification/factories/notification-sender.factory";
import { EmailNotificationSender } from "src/notification/senders/email-notification.sender";

describe('NotificationSenderFactory', () => {
  let factory: NotificationSenderFactory;
  let emailNotificationSenderMock: Partial<EmailNotificationSender>;

  beforeEach(() => {
    // Create a mock for EmailNotificationSender. In this simple test, an empty object is sufficient.
    emailNotificationSenderMock = {} as EmailNotificationSender;
    factory = new NotificationSenderFactory(emailNotificationSenderMock as EmailNotificationSender);
  });

  it('should return the emailNotificationSender for NotificationType.EMAIL', () => {
    const sender = factory.getSender(NotificationTypeEnum.EMAIL);
    expect(sender).toBe(emailNotificationSenderMock);
  });

  it('should throw an error for unsupported notification types', () => {
    // Define an unsupported type. Assuming NotificationType is an enum, we cast a string.
    const unsupportedType = 'unsupported-type' as NotificationTypeEnum;
    expect(() => factory.getSender(unsupportedType)).toThrow(`Unsupported notification type: ${unsupportedType}`);
  });
});
