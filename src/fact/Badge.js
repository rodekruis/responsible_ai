import React from "react";
import Img from "react-image";

export default class Badge extends React.Component {
    render() {
        const badge_url =
            "https://img.shields.io/badge/F.A.C.T.-" +
            this.props.score +
            "-291AE0.svg?style=flat-square";
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
