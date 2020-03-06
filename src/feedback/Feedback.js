import React from "react";

export default class Feedback extends React.Component {
    render() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            <a href="mailto:grahman@rodekruis.nl?subject=Responsible A.I.">
                                Email
                            </a>{" "}
                            us your feedback.
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}
