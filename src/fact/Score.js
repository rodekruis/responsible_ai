import React from "react";

const DEFAULT_DANGER_THRESHOLD = 30;
const DEFAULT_SUCCESS_THRESHOLD = 70;

export default class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            danger_threshold:
                this.props.danger_threshold || DEFAULT_DANGER_THRESHOLD,
            success_threshold:
                this.props.success_threshold || DEFAULT_SUCCESS_THRESHOLD,
        };
    }

    color_class() {
        return this.props.score_value < this.state.danger_threshold
            ? "has-text-danger"
            : this.props.score_value > this.state.success_threshold
            ? "has-text-success"
            : "";
    }

    advice() {
        return this.props.score_value < this.state.danger_threshold
            ? "Try to get more 'Yes' answers to improve your score."
            : this.props.score_value > this.state.success_threshold
            ? "You're doing great!"
            : "Try to get more 'Yes' answers to improve your score.";
    }

    render() {
        return (
            <div className="level-item has-text-centered">
                <div
                    className="has-tooltip-bottom"
                    data-tooltip={this.advice()}
                >
                    {this.props.label ? (
                        <p className="heading">{this.props.label}</p>
                    ) : null}
                    <p className={"title " + this.color_class()}>
                        {this.props.score_value}%
                    </p>
                </div>
            </div>
        );
    }
}
