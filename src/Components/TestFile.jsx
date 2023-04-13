import React from "react";
function TestFile() {
  const users = ["Admin", "Faculty", "Supervisor"];
  function clickHandler() {
    console.log("clicked");
  }
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select User :
        </button>
        <ul className="dropdown-menu">
          {users.map((user) => (
            <li>
              <a className="dropdown-item" onClick={clickHandler}>
                {user}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default TestFile;
