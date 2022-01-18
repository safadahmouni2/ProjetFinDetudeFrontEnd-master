import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { map, switchMap, take, tap } from 'rxjs/operators';
import {environment} from '../../../../environments/environment.prod';
import {UsersModels} from '../../../shared/Models/Users.models';
import {PublictionModule} from '../../../shared/Models/publiction.module';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);
    // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/naming-convention
    readonly API_URL = environment.baseUrl;
    /**
     * Constructor
     */
    constructor(private httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<Notification[]>
    {
        return this._notifications.asObservable();
    }
    addNotif(notification: Notification): Observable<Notification> {

        //return this.httpClient.post(`${this.API_URL}/notifications/addNotif`);
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this.httpClient.post<Notification>(`${this.API_URL}/notifications/addNotif`, {notification}).pipe(
                map((newNotification) => {

                    // Update the notifications with the new notification
                    this._notifications.next([...notifications, newNotification]);

                    // Return the new notification from observable
                    return newNotification;
                })
            ))
        );
    }
//get all getNotificationsByUser*****
  /*  getAll(id): Observable<Array<Notification>> {
        return this.httpClient.get<Array<Notification>>(`${this.API_URL}/notifications/getAllNotification/?id_user=` + id);
    }*/
    /**
     * Get all notifications by user
     */
    //get number notif unread for each user
    getAll(id,n,s): Observable<Notification[]>
    {
        return this.httpClient.get<Notification[]>(`${this.API_URL}/notifications/getNotificationsByUser?id=` + id + '&pageNo='+n+'&pageSize='+s).pipe(
            tap((notifications) => {
                this._notifications.next(notifications);
            })
        );
    }
    //get all  number of notif for each user
    listNotif(id): Observable<Notification[]> {
        return this.httpClient.get<Notification[]>(`${this.API_URL}/notifications/listNotificationsByUser?id=` + id).pipe(
            tap((notifications) => {
                this._notifications.next(notifications);
            })
        );
    }
    // get number of notif unread for each user
    countNotif(id_user): Observable<any> {
        return this.httpClient.get<any>
        (`${this.API_URL}/notifications/countNotif?id_user=` + id_user);}


    isReadNotif(id_user) {
        return this.httpClient.put(`${this.API_URL}/notifications/isRead?id=` + id_user,null);}


  // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
/*    get notifications$(): Observable<Notification[]>
    {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------




    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
   /* update(id: number, notification: Notification){

        return this.httpClient.put(`${this.API_URL}/notifications/updateNotification?id=` + id + '&notification='+notification,  notification,
        );}*/
  /*update(id: number, notification: boolean): Observable<Notification>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this.httpClient
                .patch<Notification>(`${this.API_URL}/notifications/updateNotification?id=` + id + '&read='+notification,null).pipe(
                map((updatedNotification: Notification) => {

                    // Find the index of the updated notification
                    const index = notifications.findIndex(item => item.id === id);

                    // Update the notification
                    notifications[index] = updatedNotification;

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated notification
                    return updatedNotification;
                })
            ))
        );
    }

    /**
     * Delete the notification
     *
     * @param id
     */
 /*   delete(id: string): Observable<boolean>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.delete<boolean>('api/common/notifications', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted notification
                    const index = notifications.findIndex(item => item.id === id);

                    // Delete the notification
                    notifications.splice(index, 1);

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Mark all notifications as read
     */
  /*  markAllAsRead(): Observable<boolean>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.get<boolean>('api/common/notifications/mark-all-as-read').pipe(
                map((isUpdated: boolean) => {

                    // Go through all notifications and set them as read
                    notifications.forEach((notification, index) => {
                        notifications[index].read = true;
                    });

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated status
                    return isUpdated;
                })
            ))
        );
    }*/
}
