import React, { Component } from 'react';
import * as d3 from "d3";

const stroke = "white",
    bandSize = 14;

class Bands extends Component {

    componentDidMount() {
    	this.container = d3.select(this.refs.bandContainer);
    	this.renderBands(this.props);
    }

    renderBands(props) {
        let that = this;
        

    	this.bands = this.container.selectAll(".band")
    		.data(props.bandData, d => d.name);

    	let bandLength = this.props.bandData.length;
        let height = document.documentElement.clientHeight - bandSize/2;
        let width = document.documentElement.clientWidth - bandSize/2;
        let widthBoundary = width/3 > 400 ? width/3 : width/2;
        widthBoundary -= widthBoundary % bandSize;
        width -= width % bandSize;
        height -= height % bandSize;

        this.xScale = d3.scaleOrdinal()
            .domain(d3.range(0, bandLength))
            .range(d3.range(0, widthBoundary, bandSize));

        this.yScale = d3.scaleQuantize()
            .domain([0, bandLength])
            .range(d3.range(0, height, bandSize*1.5));

    	this.bands.enter().append("circle")
            .attr("r", 5)
            .attr("stroke", stroke)
            .attr("stroke-width", 1)
            .attr("fill", (d) => props.colorScale(d.years.length))
            .attr("cx", (d, i) => (this.xScale(i) - bandSize/2))
            .attr("cy", (d, i) => (props.height * -1))
    		.classed("band", true)            
            .on("mouseover", function(d) {
                let current = d3.select(this);
                that.props.update(d);
                current.raise();
                current.transition()
                    .attr("r", 8)
                    .attr("stroke-width", 1.5)
            })
            .on("mouseout", function(d) {
                let current = d3.select(this);
                current.transition()
                    .attr("r", 5)
                    .attr("stroke-width", 1)
            });

        this.nodes = this.container.selectAll(".band");

        this.arrangeBands(props);
    }

    arrangeBands = (props) => {
        d3.selectAll(".band")
            .transition().duration(1000)
            .delay((d, i) => (750 - (Math.random()* props.bandData.length)))
            .ease(d3.easeCircleInOut)
            .attr("cx", (d, i) => (this.xScale(i) - bandSize/2))
            .attr("cy", (d, i) => (this.yScale(i) + bandSize/2))
    }

    render() {
        return (
			<g ref='bandContainer' className='bands'/>
        );
    }
}

export default Bands;
