import { ValueRequiredError } from "src/common/errors/value-required.error";
import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";
import { InvalidNotificationNameError } from "src/notification/errors/invalid-notification-name.error";
import { NotificationNameVO } from "src/notification/value-objects/notification-name.vo";

describe('NotificationNameVO', () => {
    it('should throw ValueRequiredError when no name is provided', () => {
        expect(() => {
            NotificationNameVO.create(undefined);
        }).toThrow(ValueRequiredError);
    });

    it('should throw ValueRequiredError when an empty string is provided', () => {
        expect(() => {
            NotificationNameVO.create('');
        }).toThrow(ValueRequiredError);
    });

    it('should throw InvalidNotificationNameError when an invalid notification name string is provided', () => {
        const invalidName = 'INVALID_NAME';
        expect(() => {
            NotificationNameVO.create(invalidName);
        }).toThrow(InvalidNotificationNameError);
    });

    it('should create a NotificationNameVO instance when a valid notification name string is provided', () => {
        const validNameString = 'WELCOME';
        const vo = NotificationNameVO.create(`  ${validNameString}  `); // testing trimming behavior
        expect(vo).toBeInstanceOf(NotificationNameVO);
        expect(vo.getValue()).toBe(NotificationNameEnum.WELCOME);
    });

    it('should create a NotificationNameVO instance when a valid NotificationNameEnum value is provided', () => {
        const vo = NotificationNameVO.create(NotificationNameEnum.WELCOME);
        expect(vo).toBeInstanceOf(NotificationNameVO);
        expect(vo.getValue()).toBe(NotificationNameEnum.WELCOME);
    });
});
