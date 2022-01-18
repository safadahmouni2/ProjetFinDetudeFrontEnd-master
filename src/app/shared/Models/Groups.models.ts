import {RolesModels} from "./Roles.models";
import {UsersModels} from "./Users.models";

export class GroupsModels {


    public id: number;
    public name_grp: string ;
    public desc_grp: string ;
    public creation_date: Date ;
public condition: boolean;
    public roles: RolesModels[];

    public users: UsersModels[];
    //public roles: RolesModels[];



}
