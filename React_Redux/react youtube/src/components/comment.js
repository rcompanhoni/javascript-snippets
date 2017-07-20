import React from 'react'

const Comment = ((comment) => {
    return(
        <div>
            <h4>From: {comment.author}</h4>
            <p>{comment.text}</p>
        </div>
    );
});

export default Comment;