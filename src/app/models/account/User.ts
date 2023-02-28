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
    birthday: Date | undefined;
    verify: boolean;
    discord: string;
    instagram: string;
    facebook: string;
    youtube: string;
    team: [{
        teamName: string;
        tagName: string;
        ranking: number;
        admin: string;
        url: string;
        description: string;
        createdAt: Date | undefined;
    }]
    createdAt: Date | undefined;
}