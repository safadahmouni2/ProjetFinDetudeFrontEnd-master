import {RolesModels} from './Roles.models';
import {GroupsModels} from './Groups.models';
import {UsersModels} from './Users.models';

export class GroupRoleUserModels {

public id: number;
    public roles:RolesModels[]= [];

    public users: UsersModels[]=[];



}
