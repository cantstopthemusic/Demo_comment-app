import React, { Component } from "react";
import PropTypes from "prop-types";
class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  constructor() {
    super();
    this.state = {
      username: "",
      content: "",
      createdtime: "",
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handleContentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }
  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdtime: +new Date(),
      });
    }
    this.setState({
      content: "",
    });
  }
  handleUsernameBlur(event) {
    this._saveUsername(event.target.value);
  }

  _saveUsername(username) {
    localStorage.setItem("username", username);
  }
  _loadUsername() {
    const name = localStorage.getItem("username");
    if (name) {
      this.setState({ username: name });
    }
  }

  componentWillMount() {
    this._loadUsername();
  }
  componentDidMount() {
    this.textarea.focus();
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-feild-input">
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange}
              ref={(textarea) => (this.textarea = textarea)}
            ></textarea>
          </div>
          <div className="comment-field-button">
            <button onClick={this.handleSubmit}>发布</button>
          </div>
        </div>
      </div>
    );
  }
}
export default CommentInput;
