export interface User {
    _id: string;
    name: string;
    email: string;
    address: {
        [id: string]: string;
    };
    active: boolean;
    
}