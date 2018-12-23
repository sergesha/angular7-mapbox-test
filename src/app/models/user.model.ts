export interface UserModel {
    id?: string;
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
}

export type UserModelKey = keyof UserModel;
