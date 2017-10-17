import React from 'react'

const CommentItem = ({author, text}) => {
    return(
        <div>
            <h4>From: {author}</h4>
            <p>{text}</p>
        </div>
    );
};

export default CommentItem;