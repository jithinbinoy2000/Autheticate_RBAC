import { useSelector } from 'react-redux';
import '../Styles/user.css';
import { useAuth } from "./AuthsContext";
import { useNavigate } from "react-router-dom";
function User() {
  const texts = useSelector((state) => state.text.text);
  const { setToken, setRole } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    alert("You have been logged out.");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setRole('');
    setToken('');
    navigate('/');
  };
  return (
    <div>
   <div>User <button onClick={handleLogOut} className="editor-button">Logout</button></div>
      <div className="text-main">
        {
          texts.length > 0 ? texts.map((text) => (
            <div className="text-container" key={text.id}>
              <div className="task-name">Task Name{text.taskName}</div>
              <div className="time">Expected Time{text.expected_time}</div>
              <div className="status">Status{text.done}</div>
              
            </div>
          )) : <p>Nothing to Display</p>
        }
      </div>
    </div>
  );
}

export default User;
