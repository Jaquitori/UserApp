import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditUser.css";

export default function EditUser(props) {
  const [contact, updateContact] = useState({
    firstName: "",
    lastName: "",
    age: ""
  });

  useEffect(() => {
    function getContact() {
      const { id } = props.match.params;
      axios
        .put("http://localhost:4000/contact/edit/" + id)
        .then(response => {
          console.log(response.data.firstName);
          updateContact({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            age: response.data.age
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    getContact();
  }, [props]);

  function onChangeInput({ target: { name, value } }) {
    updateContact({
      ...contact,
      [name]: value
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const { id } = props.match.params;
    axios
      .post("http://localhost:4000/contact/update/" + id, contact)
      .then(res => console.log(res.data));

    props.history.push("/listContact");
    window.location.reload();
  }

  return (
    <div style={{ marginTop: 0 }}>
      <nav>
        <h1>
          {" "}
          {contact.firstName} {contact.lastName}
        </h1>
      </nav>

      <form onSubmit={onSubmit}>
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
        <input type="submit" value="SAVE" className="btn btn-primary" />
      </form>
    </div>
  );
}
