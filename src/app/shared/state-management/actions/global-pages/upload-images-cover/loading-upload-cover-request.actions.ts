import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { GlobalMessageEnum } from "../global-pages-message.enum";
import { RequestImagensCover } from "src/app/models/imgs/images-cover-request";

export class UploadImageCoverRequestAction implements CustomAction<RequestImagensCover> {
    readonly type: string = GlobalMessageEnum.UPDATE_IMG_COVER_REQUEST;
    constructor(public payload?: RequestImagensCover){}

    createAction():any {
        return createAction(this.type);
    }
}