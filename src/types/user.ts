export interface User {
    id: string;
    username: string;
    email: string;
    user_type: string;
    user_status?: string;
    password?: string;
    created_at: number;
    updated_at: number;
}

export type CreateUser = Pick<User, 'username' | 'email' | 'user_type' | 'user_status' | 'password'>;

export type UpdateUser = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;

export type PublicUser = Omit<User, 'password'>;

export type UserWhere = Partial<User>;
