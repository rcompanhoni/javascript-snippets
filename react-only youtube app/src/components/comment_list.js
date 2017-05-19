import _ from 'lodash';
import React from 'react';

import Comment from './comment';

const CommentList = ({comments}) => {
    const commentComponent = <div>Loading comment...s</div>;

    if (!_.isEmpty(comments)) {
        commentComponents = comments.map((comment) => {
            return (
                <div>TODO- comment </div>
            );
        });
    }

    return(
        <div>
            <h4>Comments</h4>

            <ul className="col-md-4 list-group">
                <li>TODO - comment</li>
            </ul>
        </div>
    );
};

export default CommentList;