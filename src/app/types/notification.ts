export enum NotificationTypes {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger'
}

export class Notification {
    constructor(
        public type: string,
        public message: string) {}
}