import React from "react";

export default class Glossary extends React.Component {
    render() {
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
}
