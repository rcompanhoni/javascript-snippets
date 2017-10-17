import React from 'react';
import CommentItem from './comment_item';

const CommentList = (props) => {
    const commentItems = props.comments.map((comment) => {
        return (
            <li className="list-group-item">
                <CommentItem author={comment.author} text={comment.text} />
            </li>
        );
    });

    return(
        <div>
            <h4>Comments</h4>

            <ul className="list-group">
                {commentItems}
            </ul>
        </div>
    );
};

export default CommentList;