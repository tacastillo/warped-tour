import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import Bands from "./visualizations/Bands.js";
import PrettyPrint from "./visualizations/PrettyPrint.js";
import Beeswarm from "./visualizations/Beeswarm.js";

class Visualizations extends Component {


    constructor(props) {
        super(props);

        let data = require('./data/performers.json'),
            [minYear, maxYear] = d3.extent(data, (band) => band.years.length);

        this.state = {
            bandData: data,
            currentBand: {name: [..."Vans Warped Tour"], years: [1]},
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth,
            colorScale: d3.scaleOrdinal(d3.schemeCategory20c.reverse().slice(2))
                .domain(d3.range(minYear, maxYear+1))
        }        
        
    }

    componentDidMount() {
        this.bands = this.bandGroup.bands;
    }

    updateCurrentBand = (band) => {
        this.setState({currentBand: band});
    }

    render() {
        let viewbox = `0 0 ${this.state.width} ${this.state.height}`;
        return (
            <div>
            	<svg ref={(svg) => this.svg = svg} id="visualization" viewBox={viewbox} style={styles.svg} >
            		<Bands ref={(bands) => this.bandGroup = bands} {...this.state} color={this.colorScale} update={this.updateCurrentBand} {...this.props}/>
                    <PrettyPrint {...this.state} x={632} y={32}/>
                    <Beeswarm {...this.state} bands={this.bands} toggleSwarm={this.props.toggleSwarm}/>
                
            	</svg>
            </div>
        );
    }
}

let styles = {
	svg: {
        // height: "100%",
        // width: "100%",
		position: "fixed",
        top: 0,
        left: 0
	}
}

export default Visualizations;
