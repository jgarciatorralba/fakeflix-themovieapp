import React from "react";

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
    <div>
      <h1>Comments</h1>
    </div>
  );
}

export default Comments;
