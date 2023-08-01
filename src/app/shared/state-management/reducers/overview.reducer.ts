import { Action, createReducer, on } from "@ngrx/store";
import { LoadOpRoutingIdAction } from "../actions/overview/user/rounting-id/op-load-routing-id.actions";
import { OpGlobalErrorAction } from "../actions/overview/op-load-global-error.actions";
import { OpPlayerTimelineSuccessAction } from "../actions/overview/user/load-timeline/op-load-timeline-success-actions";
import { FeedReactSucessAction } from "../actions/feed/react-post/feed-load-react-success.actions";
import { FeedDeletePostSuccessAction } from "../actions/feed/delete-post/feed-load-delete-post-success.actions";
import { FeedPostEditRequestAction } from "../actions/feed/edit-post/feed-edit-post-request.actions";
import { PostCommentsLoadSuccessAction } from "../actions/feed/comments-load/feed-load-comments-post-success.actions";
import { PostCommentsCreateSuccessAction } from "../actions/feed/comments-create/load-create-comment-success.actions";
import { PostCommentsDeleteSuccessAction } from "../actions/feed/comments-delete/load-delete-comment-success.actions";
import { PostCommentsLoadRequestAction } from "../actions/feed/comments-load/feed-load-comments-post-request.actions";
import { OpPlayerIdRequestAction } from "../actions/overview/user/search-player/op-load-player-id-request.action";
import { OverviewState } from "../states/overview.state";
import { LoadOpRoutingTeamIdAction } from "../actions/overview/team/routing-id-team/op-load-routing-team-id.actions";
import { OpTeamIdSuccessAction } from "../actions/overview/team/load-info-team/op-load-team-id-success.action";
import { OpPlayerIdSuccessAction } from "../actions/overview/user/search-player/op-load-player-id-success.action";
import { OpTeamIdRequestAction } from "../actions/overview/team/load-info-team/op-load-team-id-request.action";



export const initialState: OverviewState = {
    id: '',
    idTeam: '',
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
                _id: '',
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
    team: {
        _id: '',
        idTeam: '',
        name: '',
        tagName: '',
        ranking: '',
        admin: {
            url: '',
            nickname: '',
            country: '',
        },
        description: '',
        emailTeam: '',
        discordTeam: '',
        facebookTeam: '',
        youtubeTeam: '',
        instagramTeam: '',
        url: '',
        urlCover: '',
        members: [],
        adminMembers: [],
        lines: [],
        private: false,

        createdAt: undefined,
    },
    OverviewPlayerError: undefined,
};

const _OverviewReducer = createReducer(
    initialState,

    on(new LoadOpRoutingIdAction().createAction(), (state, action) => ({
        ...state,
        id: action.payload,
    })),
    on(new LoadOpRoutingTeamIdAction().createAction(), (state, action) => ({
        ...state,
        idTeam: action.payload,
    })),
    on(new OpPlayerIdRequestAction().createAction(), (state, action) => ({
        ...state,
        user: { ...initialState.user },
        comments: [...initialState.comments],
        timeline: [...initialState.timeline],
    })),
    on(new OpTeamIdRequestAction().createAction(), (state, action) => ({
        ...state,
        team: { ...initialState.team },
    })),
    on(new OpPlayerIdSuccessAction().createAction(), (state, action) => ({
        ...state,
        user: { ...action.payload },
        comments: [],
    })),
    on(new OpTeamIdSuccessAction().createAction(), (state, action) => ({
        ...state,
        team: { ...action.payload },

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

export function OverviewReducer(state: any, action: Action) {
    return _OverviewReducer(state, action);
}