export interface PostCreateSuccess {
    id: string;
    title: string;
    text: string;
    type: string;
    reactUser: string;
    enableEdit: boolean;
    reacts:[];
    reactQtd: {
        like: number,
        love: number,
        good: number,
        omg: number,
        pistola: number,
        aff: number
    },
    urlPost: string;
    urlVideo: string;
    comments: [];
    createdAt: Date | undefined;
    lastUpdate: Date | undefined;
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
    author: {
        nickname: string;
        name: string;
        url: string;
    }
}