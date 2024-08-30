import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/admin.css";
import { addText, updateText, deleteText } from "../Redux/textSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthsContext";

function Admin() {
  const { setToken, setRole } = useAuth(); // Correctly use the hook inside the component
  const navigate = useNavigate();
  const texts = useSelector((state) => state.text.text);
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = () => {
    if (id && taskName && time) {
      if (editMode) {
        dispatch(
          updateText({
            id,
            newData: { taskName, expected_time: time, done: status },
          })
        );
        setEditMode(false);
      } else {
        dispatch(addText({ id, taskName, expected_time: time, done: status }));
      }

      setId("");
      setTaskName("");
      setTime("");
      setStatus("Pending");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEdit = (text) => {
    setId(text.id);
    setTaskName(text.taskName);
    setTime(text.expected_time);
    setStatus(text.done);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteText(id));
  };

  const handleLogOut = () => {
    alert("You have been logged out.");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setRole('');
    setToken('');
    navigate('/');
  };

  return (
    <div style={{marginLeft:".6rem"}}>
      <div>
        Admin
        <button className="admin-button" onClick={handleLogOut}>Logout</button>
      </div>
      <div className="add-box-container">
        <input
          type="text"
          placeholder="Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="admin-input"
        />
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="admin-input"
        />
        <input
          type="number"
          placeholder="Expected Time (in hours)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="admin-input"
        />
        <select
          name="status"
          id="status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className="admin-input"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleSubmit} className="admin-button">
          {editMode ? "Update" : "Submit"}
        </button>
      </div>
      <div className="text-main">
        {texts.length > 0 ? (
          texts.map((text) => (
            <div className="text-container" key={text.id}>
              <div className="task-name">Task Name: {text.taskName}</div>
              <div className="time">Expected Time: {text.expected_time}hr</div>
              <div className="status">Status :{text.done}</div>
              <button onClick={() => handleEdit(text)} className="admin-button">Edit</button>
              <button onClick={() => handleDelete(text.id)} className="admin-button">Delete</button>
            </div>
          ))
        ) : (
          <p>Nothing to Display</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
