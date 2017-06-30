import React, { Component } from 'react';
import { TransitionGroup }from 'react-transition-group';

import * as d3 from 'd3';

import Letter from './Letter';

class PrettyPrint extends Component {
    state = {
        currentBand: {name: [], years: []} 
    };

    componentDidMount() {
        this.setBand(this.props);
    }

    shouldComponentUpdate(props) {
        return this.state.currentBand.name !== props.currentBand.name;
    }

    componentWillReceiveProps(nextProps) {
        this.setBand(nextProps);
    }

    setBand(props) {
        this.setState((state) => {
            return {
                currentBand: props.currentBand
            }
        });
    }

    render() {
        let transform = `translate(${this.props.x}, ${this.props.y})`,
            transition = d3.transition()
                           .duration(750)
                           .ease(d3.easeCubicInOut);

        return (
            <g transform={transform}>
                <TransitionGroup component="g">
                    {[...this.state.currentBand.name].map((d, i) => (
                        <Letter letter={d} i={i}
                                key={`letter-${d}-${Math.random()*5}`}
                                transition={transition}
                                fill={this.props.colorScale(this.state.currentBand.years.length)}/>
                     ))}
                </TransitionGroup>
            </g>
        );
    }
}

export default PrettyPrint;