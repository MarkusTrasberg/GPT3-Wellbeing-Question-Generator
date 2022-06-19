import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
// import { debounce } from "lodash";

import "bootstrap/dist/css/bootstrap.min.css";
// import * as PropTypes from "prop-types";

const UI_PARAMS_API_URL = "/params";
const TRANSLATE_API_URL = "/translate";
const EXAMPLE_API_URL = "/examples";

const DEBOUNCE_INPUT = 250;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "",
      input: "",
      context: "",
      buttonText: "Submitt",
      description: "Description",
      showExampleForm: false,
      examples: {}
    };
    // Bind the event handlers
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleContextInputChange = this.handleContextInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }



  componentDidMount() {
    // Call API for the UI params
    axios
      .get(UI_PARAMS_API_URL)
      .then(
        ({
          data: { placeholder, button_text, description, show_example_form }
        }) => {
          this.setState({
            input: placeholder,
            context: "",
            buttonText: button_text,
            description: description,
            showExampleForm: show_example_form
          });
          if (this.state.showExampleForm) {
            axios.get(EXAMPLE_API_URL).then(({ data: examples }) => {
              this.setState({ examples });
            });
          }
        }
      );
      const load = document.getElementById("loading");
      load.style.visibility = "hidden";
  }

  // updateExample(id, body) {
  //   axios.put(`${EXAMPLE_API_URL}/${id}`, body);
  // }

  // debouncedUpdateExample = debounce(this.updateExample, DEBOUNCE_INPUT);

  // handleExampleChange = (id, field) => e => {
  //   const text = e.target.value;
  
  //   let body = { [field]: text };
  //   let examples = { ...this.state.examples };
  //   examples[id][field] = text;
  
  //   this.setState({ examples });
  //   this.debouncedUpdateExample(id, body);
  // };

  // handleExampleDelete = id => e => {
  //   e.preventDefault();
  //   axios.delete(`${EXAMPLE_API_URL}/${id}`).then(({ data: examples }) => {
  //     this.setState({ examples });
  //   });
  // };
  
  // handleExampleAdd = e => {
  //   e.preventDefault();
  //   axios.post(EXAMPLE_API_URL).then(({ data: examples }) => {
  //     this.setState({ examples });
  //   });
  // };


  // For question topic
  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  // For context
  handleContextInputChange(e) {
    this.setState({ context: e.target.value });
  }

    // Radio button
    onValueChange(event) {
      this.setState({
        selectedOption: event.target.value
      });
    }

    // Radio button
    formSubmit(event) {
      event.preventDefault();
      console.log("Type selected: " + this.state.selectedOption)
    }

  // When Generate is clicked
  handleClick(e) {
    e.preventDefault();
    const load = document.getElementById("loading");
    load.style.visibility = "visible";
    console.log("Type selected: " + this.state.selectedOption)
    let body = {
      prompt: this.state.input,
      questionType: this.state.selectedOption,
      context: this.state.context
    };
    axios.post(TRANSLATE_API_URL, body).then(({ data: { text } }) => {
      this.setState({ output: text });
      load.style.visibility = "hidden";
    });
  }

  render() {
    // const showExampleForm = this.state.showExampleForm;
    return (
      <div style={{whiteSpace: "pre-line"}}>
        <head />
        <body>
          <div
            style={{
              margin: "auto",
              marginTop: "80px",
              width: "65%"
            }}
          >
            <div style={{float: "left", backgroundColor: "#ECECEC", padding: "20px", borderRadius: "20px", marginRight: "40px"}}>
            <Form onSubmit={this.handleClick}>
              <Form.Group controlId="formBasicEmail">
                {/* {showExampleForm && (
                  <div>
                    <h4 style={{ marginBottom: "25px" }}>Examples</h4>
                    {Object.values(this.state.examples).map(example => (
                      <span key={example.id}>
                        <Form.Group
                          as={Row}
                          controlId={"formExampleInput" + example.id}
                        >
                          <Form.Label column="sm" lg={2}>
                            Example Input
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              as="input"
                              placeholder="Enter text"
                              value={example.input}
                              onChange={this.handleExampleChange(
                                example.id,
                                "input"
                              )}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          controlId={"formExampleOutput" + example.id}
                        >
                          <Form.Label column="sm" lg={2}>
                            Example Output
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              as="textarea"
                              placeholder="Enter text"
                              value={example.output}
                              onChange={this.handleExampleChange(
                                example.id,
                                "output"
                              )}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Col sm={{ span: 10, offset: 2 }}>
                            <Button
                              type="button"
                              size="sm"
                              variant="danger"
                              onClick={this.handleExampleDelete(example.id)}
                            >
                              Delete example
                            </Button>
                          </Col>
                        </Form.Group>
                      </span>
                    ))}
                    <Form.Group as={Row}>
                      <Col sm={{ span: 10 }}>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={this.handleExampleAdd}
                        >
                          Add example
                        </Button>
                      </Col>
                    </Form.Group>
                  </div>
                )} */}
                
                
                <h2>Generate wellbeing questions</h2>
                <Form.Label>{"Write question topic"}</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Topic"
                  // value={this.state.input}
                  onChange={this.handleInputChange}
                />
                <br></br>
                   <Form.Label>{"Select question type"}</Form.Label>


                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Open"
                      checked={this.state.selectedOption === "Open"}
                      onChange={this.onValueChange}
                    />
                     &nbsp;Open
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Likert Question"
                      checked={this.state.selectedOption === "Likert Question"}
                      onChange={this.onValueChange}
                    />
                     &nbsp;Likert question
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Likert Statement"
                      checked={this.state.selectedOption === "Likert Statement"}
                      onChange={this.onValueChange}
                    />
                     &nbsp;Likert statement
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Multiple choice"
                      checked={this.state.selectedOption === "Multiple choice"}
                      onChange={this.onValueChange}
                    />
                    &nbsp;Multiple choice
                  </label>
                </div>
                <br></br>

                <Form.Label>{"Add context (e.g a news article / relevant paragraph)"}</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="(Optional)"
                  // value=""
                  onChange={this.handleContextInputChange}
                />

              </Form.Group>

              <Button variant="primary" type="submit">
                {"Generate questions"}
              </Button>
              <div
                class="spinner-border spinner-border-sm text-primary"
                role="status"
                id="loading"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </Form>
            </div>

            <div
              style={{
                // float: "center",
                // textAlign: "center",
                fontSize: "12pt",
                padding: "20px",
                overflow: "auto",
                maxHeight: "600px"
              }}
            >
              <h2>Output:</h2>
              {this.state.output}
            </div>
          </div>
        </body>
      </div>
    );
  }
}



export default App;
