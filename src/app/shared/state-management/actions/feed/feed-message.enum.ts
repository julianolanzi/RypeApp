export enum FeedMessageEnum {
    LOAD_FEED_POST_REQUEST = '[FEED] Load feed post request',
    LOAD_FEED_POST_IMAGE_REQUEST = '[FEED] Load feed post image request',
    LOAD_FEED_POST_SUCCESS = '[FEED] Load feed post success',

    LOAD_FEED_TIMELINE_REQUEST = '[FEED] Load feed timeline request',
    LOAD_FEED_TIMELINE_SUCCESS = '[FEED] Load feed timeline success',

    LOAD_FEED_REACT_POST_REQUEST = '[FEED] Load react post request',
    LOAD_FEED_REACT_POST_SUCCESS = '[FEED] Load react post success',

    LOAD_FEED_DELETE_POST_REQUEST = '[FEED] Load delete post request',
    LOAD_FEED_DELETE_POST_IMAGE_REQUEST = '[FEED] Load delete post img request',
    LOAD_FEED_DELETE_POST_SUCCESS = '[FEED] Load delete post success',

    LOAD_FEED_POST_EDIT_REQUEST = '[FEED] Load feed post edit request',
    LOAD_FEED_POST_EDIT_SUCCESS = '[FEED] Load feed post edit success',


    LOAD_COMMENTS_POST_REQUEST = '[COMMENTS] Load comments post request',
    LOAD_COMMENTS_POST_SUCCESS = '[COMMENTS] Load comments post success',
    LOAD_COMMENTS_POST_CLEAR = '[COMMENTS] Clear comments post',

    LOAD_CREATE_COMMENTS_POST_REQUEST = '[COMMENTS] Load comments create request',
    LOAD_CREATE_COMMENTS_POST_SUCCESS = '[COMMENTS] Load comments create success',

    LOAD_DELETE_COMMENTS_POST_REQUEST = '[COMMENTS] Load comments delete request',
    LOAD_DELETE_COMMENTS_POST_SUCCESS = '[COMMENTS] Load comments delete success',


    LOAD_GLOBAL_ERROR = '[FEED] Load feed error',
}