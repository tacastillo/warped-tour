
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

const ExitColor = 'white',
      stroke = 'gray',
      EnterColor = 'white';

class Letter extends Component {
    state = {
        y: -60,
        x: 0,
        color: EnterColor,
        opacity: 1e-6,
    }

    componentWillEnter(callback) {
        let node = d3.select(ReactDOM.findDOMNode(this));

        this.setState({x: this.props.i*32});

        node.transition(this.transition)
            .attr('y', 0)
            .style('fill-opacity', 1)
            .style('stroke-opacity', 1)
            .on('end', () => {
                this.setState({y: 0, opacity: 1, color: this.props.fill});
                callback()
            });
    }

    componentWillLeave(callback) {
        let node = d3.select(ReactDOM.findDOMNode(this));

        this.setState({color: ExitColor});

        node.interrupt()
            .transition(this.transition)
            .attr('y', -60)
            .style('fill-opacity', 1e-6)
            .style('stroke-opacity', 1e-6)
            .on('end', () => {
                this.setState({y: -60, opacity: 1e-6});
                callback()
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.i !== nextProps.i) {
            let node = d3.select(ReactDOM.findDOMNode(this));

            this.setState({color: this.props.fill});

            node.transition(this.transition)
                .attr('x', nextProps.i*32)
                .on('end', () => this.setState({x: nextProps.i*32}));
        }
    }

    render() {
        return (
            <text dy=".35em"
                  stroke={stroke}
                  y={this.state.y}
                  x={this.state.x}
                  style={{fillOpacity: this.state.opacity,
          				  strokeOpacity: this.state.opacity,
                          fill: this.state.color,
                          font: 'bold 48px monospace'}}>
                {this.props.letter}
            </text>
        );
    }
};

export default Letter;