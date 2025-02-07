import { ValueRequiredError } from "src/common/errors/value-required.error";
import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";
import { InvalidNotificationNameError } from "src/notification/errors/invalid-notification-name.error";
import { NotificationNameVO } from "src/notification/value-objects/notification-name.vo";

describe('NotificationNameVO', () => {
    it('should create a NotificationNameVO from a valid string', () => {
        const vo = NotificationNameVO.create('welcome');
        expect(vo).toBeInstanceOf(NotificationNameVO);
        expect(vo.getValue()).toBe(NotificationNameEnum.WELCOME);
    });

    it('should create a NotificationNameVO from a valid enum value', () => {
        const vo = NotificationNameVO.create(NotificationNameEnum.RECOVER_PASSWORD_SUCCESS);
        expect(vo).toBeInstanceOf(NotificationNameVO);
        expect(vo.getValue()).toBe(NotificationNameEnum.RECOVER_PASSWORD_SUCCESS);
    });

    it('should trim the string before validation', () => {
        const vo = NotificationNameVO.create('   welcome   ');
        expect(vo.getValue()).toBe(NotificationNameEnum.WELCOME);
    });

    it('should throw a ValueRequiredError if the notification name is undefined', () => {
        expect(() => NotificationNameVO.create(undefined)).toThrow(ValueRequiredError);
    });

    it('should throw an InvalidNotificationTypeError if the string is not in the enum', () => {
        expect(() => NotificationNameVO.create('INVALID_NAME')).toThrow(InvalidNotificationNameError);
    });

    it('should consider two NotificationNameVOs equal if they have the same enum value', () => {
        const vo1 = NotificationNameVO.create(NotificationNameEnum.WELCOME);
        const vo2 = NotificationNameVO.create(NotificationNameEnum.WELCOME);
        expect(vo1.equals(vo2)).toBe(true);
    });

    it('should consider two NotificationNameVOs not equal if they have different enum values', () => {
        const vo1 = NotificationNameVO.create(NotificationNameEnum.WELCOME);
        const vo2 = NotificationNameVO.create(NotificationNameEnum.RECOVER_PASSWORD_SUCCESS);
        expect(vo1.equals(vo2)).toBe(false);
    });
});
