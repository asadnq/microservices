
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    email: string;
    password: string;
    username: string;
}

export class UpdateUserInput {
    email: string;
    password: string;
    username: string;
}

export class User {
    id: string;
    email: string;
    username: string;
    createdAt: DateTime;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<CreateUserInput>): User | Promise<User>;

    abstract updateUser(id: string, input?: Nullable<UpdateUserInput>): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
