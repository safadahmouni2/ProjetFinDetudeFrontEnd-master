import {UsersModels} from '../../../shared/Models/Users.models';
import {AbonneeModels} from '../../../shared/Models/abonnee.models';

export class Notification {

    /*id: string;
    icon?: string;
    image?: string;
    title?: string;
    description?: string;
    time: string;
    link?: string;
    useRouter?: boolean;
    read: boolean;*/
id: number;
    icon: string;
    public id_user: number;
 message: string;
    public  userNom: string;
    public userPre: string;
    public  picture: string;
    //useRouter: boolean;
    read: boolean;
   createdAt: Date;
    public id_userAbonnee: number;
}
