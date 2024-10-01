import { useEffect, useState } from "react";
import "./App.css";
import { Button, EditableText, InputGroup, Toaster } from "@blueprintjs/core";

const AppToaster = Toaster.create({
  position: "top",
});

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  function adduser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch(
        "https://jsonplaceholder.typicode.com/users",

        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            website,
          }),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUsers([...users, data]);
          AppToaster.show({
            message: "User add Successfully",
            intent: "success",
            timeout: 3000,
          });

          setNewName("");
          setNewEmail("");
          setNewWebsite("");
        });
    }
  }

  function oncChangeHandler(id, key, value) {
    setUsers((users) => {
      return users.map((user) => {
        return user.id === id ? { ...user, [key]: value } : user;
      });
    });
  }

  function UpdateUser(id) {
    const user = users.find((user) => user.id === id);

    fetch(
      `https://jsonplaceholder.typicode.com/users/10`,

      {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        AppToaster.show({
          message: "User Updated Successfully",
          intent: "success",
          timeout: 3000,
        });
      });
  }
  function DeletUser(id) {
    fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,

      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers((users) => {
          return users.filter((user) => user.id !== id);
        });

        AppToaster.show({
          message: "User Deleted Successfully",
          intent: "success",
          timeout: 3000,
        });
      });
  }

  return (
    <div className="app">
      <table className="bp4-html-table modifier">
        <thead>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <EditableText
                  onChange={(value) =>
                    oncChangeHandler(user.id, "email", value)
                  }
                  value={user.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) =>
                    oncChangeHandler(user.id, "website", value)
                  }
                  value={user.website}
                />
              </td>
              <td>
                <Button intent="primary" onClick={() => UpdateUser(user.id)}>
                  Update
                </Button>
                &nbsp;
                <Button intent="danger" onClick={() => DeletUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <InputGroup
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter the name..."
              />
            </td>
            <td>
              <InputGroup
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter Email..."
              />
            </td>
            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="Enter Websie..."
              />
            </td>
            <td></td>
            <td>
              <Button intent="success" onClick={adduser}>
                Add User
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
