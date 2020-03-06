import React from "react";

import * as jsPDF from "jspdf";
import "jspdf-autotable";

const TITLE_FONT_SIZE = 36;
const HEADER_FONT_SIZE = 24;
const TIMESTAMP_FONT_SIZE = 11;
const TEXT_FONT_SIZE = 14;

export default class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_report_modal: false,
            project_name: "",
            evaluator_name: "",
            project_comments: "",
        };
    }

    toggle_report_modal(show_modal) {
        this.setState({
            show_report_modal: show_modal,
        });
    }

    update_input_value(variable_name) {
        return event => {
            let update_dict = {};
            update_dict[variable_name] = event.target.value;
            this.setState(update_dict);
        };
    }

    render_report_modal() {
        return (
            <div
                className={
                    "modal" + (this.state.show_report_modal ? " is-active" : "")
                }
            >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            Export Responsibility Report
                        </p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => this.toggle_report_modal(false)}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">
                                Project Name
                                <span className="has-text-danger"> *</span>
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="e.g Alpha Go"
                                    value={this.state.project_name}
                                    onChange={this.update_input_value(
                                        "project_name"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                Evaluator Name
                                <span className="has-text-danger"> *</span>
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="e.g. Lee Sedol"
                                    value={this.state.evaluator_name}
                                    onChange={this.update_input_value(
                                        "evaluator_name"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Comments</label>
                            <div className="control">
                                <textarea
                                    className="textarea has-fixed-size"
                                    placeholder="e.g. AlphaGo is a computer program that plays the board game Go."
                                    value={this.state.project_comments}
                                    onChange={this.update_input_value(
                                        "project_comments"
                                    )}
                                ></textarea>
                            </div>
                            <p className="help">
                                <span className="has-text-danger">*</span>{" "}
                                indicates required fields
                            </p>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-primary"
                            onClick={this.create_report.bind(this)}
                            disabled={
                                !this.state.project_name ||
                                !this.state.evaluator_name
                            }
                        >
                            <span className="icon is-medium has-text-white">
                                <i className="fas fa-file-download"></i>
                            </span>
                            <span>Download</span>
                        </button>
                        <button
                            className="button"
                            onClick={() => this.toggle_report_modal(false)}
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        );
    }

    add_report_title(doc) {
        doc.setFontSize(TITLE_FONT_SIZE);
        doc.text("Responsible A.I. Report", 15, 25);
    }

    add_report_project_details(doc) {
        doc.setFontSize(TEXT_FONT_SIZE);

        doc.autoTable({
            theme: "grid",
            margin: { left: 15 },
            startY: 50,
            columnStyles: {
                0: {
                    cellWidth: 30,
                },
                1: {
                    fontStyle: "bold",
                },
            },
            body: [
                ["Project Name", this.state.project_name],
                ["Evaluator Name", this.state.evaluator_name],
                ["Comments", this.state.project_comments],
            ],
        });
    }

    add_report_timestamp(doc) {
        const timestamp = new Date();
        const timestampISOFormat = timestamp.toISOString();
        const timestampReadableFormat = timestamp.toLocaleString("en-GB");
        doc.setFontSize(TIMESTAMP_FONT_SIZE);
        doc.text("Created on: " + timestampReadableFormat, 17, 35);
        return timestampISOFormat;
    }

    add_report_scores(doc) {
        doc.setFontSize(HEADER_FONT_SIZE);
        doc.text(
            "F.A.C.T. Score: " +
                this.props.calculate_score(null, null, this.props.questions) +
                "%",
            17,
            95
        );

        doc.text("Metrics,", 15, 120);
        doc.setFontSize(TEXT_FONT_SIZE);

        doc.autoTable({
            theme: "grid",
            margin: { left: 20 },
            startY: 130,
            columnStyles: {
                0: {
                    cellWidth: 30,
                },
                1: {
                    fontStyle: "bold",
                    cellWidth: 15,
                    halign: "right",
                },
            },
            body: [
                [
                    "Fairness",
                    this.props.calculate_score(
                        "fairness",
                        null,
                        this.props.questions
                    ) + "%",
                ],
                [
                    "Accountability",
                    this.props.calculate_score(
                        "accountability",
                        null,
                        this.props.questions
                    ) + "%",
                ],
                [
                    "Confidentiality",
                    this.props.calculate_score(
                        "confidentiality",
                        null,
                        this.props.questions
                    ) + "%",
                ],
                [
                    "Transparency",
                    this.props.calculate_score(
                        "transparency",
                        null,
                        this.props.questions
                    ) + "%",
                ],
            ],
        });

        doc.setFontSize(HEADER_FONT_SIZE);
        doc.text("Components,", 15, 185);
        doc.setFontSize(TEXT_FONT_SIZE);

        doc.autoTable({
            theme: "grid",
            margin: { left: 20 },
            startY: 195,
            headStyles: { halign: "center", fillColor: [67, 125, 181] },
            columnStyles: {
                1: {
                    fontStyle: "bold",
                    halign: "center",
                },
                2: {
                    fontStyle: "bold",
                    halign: "center",
                },
                3: {
                    fontStyle: "bold",
                    halign: "center",
                },
                4: {
                    fontStyle: "bold",
                    halign: "center",
                },
                5: {
                    fontStyle: "bold",
                    halign: "center",
                },
            },
            head: [
                [
                    "Component",
                    "F.A.C.T.",
                    "Fairness",
                    "Accountability",
                    "Confidentiality",
                    "Transparency",
                ],
            ],
            body: [
                [
                    "Data",
                    this.props.calculate_score(
                        null,
                        "data",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "fairness",
                        "data",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "accountability",
                        "data",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "confidentiality",
                        "data",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "transparency",
                        "data",
                        this.props.questions
                    ) + "%",
                ],
                [
                    "Model",
                    this.props.calculate_score(
                        null,
                        "model",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "fairness",
                        "model",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "accountability",
                        "model",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "confidentiality",
                        "model",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "transparency",
                        "model",
                        this.props.questions
                    ) + "%",
                ],
                [
                    "Deploy",
                    this.props.calculate_score(
                        null,
                        "deploy",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "fairness",
                        "deploy",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "accountability",
                        "deploy",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "confidentiality",
                        "deploy",
                        this.props.questions
                    ) + "%",
                    this.props.calculate_score(
                        "transparency",
                        "deploy",
                        this.props.questions
                    ) + "%",
                ],
            ],
        });
    }

    add_component_questions(doc, questions, component, component_name) {
        doc.addPage();
        doc.setFontSize(HEADER_FONT_SIZE);
        doc.text(component_name, 15, 20);
        doc.setFontSize(TEXT_FONT_SIZE);
        let question_table = [];
        questions
            .filter(question => {
                return question.component === component;
            })
            .map(question => {
                question_table.push([
                    question.question,
                    this.props.answer_key[question.answer],
                ]);
                return question;
            });
        const question_table_headers = [["Question", "Answer"]];
        doc.autoTable({
            margin: { top: 30, left: 15 },
            head: question_table_headers,
            body: question_table,
        });
    }

    add_report_questions(doc, questions) {
        this.add_component_questions(doc, questions, "data", "Data");
        this.add_component_questions(doc, questions, "model", "Model");
        this.add_component_questions(doc, questions, "deploy", "Deploy");
    }

    create_report() {
        const doc = new jsPDF();
        this.add_report_title(doc);
        const timestamp = this.add_report_timestamp(doc);
        this.add_report_project_details(doc);
        this.add_report_scores(doc);
        this.add_report_questions(doc, this.props.questions);
        doc.save("Responsible-AI-Report-" + timestamp + ".pdf");
        this.toggle_report_modal(false);
    }

    render() {
        return (
            <div className="level-item download-report-interaction">
                <div
                    className="has-text-centered"
                    onClick={() => this.toggle_report_modal(true)}
                >
                    <div>
                        <p className="heading">Download</p>
                        <p className="title">
                            <span className="icon">
                                <i className="fas fa-file-download"></i>
                            </span>
                        </p>
                    </div>
                </div>

                {this.render_report_modal()}
            </div>
        );
    }
}
