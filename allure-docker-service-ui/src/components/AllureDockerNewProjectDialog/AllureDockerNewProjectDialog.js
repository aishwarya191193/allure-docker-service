import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";

import axios from "../../api/axios-allure-docker";

class AllureDockerNewProjectDialog extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      projectIdTextField: {
        value: '',
        error: false,
        errorMessage: '',
      },
    };
  }

  createProject = () => {
    axios
      .post("/projects", {
        id: this.state.projectIdTextField.value.toLowerCase(),
      })
      .then((response) => {
        this.resetStates();
        this.props.closeNewProjectDialog();
        this.props.getProjects();
        this.props.setAPIAlert('success', `Project ${response.data.data.id.toUpperCase()} created succesfully!`, true);
      })
      .catch((error) => {
        this.showProjectIdTextFieldChange(error.message);
      });
  };

  handleProjectIdTextFieldChange = () => {
    const projectIdTextField = { ...this.state.projectIdTextField };
    projectIdTextField.value = event.target.value;
    this.setState({ projectIdTextField: projectIdTextField });
  };

  showProjectIdTextFieldChange = (errorMessage) => {
    const projectIdTextField = { ...this.state.projectIdTextField };
    projectIdTextField.error = true;
    projectIdTextField.errorMessage = errorMessage;
    this.setState({ projectIdTextField: projectIdTextField });
  };

  resetStates = () => {
    this.setState(this.initialState);
  };

  handleCloseDialog = () => {
    this.props.closeNewProjectDialog();
    this.resetStates();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The projects allow you to organize your tests in a better way.
          </DialogContentText>
          <TextField
            error={this.state.projectIdTextField.error}
            value={this.state.projectIdTextField.value}
            autoFocus
            margin="dense"
            id="projectId"
            label="Project ID"
            type="string"
            onChange={this.handleProjectIdTextFieldChange}
            fullWidth
            aria-describedby="component-error-project-id"
          />
          <FormHelperText id="component-error-project-id">
            {this.state.projectIdTextField.errorMessage}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.createProject} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default AllureDockerNewProjectDialog;
