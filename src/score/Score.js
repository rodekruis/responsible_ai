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

    render() {
        return (
            <div className="level-item has-text-centered">
                <div>
                    {this.props.label ? (
                        <p className="heading">{this.props.label}</p>
                    ) : null}
                    <p
                        className={
                            "title " +
                            (this.props.score_value <
                            this.state.danger_threshold
                                ? "has-text-danger"
                                : this.props.score_value >
                                  this.state.success_threshold
                                ? "has-text-success"
                                : "")
                        }
                    >
                        {this.props.score_value}%
                    </p>
                </div>
            </div>
        );
    }
}
