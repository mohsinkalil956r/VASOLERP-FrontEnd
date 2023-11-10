export class UserModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    token: string;
    isActive:boolean;
    requirePasswordReset: boolean;
    organization: string;
    products: string[];
    roles: string[];
    permissions: string[];

}