import { Component } from '@angular/core';
import { TinyNotificationService } from '../services/tiny-notification.service';
import { TinyNotificationModel } from '../tiny-notification-model/tiny-notification.model';

@Component({
    selector: 'notifications',
    template: `
<div class="tiny-notification-panel">
<div *ngFor="let notification of notifications" class="tiny-notification">
<div class="header-block">
 <h3 class="header-title">{{notification.header}}</h3>
 <a class="close-button" (click)="closeNotification(notification)">x</a>
</div>
<div class="content">
 <span>{{notification.description}}</span>
</div>
</div>
</div>`
})

export class TinyNotificationComponent {
    public notifications: Set<TinyNotificationModel> = new Set<TinyNotificationModel>();

    constructor(private _notificationService: TinyNotificationService) {
        this._notificationService.getNotifications()
            .subscribe((notification: TinyNotificationModel) => {
                this.notifications.add(notification);
                setTimeout(() => {
                    this.closeNotification(notification);
                }, 5000);
            });
    }

    public closeNotification(notification: TinyNotificationModel): void {
        this.notifications.delete(notification);
    }
}
