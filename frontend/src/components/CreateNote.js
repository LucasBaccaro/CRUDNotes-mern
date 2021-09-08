import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    editing: false,
    _id: "",
  };

  notify = () => toast("Action Sucess!");

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map((user) => user.username),
        userSelected: res.data[0].username,
      });
    }
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/notes/" + this.props.match.params.id
      );
      this.setState({
        title: res.data.title,
        content: res.data.content,
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.userSelected,
    };

    if (this.state.editing) {
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id,
        newNote
      );
    } else {
      await axios.post("http://localhost:4000/api/notes", newNote);
    }
    setTimeout(function () {
      window.location.href = "/";
    }, 1000);
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create Note</h4>

          {/*SELECT USER*/}
          <div className="form-group">
            <select
              className="form control col-md-12"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              onChange={this.onInputChange}
              value={this.state.title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              onChange={this.onInputChange}
              value={this.state.content}
              placeholder="Content"
              required
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.notify}
            >
              Save
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    );
  }
}
