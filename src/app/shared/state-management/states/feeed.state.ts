import { LoadCommentsSuccess } from "src/app/models/feed/comments/comments-load-success";
import { PostCreateRequest } from "src/app/models/feed/create-post/post-create-request";
import { PostCreateSuccess } from "src/app/models/feed/create-post/post-create-sucess";
import { TimelineSuccess } from "src/app/models/feed/timeline/timeline-success";

export interface FeedState {
    createPost: PostCreateRequest,
    createPostSucess: PostCreateSuccess,
    timeLine: TimelineSuccess[],
    comments: LoadCommentsSuccess[],
    feedError?: Error,
}