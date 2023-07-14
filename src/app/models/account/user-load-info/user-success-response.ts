export interface UserSuccessResponse {
    id: string;
    idRype: string;
    urlCover: string;
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
    social: {
        discord: string;
        instagram: string;
        facebook: string;
        youtube: string;
        twitter: string;
        twitch: string;
        psn: string;
        xbox: string;
        idGame:string;
    }

    address: {
        city: string;
        district: string;
        number: string;
        street1: string;
        street2: string;
        zipcode: string;
    }
    team: [{
        teamName: string;
        tagName: string;
        ranking: number;
        admin: string;
        url: string;
        description: string;
        createdAt: Date | undefined;
    }]
    notifications: [],
    posts:[],
    createdAt: Date | undefined;
}
