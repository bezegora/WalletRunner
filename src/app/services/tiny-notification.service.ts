import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TinyNotificationModel } from '../common/tiny-notification-model/tiny-notification.model';

@Injectable({
    providedIn: 'root'
})
export class TinyNotificationService {
    private _notifications: Subject<TinyNotificationModel> = new Subject<TinyNotificationModel>();

    public getNotifications(): Subject<TinyNotificationModel> {
        return this._notifications;
    }

    public showToast(info: TinyNotificationModel): void {
        this._notifications.next(info);
    }
}

