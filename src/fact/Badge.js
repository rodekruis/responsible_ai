import React from "react";
import Img from "react-image";
import Score from "./Score";

export default class Badge extends React.Component {
    render() {
        const score = new Score({ score_value: this.props.score });
        const badge_color =
            this.props.score > score.state.danger_threshold
                ? this.props.score > score.state.success_threshold
                    ? "92d050"
                    : "ffc000"
                : "de656b";
        const badge_url =
            "https://img.shields.io/badge/F.A.C.T.-" +
            this.props.score +
            "-" +
            badge_color +
            ".svg?style=flat-square";
        return (
            <div className="level-item has-text-centered badge-interaction">
                <a className="has-text-black" href={badge_url}>
                    <p className="heading">Badge</p>
                    <p className="title">
                        <Img
                            src={badge_url}
                            alt={"F.A.C.T.: " + this.props.score}
                            loader={
                                <progress
                                    className="progress is-small is-primary"
                                    max="100"
                                >
                                    15%
                                </progress>
                            }
                        />
                    </p>
                </a>
            </div>
        );
    }
}
