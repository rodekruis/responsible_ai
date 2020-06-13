import React from "react";
import imageMapResize from "image-map-resizer";
import { Link } from "react-router-dom";

const DEBOUNCED_RESIZE = ((fn, ms) => {
    let timer;
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null;
            fn();
        }, ms);
    };
})(imageMapResize, 100);

export default class Need extends React.Component {
    componentDidMount() {
        DEBOUNCED_RESIZE();
        window.addEventListener("resize", DEBOUNCED_RESIZE);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", DEBOUNCED_RESIZE);
    }
    render() {
        return (
            <div>
                <section className="container has-text-centered">
                    <Link
                        className="button is-primary is-outlined is-large is-fullwidth"
                        to="/fact"
                    >
                        Calculate F.A.C.T. Score
                    </Link>
                </section>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                The Need for Responsible A.I.
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <p>
                        Artificial Intelligence or A.I. encompasses a wide range
                        of fields and methods. Formulating a consistent
                        definition for A.I. remains evasive yet we attempt to
                        draw a framework to measure ethical practices. In order
                        to cast a wide net across the range of A.I. topics and
                        remain tangible in practical solutions, we rely on high
                        level abstractions of the involved components.
                    </p>
                    <img
                        className="components-image"
                        alt="Components of an A.I. project - Data, Model and Deploy"
                        src="components.png"
                        useMap="#component-image-map"
                    />
                    <label className="components-image-caption">
                        Click on the component circle to answer its questions.
                    </label>
                    <map name="component-image-map">
                        <area
                            shape="rect"
                            coords="100, 70, 458, 430"
                            alt="Data"
                            href="#/fact/data"
                        />
                        <area
                            shape="rect"
                            coords="565, 70, 923, 430"
                            alt="Model"
                            href="#/fact/model"
                        />
                        <area
                            shape="rect"
                            coords="1030, 70, 1388, 430"
                            alt="Deploy"
                            href="#/fact/deploy"
                        />
                    </map>
                    <p>
                        Any system can be modelled using input-process-output
                        with reasonable encapsulation of the concepts.
                        Similarly, an A.I. system can be represented using a
                        data-model-deploy pipeline.
                    </p>
                </div>
            </div>
        );
    }
}
