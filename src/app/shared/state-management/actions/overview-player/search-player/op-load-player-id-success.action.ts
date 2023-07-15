import { createAction } from "@ngrx/store";
import { OverviewPlayerMessageEnum } from "../overview-player-message.enum";
import { CustomAction } from "../../custom.actions";
import { PlayerSuccessResponse } from "src/app/models/overview-player/player/player-success-respose";



export class OpPlayerIdSuccessAction implements CustomAction<PlayerSuccessResponse> {
    readonly type: string = OverviewPlayerMessageEnum.LOAD_PLAYER_ID_SUCCESS;

    constructor(public payload?: PlayerSuccessResponse) { }

    createAction(): any {
        return createAction(this.type);
    }
}