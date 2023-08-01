import { Action, createReducer, on } from "@ngrx/store";
import { FeedState } from "../states/feeed.state";
import { FeedPostCreateRequestAction } from "../actions/feed/feed-post/feed-create-post-request.actions";
import { FeedLoadGlobalErrorAction } from "../actions/feed/feed-global-error.actions";
import { FeedPostCreateSuccessAction } from "../actions/feed/feed-post/feed-create-post-success.actions";
import { FeedTimelineSuccessAction } from "../actions/feed/feed-timelime/feed-load-timeline-success.actions";
import { FeedReactSucessAction } from "../actions/feed/react-post/feed-load-react-success.actions";
import { FeedDeletePostSuccessAction } from "../actions/feed/delete-post/feed-load-delete-post-success.actions";
import { FeedPostEditRequestAction } from "../actions/feed/edit-post/feed-edit-post-request.actions";
import { PostCommentsLoadClearAction } from "../actions/feed/comments-load/feed-load-comments-clear.actions";
import { PostCommentsLoadSuccessAction } from "../actions/feed/comments-load/feed-load-comments-post-success.actions";
import { PostCommentsLoadRequestAction } from "../actions/feed/comments-load/feed-load-comments-post-request.actions";
import { PostCommentsCreateSuccessAction } from "../actions/feed/comments-create/load-create-comment-success.actions";
import { PostCommentsDeleteSuccessAction } from "../actions/feed/comments-delete/load-delete-comment-success.actions";
import { FeedTimelineRequestAction } from "../actions/feed/feed-timelime/feed-load-timeline-request.actions";
import { OpPlayerIdRequestAction } from "../actions/overview/user/search-player/op-load-player-id-request.action";

export const initialState: FeedState = {
    createPost: {
        title: '',
        text: '',
        type: '',
        urlPost: '',
        author: '',
        urlVideo: '',
    },
    createPostSucess: {
        id: '',
        title: '',
        text: '',
        enableEdit: true,
        type: '',
        reactUser: '',
        reactQtd: {
            like: 0,
            love: 0,
            good: 0,
            omg: 0,
            pistola: 0,
            aff: 0,
        },
        urlPost: '',
        urlVideo: '',
        reacts: [],
        ranked: [
            {
                reackRank: 'like',
                qtd: 0,
            },
            {
                reackRank: 'love',
                qtd: 0,
            },
            {
                reackRank: 'good',
                qtd: 0,
            },
            {
                reackRank: 'omg',
                qtd: 0,
            },
            {
                reackRank: 'pistola',
                qtd: 0,
            },
            {
                reackRank: 'aff',
                qtd: 0,
            }
        ],
        comments: [],
        createdAt: undefined,
        lastUpdate: undefined,
        author: {
            nickname: '',
            name: '',
            url: '',
        }
    },
    comments: [],
    timeLine: [],
    feedError: undefined,
}

const _feedReducer = createReducer(
    initialState,

    on(new FeedPostCreateRequestAction().createAction(), (state, action) => ({
        ...state,
        createPost: { ...action.payload },
    })),
    on(new FeedPostCreateSuccessAction().createAction(), (state, action) => ({
        ...state,
        createPostSucess: { ...action.payload },
        timeLine: [{ ...action.payload }, ...state.timeLine]
    })),
    on(new FeedTimelineSuccessAction().createAction(), (state, action) => ({
        ...state,
        timeLine: [...action.payload]
    })),
    on(new FeedTimelineRequestAction().createAction(), (state) => ({
        ...state,
        timeLine: [...initialState.timeLine]
    })),
    

    on(new FeedReactSucessAction().createAction(), (state, action) => {
        const newArray = [];

        for (let item of state.timeLine) {
            if (item.id == action.payload.id) {
                newArray.push(action.payload);
            } else {
                newArray.push(item);
            }
        }

        return {
            ...state,
            timeLine: newArray,
        }

    }),
    on(new FeedDeletePostSuccessAction().createAction(), (state, action) => {
        const newArray = [];

        for (let item of state.timeLine) {
            if (item.id != action.payload) {
                newArray.push(item);
            }
        }

        return {
            ...state,
            timeLine: newArray,
        }

    }),
    on(new FeedPostEditRequestAction().createAction(), (state, action) => {
        const newArray = [];

        for (let item of state.timeLine) {
            if (item.id == action.payload.id) {
                let newItem = {
                    ...item,
                    text: action.payload.text,
                }

                newArray.push(newItem);

            }
            else {
                newArray.push(item);
            }
        }

        return {
            ...state,
            timeLine: newArray,
        }

    }),
    on(new PostCommentsLoadClearAction().createAction(), (state, action) => ({
        ...state,
        comments: [],
    })),
    on(new FeedLoadGlobalErrorAction().createAction(), (state, action) => ({
        ...state,
        feedError: action.payload,
    })),
    on(new PostCommentsLoadSuccessAction().createAction(), (state, action) => ({
        ...state,
        comments: [...action.payload]
    })),
    on(new PostCommentsCreateSuccessAction().createAction(), (state, action) => {

        let newArrayTimeLine = []
 

        for (let post of state.timeLine) {
            if (post.id == action.payload.idPost) {
                let newitem = {
                    ...post,
                    qtdComments: post.qtdComments + 1,
                }

                newArrayTimeLine.push(newitem);
            } else {
                newArrayTimeLine.push(post);
            }
        }



        return {
            ...state,
            comments: [...state.comments, { ...action.payload }],
            timeLine: newArrayTimeLine,

        }
    }),
    on(new PostCommentsDeleteSuccessAction().createAction(), (state, action) => {
        const newArray = [];
        for (let item of state.comments) {
            if (item._id != action.payload._id) {
                newArray.push(item);
            }
        }

        let newArrayTimeLine = []
 

        for (let post of state.timeLine) {
            if (post.id == action.payload.idPost) {
                let newitem = {
                    ...post,
                    qtdComments: post.qtdComments - 1,
                }

                newArrayTimeLine.push(newitem);
            } else {
                newArrayTimeLine.push(post);
            }
        }

        return {
            ...state,
            comments: newArray,
            timeLine: newArrayTimeLine,
        }

    }),
    on(new PostCommentsLoadRequestAction().createAction(), (state, action) => ({
        ...state,
        comments: [],
    })),



);

export function feedReducer(state: any, action: Action) {
    return _feedReducer(state, action)
}

