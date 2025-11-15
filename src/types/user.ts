export interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

export type CreateUser = Pick<User, 'username' | 'email' | 'password'>;

export type UpdateUser = Partial<Omit<User, 'id' | 'created_at'>>;

export type UserWhere = Partial<User>;
