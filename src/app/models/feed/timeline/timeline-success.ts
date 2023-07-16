export interface TimelineSuccess {
    id: string;
    title: string;
    text: string;
    type: string;
    reactUser: string;
    reactQtd: {
        like: number,
        love: number,
        good: number,
        omg: number,
        pistola: number,
        aff: number
    },
    qtdComments: number,
    ranked: [
        {
            reackRank: string;
            qtd: number;
        },
        {
            reackRank: string;
            qtd: number;
        },
        {
            reackRank: string;
            qtd: number;
        },
        {
            reackRank: string;
            qtd: number;
        },
        {
            reackRank: string;
            qtd: number;
        },
        {
            reackRank: string;
            qtd: number;
        }
    ],
    enableEdit: boolean;
    reacts: [{
        user: string;
        reactDate: Date;
        react: string;
        id: string
    }];
    urlPost: string;
    urlVideo: string;
    comments: [];
    createdAt: Date;
    lastUpdate: Date;
    author: {
        nickname: string;
        name: string;
        url: string;
    }
}