import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";

export enum TemplateNameEnum {
    RECOVER_PASSWORD_SUCCESS = NotificationNameEnum.RECOVER_PASSWORD_SUCCESS,
    TFA = NotificationNameEnum.TFA,
    UPDATE_EMAIL = NotificationNameEnum.UPDATE_EMAIL,
    UPDATE_PASSWORD = NotificationNameEnum.UPDATE_PASSWORD,
    WELCOME = NotificationNameEnum.WELCOME
}