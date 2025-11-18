export interface User {
    id: string;
    username: string;
    email: string;
    user_type: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

export type CreateUser = Pick<User, 'username' | 'email' | 'user_type' | 'password'>;

export type UpdateUser = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;

export type PublicUser = Omit<User, 'password'>;

export type UserWhere = Partial<User>;
