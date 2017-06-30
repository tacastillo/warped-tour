import React, { Component } from 'react';

class Section extends Component {

    render() {
        return (
            <div onClick={this.props.onClick} style={styles.section}>
            	<div style={styles.contentContainer}>
	            	{this.props.value}
            	</div>
            </div>
        );
    }
}

let styles = {
	section: {
		height: "100vh",
		width: "100vw",
		display: "flex"
	},
	contentContainer: {
		height: "20%",
		width: "15%",
		minWidth: "12rem",
		maxWidth: "95vw",
		margin: "50vh 5vw auto auto",
		padding: "2%",
		backgroundColor: "lightblue",
		zIndex: "1",
		opacity: "0.9"
	}
}

export default Section;
