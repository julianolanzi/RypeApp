import { PostRequest } from "src/app/models/feed/post";
import { PostCreateSuccess } from "src/app/models/feed/post-create-sucess";
import { TimelineSuccess } from "src/app/models/feed/timeline-success";

export interface FeedState {
    createPost: PostRequest,
    createPostSucess: PostCreateSuccess,
    timeLine: TimelineSuccess[],
    feedError?: Error,
}