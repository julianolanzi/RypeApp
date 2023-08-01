export interface PlayerSuccessResponse {
    id: string;
    idRype: string;
    urlCover: string;
    nickname: string;
    name: string;
    lastname: string;
    email: string;
    url: string;
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
        idGame: string;
    },
    qtdPosts: number,
    team: [{
        _id: string;
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