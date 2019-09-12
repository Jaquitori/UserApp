import React from "react";
import { Link } from "react-router-dom";

export default function TableRow(props) {
  return (
    <div>
      <div className="user_list">
        <h2>
          {" "}
          {props.obj.firstName} {props.obj.lastName}{" "}
        </h2>
        <Link to={"/edit/" + props.obj._id} className="user_list_edit">
          EDIT
        </Link>
        {/* <button className="user_list_edit" >EDIT</button> */}
        <button
          className="user_list_remove"
          onClick={() =>
            props.message(
              props.obj.firstName + " " + props.obj.lastName,
              props.obj._id
            )
          }
        >
          REMOVE
        </button>
        <a href="/addNewUser" className="user_list_add">
          <div className="add_plus">+</div>
        </a>
      </div>
    </div>
  );
}
