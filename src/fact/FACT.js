import React from "react";
import Score from "./Score";
import Report from "./Report";
import Badge from "./Badge";

const DEFAULT_ANSWER = "idk";
const NO_ANSWER = "idk";

const ANSWER_KEY = {
    yes: "Yes",
    no: "No",
    idk: "I don't know",
};

export default class FACT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            active_component: window.location.hash
                ? window.location.hash.substr(7)
                : "data",
        };
    }

    componentDidMount() {
        this.setState({
            questions: require("../rubric.json").questions.map(item => {
                item.answer = DEFAULT_ANSWER;
                return item;
            }),
        });
    }

    calculate_score(metric, component, questions = this.state.questions) {
        let numerator = questions
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
        let denominator = questions
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
        const fact_score = this.calculate_score();
        return (
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="title">F.A.C.T. Score</p>
                    </div>
                </div>
                <Score score_value={fact_score} />
                <Report
                    answer_key={ANSWER_KEY}
                    calculate_score={this.calculate_score}
                    questions={this.state.questions}
                    no_answer={NO_ANSWER}
                />
                <Badge score={fact_score} />
            </nav>
        );
    }

    load_component_scoreboard() {
        return (
            <nav className="level">
                <Score
                    label="Data"
                    score_value={this.calculate_score(null, "data")}
                />
                <Score
                    label="Model"
                    score_value={this.calculate_score(null, "model")}
                />
                <Score
                    label="Deploy"
                    score_value={this.calculate_score(null, "deploy")}
                />
            </nav>
        );
    }

    load_metric_scoreboard(component) {
        return (
            <nav className="level">
                <Score
                    label="Fairness"
                    score_value={this.calculate_score("fairness", component)}
                />
                <Score
                    label="Accountability"
                    score_value={this.calculate_score(
                        "accountability",
                        component
                    )}
                />
                <Score
                    label="Confidentiality"
                    score_value={this.calculate_score(
                        "confidentiality",
                        component
                    )}
                />
                <Score
                    label="Transparency"
                    score_value={this.calculate_score(
                        "transparency",
                        component
                    )}
                />
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
                                href="#/fact/data"
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
                                href="#/fact/model"
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
                                href="#/fact/deploy"
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
                            {Object.entries(ANSWER_KEY).map(
                                ([answer_key, answer_value]) => {
                                    return (
                                        <option
                                            value={answer_key}
                                            key={answer_key}
                                        >
                                            {answer_value}
                                        </option>
                                    );
                                }
                            )}
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
                Yes/No questions. Select any tab to get started.
            </div>
        );
    }

    answer_summary(component) {
        return (
            <div className="field is-horizontal is-size-4">
                <div className="field-label"># Answered</div>
                <div className="field-body">
                    {
                        this.state.questions.filter(
                            question =>
                                question.component === component &&
                                question.answer !== NO_ANSWER
                        ).length
                    }
                    /
                    {
                        this.state.questions.filter(
                            question => question.component === component
                        ).length
                    }
                </div>
            </div>
        );
    }

    render() {
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
                    {this.answer_summary(this.state.active_component)}
                    {this.state.active_component
                        ? this.load_questions()
                        : this.no_active_component()}
                </div>
            </div>
        );
    }
}
