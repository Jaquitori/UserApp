import React, { useState } from "react";
import "./AddNewUser.css";
import axios from "axios";

export default function AddNewUser(props) {
  const [contact, updateContact] = useState({
    firstName: "",
    lastName: "",
    age: ""
  });

  function onChangeInput({ target: { name, value } }) {
    updateContact({
      ...contact,
      [name]: value
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/contact/add", contact)
      .then(res => console.log(res.data));
    props.history.push("/listContact");
    window.location.reload();
  }

  return (
    <div style={{ marginTop: 0 }}>
      <nav>
        <h1> Add New User </h1>
      </nav>

      <form>
        <h2>First name: </h2>
        <input
          type="text"
          className="form-control"
          placeholder="i.e John"
          value={contact.firstName}
          onChange={onChangeInput}
          name={"firstName"}
        />
        <h2>Last name: </h2>
        <input
          type="text"
          className="form-control"
          placeholder="i.e Doe"
          value={contact.lastName}
          onChange={onChangeInput}
          name={"lastName"}
        />
        <h2>Age: </h2>
        <input
          type="text"
          className="form-control"
          placeholder="i.e 21"
          value={contact.age}
          onChange={onChangeInput}
          name={"age"}
        />
        <input
          type="submit"
          value="SAVE"
          className="btn btn-primary"
          onClick={onSubmit}
        />
      </form>
    </div>
  );
}
