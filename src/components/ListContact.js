import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import "./ListContact.css";

export default function ListContact(props) {
  const [contact, updateContact] = useState([]);
  let [showMessageObj, updateShowMessageObj] = useState({
    showMessage: false,
    name: "",
    deleted: false
  });
  const deleteTimeot = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/contact")
      .then(response => {
        //console.log(response.data.result);
        updateContact(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  function messageBar() {
    if (showMessageObj.showMessage) {
      setTimeout(() => {
        updateShowMessageObj({ showMessage: false });
        if (showMessageObj.deleted) {
          axios
            .delete("http://localhost:4000/contact/delete/" + showMessageObj.id)
            .then(console.log("Deleted"));
          window.location.reload();
        }
        //window.location.reload();
      }, 5000);

      return (
        <div className="user_status">
          <h5>User "{showMessageObj.name}" deleted</h5>
          <button onClick={onDismiss}> DISMISS </button>
        </div>
      );
    }
  }

  function onDismiss() {
    updateShowMessageObj({ deleted: false });
    console.log(updateShowMessageObj);
  }

  function changeShowMessage(name, id) {
    updateShowMessageObj({ showMessage: true, name, deleted: true, id });
  }

  return (
    <div className="container">
      <nav>
        <h1> User List </h1>
      </nav>
      {contact.map(object => (
        <TableRow obj={object} key={object._id} message={changeShowMessage} />
      ))}
      <a href="/addNewUser" className="user_list_add">
        <div className="add_plus">+</div>
      </a>
      {messageBar()}
    </div>
  );
}
