import {UsersModels} from "./Users.models";
import {AimeModels} from "./Aime.models";
import {CommentModels} from "./Comment.models";


export class PublictionModule {
    public  id:number;
    public  status:string;
    public  video:string ;
    public  image:string;
    public  start_date:Date;
    public  last_modif:Date;
    public  visibility:boolean;
    public users:UsersModels[];
    public user:UsersModels;
    public aimes:number;
    public aime:AimeModels[];
    public likes:number[];

    public commentaire:CommentModels[];



}
