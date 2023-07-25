import { Action, createReducer, on } from "@ngrx/store";
import { OverviewPlayerState } from "../states/overview-player.state";
import { LoadOpRoutingIdAction } from "../actions/overview-player/rounting-id/op-load-routing-id.actions";
import { OpPlayerIdSuccessAction } from "../actions/overview-player/search-player/op-load-player-id-success.action";
import { OpGlobalErrorAction } from "../actions/overview-player/op-load-global-error.actions";
import { OpPlayerTimelineSuccessAction } from "../actions/overview-player/load-timeline/op-load-timeline-success-actions";
import { FeedReactSucessAction } from "../actions/feed/react-post/feed-load-react-success.actions";
import { FeedDeletePostSuccessAction } from "../actions/feed/delete-post/feed-load-delete-post-success.actions";
import { FeedPostEditRequestAction } from "../actions/feed/edit-post/feed-edit-post-request.actions";
import { PostCommentsLoadSuccessAction } from "../actions/feed/comments-load/feed-load-comments-post-success.actions";
import { PostCommentsCreateSuccessAction } from "../actions/feed/comments-create/load-create-comment-success.actions";
import { PostCommentsDeleteSuccessAction } from "../actions/feed/comments-delete/load-delete-comment-success.actions";
import { PostCommentsLoadRequestAction } from "../actions/feed/comments-load/feed-load-comments-post-request.actions";
import { OpPlayerIdRequestAction } from "../actions/overview-player/search-player/op-load-player-id-request.action";



export const initialState: OverviewPlayerState = {
    id: '',
    user: {
        id: '',
        idRype: '',
        urlCover: '',
        nickname: '',
        name: '',
        lastname: '',
        email: '',
        url: '',
        country: '',
        birthday: undefined,
        verify: false,
        qtdPosts: 0,
        social: {
            discord: '',
            instagram: '',
            facebook: '',
            youtube: '',
            twitter: '',
            twitch: '',
            psn: '',
            xbox: '',
            idGame: '',
        },
        team: [
            {
                teamName: '',
                tagName: '',
                ranking: 0,
                admin: '',
                url: '',
                description: '',
                createdAt: undefined,
            },
        ],
        createdAt: undefined,
    },
    comments: [],
    timeline: [],
    OverviewPlayerError: undefined,
};

const _OverviewPlayerReducer = createReducer(
    initialState,

    on(new LoadOpRoutingIdAction().createAction(), (state, action) => ({
        ...initialState,
        id: action.payload,
        comments: [],
    })),
    on(new OpPlayerIdSuccessAction().createAction(), (state, action) => ({
        ...state,
        user: {...action.payload},
        comments: [],
    })),
    on(new OpPlayerIdRequestAction().createAction(), (state, action) => ({
        ...state,
        user: {...initialState.user},
        comments: [],
    })),
    on(new OpPlayerTimelineSuccessAction().createAction(), (state, action) => ({
        ...state,
        comments: [],
        timeline: [...action.payload],
    })),
    on(new FeedReactSucessAction().createAction(), (state, action) => {
        const newArray = [];

        for (let item of state.timeline) {
            if (item.id == action.payload.id) {
                newArray.push(action.payload);
            } else {
                newArray.push(item);
            }
        }

        return {
            ...state,
            timeline: newArray,
        }

    }),
    on(new FeedDeletePostSuccessAction().createAction(), (state, action) => {
        const newArray = [];

        for (let item of state.timeline) {
            if (item.id != action.payload) {
                newArray.push(item);
            }
        }

        return {
            ...state,
            timeline: newArray,
        }

    }),
   
    on(new FeedPostEditRequestAction().createAction(), (state, action) => {
        const newArray = [];

        for (let item of state.timeline) {
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
            timeline: newArray,
        }

    }),

    on(new PostCommentsLoadSuccessAction().createAction(), (state, action) => ({
        ...state,
        comments: [...action.payload]
    })),
    on(new PostCommentsCreateSuccessAction().createAction(), (state, action) => {

        let newArrayTimeLine = []
 

        for (let post of state.timeline) {
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
            timeline: newArrayTimeLine,

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
 

        for (let post of state.timeline) {
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
            timeline: newArrayTimeLine,
        }

    }),
    on(new PostCommentsLoadRequestAction().createAction(), (state, action) => ({
        ...state,
        comments: [],
    })),
    on(new OpGlobalErrorAction().createAction(), (state, action) => ({
        ...state,
        OverviewPlayerError: action.payload,
    })),
    
)

export function OverviewPlayerReducer(state: any, action: Action) {
    return _OverviewPlayerReducer(state, action);
}