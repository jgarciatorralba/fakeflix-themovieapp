import React from "react";

import moment from "moment";

import "./Comments.scss";

function Comments({
  comments,
  commentsLoading,
  commentsLoadingError,
  addComment,
  removeComment,
  commentUpdating,
  commentUpdatingError,
  commentAdded,
  commentRemoved,
  currentUser,
}) {
  console.log(currentUser);
  console.log(comments);

  return (
    <div className="Comments my-3 px-3">
      <h5 className="section-title my-0">Comments</h5>
      <div className="comment-cont my-3">
        {commentsLoadingError && (
          <div className="d-flex justify-content-center align-items-center border rounded m-1 w-100 mx-auto p-3 error-cont">
            <div>
              <p className="my-2 text-center">
                Whoops, something went wrong...
              </p>
              <p className="my-2 text-center">{commentsLoadingError}</p>
            </div>
          </div>
        )}

        {commentsLoading && (
          <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto loading-cont">
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 16 16"
              className="bi bi-hourglass-split"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"
              />
            </svg>
          </div>
        )}

        {comments &&
          (comments.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center m-1 w-100 mx-auto empty-cont rounded">
              <p className="p-3 my-0">This movie has no comments yet.</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="row px-0 mx-0 py-3 border-top">
                <div className="col-2 col-sm-1 px-1 px-sm-3 text-center">
                  <img
                    alt="User profile"
                    src={comment.user.avatar}
                    className="avatar rounded"
                  />
                </div>
                <div className="col-10 col-sm-11 pr-3 btn-cont">
                  {comment.user.username === currentUser.username && (
                    <button className="btn btn-sm btn-outline-light rounded btn-delete">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1rem"
                        height="1rem"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  )}
                  <p className="d-inline-block comment-owner mr-2">
                    <b>{comment.user.username}</b>
                  </p>
                  <p className="d-inline-block comment-time">
                    {new moment(comment.createdAt).fromNow()}
                  </p>
                  <p className="comment-content my-0">{comment.content}</p>
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}

export default Comments;