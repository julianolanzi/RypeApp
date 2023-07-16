import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeedState } from "../states/feeed.state";

export const FeedGlobalSelector = createFeatureSelector<FeedState>('feed');

const _timeLine = (state: FeedState) => state.timeLine;
const _commentsPost = (state: FeedState) => state.comments;


export const TimeLineInfo = createSelector(FeedGlobalSelector, _timeLine);
export const ComentsPostInfo = createSelector(FeedGlobalSelector, _commentsPost);