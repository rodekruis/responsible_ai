import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bulma";
import "./app.css";

const DEFAULT_ANSWER = "idk";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            active_component: null,
        };
    }

    componentDidMount() {
        this.setState({
            questions: require("./rubric.json").questions.map(item => {
                item.answer = DEFAULT_ANSWER;
                return item;
            }),
        });
    }

    render_navbar() {
        return (
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://www.510.global/">
                        <img
                            src="/510-logo.png"
                            alt="www.510.global"
                            width="74"
                            height="24.75"
                        />
                    </a>

                    <a
                        href="#/"
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="side-menu"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="side-menu" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="#/">
                                Responsible A.I.
                            </a>

                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to="/">
                                    The Need for Responsible A.I.
                                </Link>
                                <Link className="navbar-item" to="/fact">
                                    Calculate F.A.C.T. Score
                                </Link>
                                <Link className="navbar-item" to="/glossary">
                                    Glossary
                                </Link>
                                <Link className="navbar-item" to="/contact">
                                    Contact
                                </Link>
                                <hr className="navbar-divider" />
                                <Link className="navbar-item" to="/feedback">
                                    Feedback
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    set_active_component(component_name) {
        return () => {
            this.setState({ active_component: component_name });
        };
    }

    load_tabs() {
        return (
            <section className="section">
                <div className="tabs is-centered is-boxed is-medium">
                    <ul>
                        <li
                            className={
                                this.state.active_component === "data"
                                    ? "is-active"
                                    : ""
                            }
                        >
                            <a
                                href="#/"
                                onClick={this.set_active_component("data")}
                            >
                                <span>Data</span>
                            </a>
                        </li>
                        <li
                            className={
                                this.state.active_component === "model"
                                    ? "is-active"
                                    : ""
                            }
                        >
                            <a
                                href="#/"
                                onClick={this.set_active_component("model")}
                            >
                                <span>Model</span>
                            </a>
                        </li>
                        <li
                            className={
                                this.state.active_component === "deploy"
                                    ? "is-active"
                                    : ""
                            }
                        >
                            <a
                                href="#/"
                                onClick={this.set_active_component("deploy")}
                            >
                                <span>Deploy</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }

    change_answer(index) {
        return event => {
            let updated_questions = this.state.questions;
            updated_questions[index].answer = event.target.value;
            this.setState({
                questions: updated_questions,
            });
        };
    }

    load_question(item, index) {
        return (
            <div
                className={
                    "field is-horizontal" +
                    (item.component === this.state.active_component
                        ? ""
                        : " is-hidden")
                }
            >
                <div className="field-label is-size-4">{item.question}</div>
                <div className="field-body">
                    <div className="select">
                        <select
                            value={item.answer}
                            onChange={this.change_answer(index)}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="idk">I don't know</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    load_questions() {
        return this.state.questions.map((item, index) => {
            return <div key={index}>{this.load_question(item, index)}</div>;
        });
    }

    no_active_component() {
        return (
            <div className="has-text-centered">
                Calculate your F.A.C.T. score by answering a set of simple
                Yes/No questions. Select a any tab to get started.
            </div>
        );
    }

    load_scoreboard() {
        return (
            <div>
                {this.load_fact_score()}
                {this.load_component_scoreboard()}
                {this.load_metric_scoreboard()}
            </div>
        );
    }

    load_fact_score() {
        return (
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="title">F.A.C.T. Score</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="title">{this.calculate_score()}%</p>
                    </div>
                </div>
            </nav>
        );
    }

    load_metric_scoreboard(component) {
        return (
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Fairness</p>
                        <p className="title">
                            {this.calculate_score("fairness", component)}%
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Accountability</p>
                        <p className="title">
                            {this.calculate_score("accountability", component)}%
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Confidentiality</p>
                        <p className="title">
                            {this.calculate_score("confidentiality", component)}
                            %
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Transparency</p>
                        <p className="title">
                            {this.calculate_score("transparency", component)}%
                        </p>
                    </div>
                </div>
            </nav>
        );
    }

    load_component_scoreboard() {
        return (
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Data</p>
                        <p className="title">
                            {this.calculate_score(null, "data")}%
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Model</p>
                        <p className="title">
                            {this.calculate_score(null, "model")}%
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Deploy</p>
                        <p className="title">
                            {this.calculate_score(null, "deploy")}%
                        </p>
                    </div>
                </div>
            </nav>
        );
    }

    render_need_for_responsible_ai() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">The Need for Responsible A.I.</h1>
                        <h1 className="subtitle">Blah de blah de blah...</h1>
                    </div>
                </div>
            </section>
        );
    }

    render_calculate_fact_score() {
        return (
            <div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Calculate F.A.C.T. Score</h1>
                            <h1 className="subtitle">
                                Our scores reflect fairness, accountability,
                                confidentiality and transparency in your A.I.
                                project.
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="container">
                    {this.load_scoreboard()}
                    {this.load_tabs()}
                    {this.state.active_component
                        ? this.load_metric_scoreboard(
                              this.state.active_component
                          )
                        : null}
                    {this.state.active_component
                        ? this.load_questions(this.state.active_component)
                        : this.no_active_component()}
                </div>
            </div>
        );
    }

    render_glossary() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Glossary</h1>
                        <h1 className="subtitle">Blah de blah de blah...</h1>
                    </div>
                </div>
            </section>
        );
    }

    render_contact() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Contact</h1>
                        <h1 className="subtitle">Blah de blah de blah...</h1>
                    </div>
                </div>
            </section>
        );
    }

    render_feedback() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Feedback</h1>
                        <h1 className="subtitle">Blah de blah de blah...</h1>
                    </div>
                </div>
            </section>
        );
    }

    calculate_score(metric, component) {
        let numerator = this.state.questions
            .map(question => {
                const answer_weight = question.answer === "yes";
                const component_weight = component
                    ? question.component === component
                    : 1;
                return (
                    answer_weight *
                    component_weight *
                    // question.weight *
                    (metric
                        ? question[metric]
                        : question.fairness +
                          question.accountability +
                          question.confidentiality +
                          question.transparency)
                );
            })
            .reduce((accumulator, current) => accumulator + current, 0);
        let denominator = this.state.questions
            .map(question => {
                const component_weight = component
                    ? question.component === component
                    : 1;
                return Math.max(
                    0, // question.weight *
                    component_weight *
                        (metric
                            ? question[metric]
                            : question.fairness +
                              question.accountability +
                              question.confidentiality +
                              question.transparency)
                );
            })
            .reduce((accumulator, current) => accumulator + current, 0);
        return Math.max(0, Math.round(100 * (numerator / denominator)));
    }

    render_footer() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Responsible A.I.</strong> by{" "}
                        <a href="https://www.510.global/">510.global</a> under
                        the{" "}
                        <a href="https://github.com/gulfaraz/responsible_ai/blob/master/LICENSE">
                            GPL-3.0 license
                        </a>
                        .
                    </p>
                </div>
            </footer>
        );
    }

    render() {
        return (
            <div className="responsible-ai">
                <Router>
                    <div className="router-content">
                        {this.render_navbar()}
                        <Switch>
                            <Route path="/fact">
                                {this.render_calculate_fact_score()}
                            </Route>
                            <Route path="/glossary">
                                {this.render_glossary()}
                            </Route>
                            <Route path="/contact">
                                {this.render_contact()}
                            </Route>
                            <Route path="/feedback">
                                {this.render_feedback()}
                            </Route>
                            <Route path="/">
                                {this.render_need_for_responsible_ai()}
                            </Route>
                        </Switch>
                    </div>
                </Router>
                {this.render_footer()}
            </div>
        );
    }
}
