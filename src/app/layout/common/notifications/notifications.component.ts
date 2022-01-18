import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {UsersModels} from '../../../shared/Models/Users.models';
import {AbonneeModels} from '../../../shared/Models/abonnee.models';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector       : 'notifications',
    templateUrl    : './notifications.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'notifications'
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;
    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = { id: this.decodedToken.id,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        name_user: this.decodedToken.name_user,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        first_name: this.decodedToken.first_name,
        picture:this.decodedToken.picture,
        email: this.decodedToken.email,
        title: this.decodedToken.title,
        login: this.decodedToken.login,
        pwd: this.decodedToken.pwd,
        gender: this.decodedToken.gender,
        age: this.decodedToken.age,
        phone: this.decodedToken.phone,
        date_birth: this.decodedToken.date_birth,
        pays: this.decodedToken.pays,
    };
    notifications: Notification[];
    notification: Notification;
    abonne: AbonneeModels;
    userNotif: UsersModels;
    unreadCount: number = 0;
    id: any;
    load=false;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    users: Array<UsersModels>;
    user: UsersModels;
    n = 0;
    s = 4;
    /**
     * Constructor
     */
    constructor(
        private notificationService: NotificationsService,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private sanitizer: DomSanitizer
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void{
this.unreadCount;
        this.getNotifByUser();
        this.getNBNotif();
    }

    profilDetails(id){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
            const x = this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});
            console.log('urllllllllllllll',x);

        //this.getNBNotif();

    }
    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: Notification): void
    {
        // Toggle the read status
        notification.read = !notification.read;

        // Update the notification
         //this.notificationService.update(notification.id, notification).subscribe();
    }
    isRead(id) {
        let add: any;
        // eslint-disable-next-line eqeqeq

        this.notificationService.isReadNotif(id).subscribe((reslt) => {
            add = reslt;
          //  this.getNBNotif();
           this.toggleRead(this.notification);
            this.getNotifByUser();

            this.closePanel();

        });
    }
    //add notif
    saveNotification(id) {
        // @ts-ignore
        this.notificationService.addNotif().subscribe((data) => {
            this.notification = data;
        });
    }

//get notification by user
    getNotifByUser() {
        this.notificationService.getAll(this.userData.id,this.n, this.s).subscribe((reslt) => {
            this.notifications = reslt;
         //   this.getNBNotif();

        });
    }
    getNBNotif() {
        this.notificationService.countNotif(this.userData.id).subscribe((reslt) => {
            this.unreadCount = reslt;
        });}
    // Subscribe to notification changes
    /*   this._notificationsService.notifications$
           .pipe(takeUntil(this._unsubscribeAll))
           .subscribe((notifications: Notification[]) => {

               // Load the notifications
               this.notifications = notifications;

               // Calculate the unread count
               this._calculateUnreadCount();

               // Mark for check
               this._changeDetectorRef.markForCheck();
           });
   }

   /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void {
        // Return if the notifications panel or its origin is not defined
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void {
        this._overlayRef.detach();
        this.getNBNotif();
    }

    /**
     * Mark all notifications as read
     */
    /*markAllAsRead(): void
    {
        // Mark all as read
        this.notificationsService.markAllAsRead().subscribe();
    }

    /**
     * Delete the given notification
     */
    /*  delete(notification: Notification): void
      {
          // Delete the notification
          this._notificationsService.delete(notification.id).subscribe();
      }

      /**
       * Track by function for ngFor loops
       *
       * @param index
       * @param item
       */

        trackByFn(index: number, item: any): any
        {
            return item.id || index;
        }
        // -----------------------------------------------------------------------------------------------------
        // @ Private methods
        // -----------------------------------------------------------------------------------------------------

        /**
         * Create the overlay
         */
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                .withLockedPosition()
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom'
                    }
                ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void {
        let count = 0;

        if (this.notifications && this.notifications.length) {
            count = this.notifications.filter(notification => !notification.read).length;
        }
        this.unreadCount = count;
    }
}
