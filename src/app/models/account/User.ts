export interface User {
    id: string;
    idGame: string;
    nickname: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    url: string;
    gender: string;
    country: string;
    birthday: Date;
    verify: boolean;
    discord: string;
    instagram: string;
    facebook: string;
    youtube: string;
    team: [{
        teamName: string;
        tagName: string;
        ranking: number;
        admin: number;
        url: string;
        description: string;
        createdAt: Date;
    }]
    createdAt: Date;
}