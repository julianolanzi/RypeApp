import { ActionCreator, TypedAction } from "@ngrx/store/src/models";

export interface CustomAction<T> extends TypedAction<string> {
    readonly type: string;

    payload?: T;

    createAction(): ActionCreator;
}