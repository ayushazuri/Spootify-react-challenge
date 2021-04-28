import "../styles/_discover.scss";

import React, { Component } from "react";

import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import makeRequest from "../../../apiRequest/makeRequest";

export default class Discover extends Component {
	constructor() {
		super();

		this.state = {
			newReleases: [],
			playlists: [],
			categories: [],
		};
	}

	async fetchData() {
		const newReleases = await makeRequest("new-releases");
		const playlists = await makeRequest("featured-playlists");
		const categories = await makeRequest("categories");
		const data = { ...this.state };

		data.newReleases = newReleases.data.albums.items;
		data.playlists = playlists.data.playlists.items;
		data.categories = categories.data.categories.items;

		this.setState(data);
	}
	componentDidMount() {
		this.fetchData();
	}
	render() {
		const { newReleases, playlists, categories } = this.state;

		return (
			<div className="discover">
				<DiscoverBlock
					text="RELEASED THIS WEEK"
					id="released"
					data={newReleases}
				/>
				<DiscoverBlock
					text="FEATURED PLAYLISTS"
					id="featured"
					data={playlists}
				/>
				<DiscoverBlock
					text="BROWSE"
					id="browse"
					data={categories}
					imagesKey="icons"
				/>
			</div>
		);
	}
}
