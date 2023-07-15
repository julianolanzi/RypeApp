import { Action, createReducer, on } from "@ngrx/store";
import { OverviewPlayerState } from "../states/overview-player.state";
import { LoadOpRoutingIdAction } from "../actions/overview-player/rounting-id/op-load-routing-id.actions";
import { OpPlayerIdSuccessAction } from "../actions/overview-player/search-player/op-load-player-id-success.action";
import { OpGlobalErrorAction } from "../actions/overview-player/op-load-global-error.actions";



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
    OverviewPlayerError: undefined,
};

const _OverviewPlayerReducer = createReducer(
    initialState,

    on(new LoadOpRoutingIdAction().createAction(), (state, action) => ({
        ...state,
        id: action.payload,
        comments: [],
    })),
    on(new OpPlayerIdSuccessAction().createAction(), (state, action) => ({
        ...state,
        user: {...action.payload},
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