import { Injectable } from '@angular/core';
import { Notification } from '../types/notification';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private transientNotificationStream: Subject<Notification> = new Subject<Notification>();
  public transientNotifications: Observable<Notification> = this.transientNotificationStream.asObservable();
  private transientNotificationQueue: Notification[] = [];

  constructor() { }

  public addNotification(type: string, message: string) {
    this.transientNotificationQueue.push(new Notification(type, message));
    if (this.transientNotificationQueue.length === 1) {
    this.sendNotification(this.transientNotificationQueue[0]);
    }
  }

  public closeTransientNotification(): void {
    this.transientNotificationQueue.shift();
    if (this.transientNotificationQueue.length > 0) {
      this.sendNotification(this.transientNotificationQueue[0]);
    }
  }

  public getTransientNotifications(): Observable<Notification> {
    return this.transientNotifications;
  }

  public dismissAllNotifications(): void {
    this.transientNotificationStream.next(null);
    this.transientNotificationQueue = [];
  }

  private sendNotification(notification: Notification): void {
    this.transientNotificationStream.next(notification);
  }
}
