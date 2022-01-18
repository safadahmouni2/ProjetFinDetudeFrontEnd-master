import {DemandeModule} from "./demande.module";
import {UsersModels} from "./Users.models";

export class CommentModels {

    public pubId:number;

    // public competanceFiles:CompetanceFilesModels;
    public userId:number;
    public text:string='';
    public date:Date;
    public users:UsersModels[];



}

