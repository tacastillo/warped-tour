import React, { Component } from 'react';

import * as d3 from "d3";
import _ from "lodash";

import Visualizations from "./Visualizations.js";
import Section from "./Section";

import './stylesheets/App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scrollDuration: 200,
			y: 0,
			width: document.documentElement.clientWidth,
			interpolateX: d3.interpolate(0, document.documentElement.clientWidth),
			toggleSwarm: false
		}
	}

	componentDidMount() {
		this.onScroll();
		window.addEventListener('scroll', _.throttle(this.onScroll, this.state.scrollDuration / 2));
	}

	onScroll = () => {
		let scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
		this.setState(() => { return { y:  scrollTop }});
	}

	onClick = () => {
		console.log("yee click")
        this.setState((state) => {
            return { toggleSwarm: !state.toggleSwarm };
        });
	}

	render() {
		let areas = [1, 2, 3, 4, 5];
		let sections = _.map(areas, (area, i) => {
			return <Section key={i} onClick={this.onClick} index={i} value={this.state.y}/>
		});
		return (
			<div>
				<Visualizations {...this.state}/>
				{sections}
			</div>
		);
	}
}

let styles = {

};

export default App;