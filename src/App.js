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
                            <span className="navbar-link">
                                Responsible A.I.
                            </span>

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
                Yes/No questions. Select any tab to get started.
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
            <div>
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
                    <img
                        className="blame-image"
                        alt="Who is to blame when an A.I. decision goes bad?"
                        src="blame.png"
                    />
                    <div className="has-text-centered">
                        <a href="http://www.drawingsofdogs.co.uk/">
                            <small>Image Source: Drawings of Dogs</small>
                        </a>
                    </div>
                    <br />
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
                    />
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
            <div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Glossary</h1>
                            <h1 className="subtitle">
                                Definitions of terms, phrases and abbreviations
                                used in our questions.
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="term-column-header">TERM</th>
                                <th>DEFINITION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>COCO</td>
                                <td>
                                    <a href="http://cocodataset.org/">
                                        Common Objects in Context
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Fairness</td>
                                <td>
                                    Decisions are unbiased to identity features
                                    such as gender, race, nationality, sexual
                                    orientation, religion, political opinion,
                                    skin colour, education, address and age.
                                </td>
                            </tr>
                            <tr>
                                <td>Accountability</td>
                                <td>
                                    Decisions should be traceable, reproducible
                                    and liable. All decisions and their
                                    consequences must be owned and explained by
                                    the decision maker or administrator of the
                                    decision maker.
                                </td>
                            </tr>
                            <tr>
                                <td>Confidentiality</td>
                                <td>
                                    Personal information which can be used to
                                    identify individuals or communities must be
                                    secure and above intentional or accidental
                                    misuse.
                                </td>
                            </tr>
                            <tr>
                                <td>Transparency</td>
                                <td>
                                    Understanding why a decision is made is key
                                    to establishing trust in the decision
                                    process. Accompanying decisions with
                                    explanations and analysis reports help
                                    understand the outcome.
                                </td>
                            </tr>
                            <tr>
                                <td>Data</td>
                                <td>
                                    Refers to interpretable information in the
                                    context of the world. Data can be in the
                                    form of text, numbers, images, audio, video,
                                    co-ordinates, address, email, phone numbers,
                                    names, machine logs, journals, sensor
                                    readings, etc. In our context, data
                                    encapsulates all text/media/documents
                                    related to the project and not limited to
                                    only datasets used for modelling and
                                    analyses.
                                </td>
                            </tr>
                            <tr>
                                <td>Model</td>
                                <td>
                                    Refers to a function or process which uses
                                    data to draw inferences about the world.
                                    Models can be statistical, symbolic,
                                    mathematical, deterministic, stochastic,
                                    neural networks, flow charts, black-box,
                                    white-box, decision trees, etc. In our
                                    context, model represents the world in which
                                    the decisions are effective and the
                                    consequences of the decisions have
                                    repercussions.
                                </td>
                            </tr>
                            <tr>
                                <td>Deploy(ment)</td>
                                <td>
                                    Refers to a system which uses the model to
                                    make inferences on unseen events of the
                                    world. A deployment can be a script, a
                                    function in a program, an excel sheet, a web
                                    application, a decision making system, a
                                    toolkit, a library package, a form, a
                                    program, an application, a mobile app, a
                                    feature in a mobile app, etc. In our
                                    context, a deployment is an implementation
                                    of the model which is used to make
                                    inferences on unseen data. An implementation
                                    can refer to both online and offline use of
                                    the model.
                                </td>
                            </tr>
                            <tr>
                                <td>Feature Imbalance</td>
                                <td>
                                    When a subset of features in the dataset
                                    contain most of the useful information to
                                    represent the datapoint. Also applies to
                                    range of the feature values.
                                </td>
                            </tr>
                            <tr>
                                <td>Class Imbalance</td>
                                <td>
                                    When a subset of the classes are represented
                                    by most of the datapoints in the dataset.
                                    Ideally, the training set should
                                    sufficiently represent the test set.
                                </td>
                            </tr>
                            <tr>
                                <td>Hyper-parameter</td>
                                <td>
                                    A parameter that is set before the learning
                                    process begins. It affects the performance
                                    of the model.
                                </td>
                            </tr>
                            <tr>
                                <td>Optimal Hyper-parameter</td>
                                <td>
                                    A hyper-parameter value which achieves the
                                    model’s best performance is said to be
                                    optimal.
                                </td>
                            </tr>
                            <tr>
                                <td>Active Learning</td>
                                <td>
                                    A special case of machine learning in which
                                    a learning algorithm is able to
                                    interactively query the user to obtain the
                                    desired outputs at new data points.
                                </td>
                            </tr>
                            <tr>
                                <td>Decision Workflow</td>
                                <td>
                                    A subset of the process which only contains
                                    decision nodes. Applies only to non-trivial
                                    system where an instance of the process does
                                    not explore the whole system.
                                </td>
                            </tr>
                            <tr>
                                <td>Dataset</td>
                                <td>
                                    A set of datapoints which serve as input and
                                    labels to a prediction model. The dataset
                                    includes all datapoints with and without
                                    corresponding labels. Only the datapoints
                                    with labels can be used in the training,
                                    validation and test sets.
                                </td>
                            </tr>
                            <tr>
                                <td>Training Set</td>
                                <td>
                                    A subset of the dataset used to teach the
                                    model about the data. Usually, 80% of the
                                    labelled dataset.
                                </td>
                            </tr>
                            <tr>
                                <td>Validation Set</td>
                                <td>
                                    A subset of the dataset used to tune the
                                    model with respect to the data. Usually, 10%
                                    of the labelled dataset.
                                </td>
                            </tr>
                            <tr>
                                <td>Test Set</td>
                                <td>
                                    A subset of the dataset used to evaluate the
                                    model on the data. Usually, 10% of the
                                    labelled dataset.
                                </td>
                            </tr>
                            <tr>
                                <td>Inference Set</td>
                                <td>
                                    All datapoints which are not in the
                                    training, validation, test sets. These
                                    datapoints can be with and without
                                    corresponding labels.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render_feedback() {
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
