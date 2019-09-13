import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import "./ListContact.css";

export default function ListContact(props) {
  const [contact, updateContact] = useState([]);
  let [showMessageObj, updateShowMessageObj] = useState({
    showMessage: false,
    name: ""
  });
  const dismissTimeout = useRef(null);

  useEffect(() => {
    listContact();
  }, []);

  function listContact() {
    axios
      .get("http://localhost:4000/contact")
      .then(response => {
        //console.log(response.data.result);
        updateContact(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function onDismiss() {
    updateShowMessageObj({ ...showMessageObj, showMessage: false });
    clearInterval(dismissTimeout.current);
  }

  function changeShowMessage(name, id) {
    updateShowMessageObj({ ...showMessageObj, name, id, showMessage: true });
    axios
      .delete(`http://localhost:4000/contact/delete/${id}`)
      .then(() => {
        updateShowMessageObj(
          prev => (
            listContact(),
            {
              ...prev,
              showMessage: true
            }
          )
        );

        dismissTimeout.current = setTimeout(() => {
          updateShowMessageObj({ ...showMessageObj, showMessage: false });
        }, 10000);
      })
      .catch(err => console.error(err));
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
      {showMessageObj.showMessage && (
        <div className="user_status">
          <h5>User "{showMessageObj.name}" deleted</h5>
          <button onClick={onDismiss}> DISMISS </button>
        </div>
      )}
    </div>
  );
}
