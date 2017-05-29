import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        const id = this.props.match.params.id; // match.params gives us access to the url query string
        this.props.fetchPost(id);
    }

    onDeleteClick() { 
        const id = this.props.match.params.id;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>

                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>

                <h3>{post.title}</h3>
                <h6>Categories: { post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// second parameter, 'ownProps', is a reference to 'props' used by the React component. 
// only the post with the id extracted from the URL route is made available to the component
function mapStateToProps({ posts }, ownProps) { 
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);