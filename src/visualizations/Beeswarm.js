import React, { Component } from 'react';
import * as d3 from 'd3';

class Beeswarm extends Component {

	inSwarm = false;

	componentDidUpdate(props) {
		this.renderSwarm(props);
	}

	shouldComponentUpdate(props) {
		return props.toggleSwarm !== (this.inSwarm);
	}
	
	renderSwarm(props) {
		if (!this.inSwarm) {
			let bands = d3.selectAll(".band");
			let container = d3.select(this.refs.axisContainer);
			let x = d3.scaleLog()
				.domain(d3.extent(props.bandData, (d) => d.years.length))
			    .rangeRound([props.width * 0.1, props.width * 0.9]);

		    let axis = d3.axisTop(x)
		    	.tickFormat(d3.format(",d"))
		    	.tickValues(x.ticks().concat(x.domain()));

		    container.append("g")
		    	.classed("swarm-axis", true)
		    	.attr("transform", `translate(0,${props.height*0.2})`)
		    	.call(axis);

	    	let buckets = Object.values(props.bandData.reduce((curr, d) => {
	    		let length = d.years.length;
	    		curr[length] = curr[length] ? curr[length] + 1 : 1;
	    		return curr;
	    	} , {}));
	    	container.append("g").selectAll("text")
	    		.data(buckets).enter()
	    		.append("text")
	    		.attr("x", (d,i) => { return x(i+1)})
	    		.attr("y", props.height*0.8)
	    		.attr("text-anchor", "middle")
	    		.text(d => d);

			let simulation = d3.forceSimulation(props.bandData)
				.force("x", d3.forceX(function(d) { return x(d.years.length); }).strength(0.25))
				.force("y", d3.forceY(props.height/2))
				.force("collide", d3.forceCollide(7))
				.stop()

			for (let i = 0; i < 50; ++i) simulation.tick();

			bands.transition().duration(1500).ease(d3.easeQuadIn)
				.attr("cx", (d) => d.x)
				.attr("cy", (d) => d.y);
				// .attr("cx", (d) => d.swarmX)
				// .attr("cy", (d) => d.swarmY);

			this.inSwarm = true;
		}
	}

    render() {
        return (
			<g ref='axisContainer' className='axisContainer'/>
        );
    }
}

export default Beeswarm;
