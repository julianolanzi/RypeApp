import { Action, createReducer, on } from "@ngrx/store";
import { FeedState } from "../states/feeed.state";
import { FeedPostCreateRequestAction } from "../actions/feed/feed-post/feed-create-post-request.actions";
import { FeedLoadGlobalErrorAction } from "../actions/feed/feed-global-error.actions";
import { FeedPostCreateSuccessAction } from "../actions/feed/feed-post/feed-create-post-success.actions";
import { FeedTimelineSuccessAction } from "../actions/feed/feed-timelime/feed-load-timeline-success.actions";
import { FeedReactRequestAction } from "../actions/feed/react-post/feed-load-react-request.actions";
import { FeedReactSucessAction } from "../actions/feed/react-post/feed-load-react-success.actions";

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

    on(new FeedLoadGlobalErrorAction().createAction(), (state, action) => ({
        ...state,
        feedError: action.payload,
    })),

);

export function feedReducer(state: any, action: Action) {
    return _feedReducer(state, action)
}

