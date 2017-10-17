import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'TODO';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null,
			comments: null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0],
				comments: [
					{ author: "Some person 1", text: "This is a comment about this video"},
					{ author: "Some person 2", text: "This is a comment about this video"},
					{ author: "Some person 3", text: "This is a comment about this video"},
					{ author: "Some person 4", text: "This is a comment about this video"}
				]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />

				<VideoDetail video={this.state.selectedVideo} comments={this.state.comments} />

				<VideoList
					onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
					videos={this.state.videos} />
			</div>
		);
	};
}

ReactDOM.render(<App />, document.querySelector('.container'))
