import { UserModel } from '@app/models/user.model';

export interface AuthState {
    loggedIn: boolean;
    user: UserModel | null;
    loading?: boolean;
    error?: string;
}

