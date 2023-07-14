export interface LoadCommentsSuccess {
    _id: string;
    authorComment:{
        user: string;
        url: string;
        nickname: string;
    }
    idPost: string;
    message: string;
    createdAt: Date;
    lastUpdate: Date;
}