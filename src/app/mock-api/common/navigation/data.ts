/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import {JwtHelperService} from "@auth0/angular-jwt";
import {NavigationMockApi} from "./api";

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'admin',
        title   : 'Administration',
        type    : 'basic',
        icon    : 'heroicons_outline:library',
        link : '/admin'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'academy',
        title   : 'Home',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/apps/acceuil'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'offre',
        title   : 'Offre',
        type    : 'basic',
        icon    : 'heroicons_outline:briefcase',
        link : '/apps/offre'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'profil',
        title   : 'Profil',
        type    : 'basic',
        icon    : 'heroicons_outline:user-circle',
        link : '/apps/profil',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },


];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'admin',
        title   : 'Administration',
        type    : 'basic',
        icon    : 'heroicons_outline:library',
        link : '/admin'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'academy',
        title   : 'Home',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/apps/acceuil'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'offre',
        title   : 'Offre',
        type    : 'basic',
        icon    : 'heroicons_outline:briefcase',
        link : '/apps/offre'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'profil',
        title   : 'Profil',
        type    : 'basic',
        icon    : 'heroicons_outline:user-circle',
        link : '/apps/profil',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }

];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'admin',
        title   : 'Administration',
        type    : 'basic',
        icon    : 'heroicons_outline:library',
        link : '/admin'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'academy',
        title   : 'Home',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/apps/acceuil'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'offre',
        title   : 'Offre',
        type    : 'basic',
        icon    : 'heroicons_outline:briefcase',
        link : '/apps/offre'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'profil',
        title   : 'Profil',
        type    : 'basic',
        icon    : 'heroicons_outline:user-circle',
        link : '/apps/profil',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }

];
export const horizontalNavigation: FuseNavigationItem[] = [{
    id      : 'admin',
    title   : 'Administration',
    type    : 'basic',
    icon    : 'heroicons_outline:library',
    link : '/admin'
    // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
},
    {
        id      : 'academy',
        title   : 'Home',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/apps/acceuil'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'offre',
        title   : 'Offre',
        type    : 'basic',
        icon    : 'heroicons_outline:briefcase',
        link : '/apps/offre'
        // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'profil',
        title   : 'Profil',
        type    : 'basic',
        icon    : 'heroicons_outline:user-circle',
        link : '/apps/profil',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }];


