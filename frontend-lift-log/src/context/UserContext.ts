import { createContext } from 'react';

export type UserType = {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        goal: string;
        bodyType: string;
        heightFeet: number;
        heightInches: number;
        isAdmin: boolean;
}

export type UserContextType = undefined | {
    user: undefined | UserType;
}

export const UserContext = createContext<UserContextType>(undefined);
