import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/editor.css';
import {updateText } from '../Redux/textSlice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthsContext";
function Editor() {
  const texts = useSelector((state) => state.text.text);
  const { setToken, setRole } = useAuth(); 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [id, setId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('Pending');
  const [editMode, setEditMode] = useState(false); 

  const handleSubmit = () => {
    if (id && taskName && time) { 
      if (editMode) {

        dispatch(updateText({ id, newData: { taskName, expected_time: time, done: status } }));
        setEditMode(false);
      } else {
       
       alert('No access to add data')
      }
    
      setId('');
      setTaskName('');
      setTime('');
      setStatus('Pending');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleEdit = (text) => {
    setId(text.id);
    setTaskName(text.taskName);
    setTime(text.expected_time);
    setStatus(text.done);
    setEditMode(true); 
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
    <div style={{marginLeft:'.5rem'}}>
      <div>Editor  <button className='editor-button' onClick={handleLogOut}>Logout</button></div>
     <div className={`${editMode ? "display-add" : "hide-add"} add-box-container`}>
        <input 
          type="text" 
          placeholder='Id' 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          className='editor-input'
        />
        <input 
          type="text" 
          placeholder='Task name' 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)}
          className='editor-input'
        />
        <input 
          type="number" 
          placeholder='Expected Time (in hours)' 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
           className='editor-input'
        />
        <select 
          name="status" 
          id="status" 
          onChange={(e) => setStatus(e.target.value)} 
          value={status}
           className='editor-input'
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleSubmit} className='editor-button'>{editMode ? 'Update' : 'Submit'}</button>
      </div>
      <div className="text-main">
        {
          texts.length > 0 ? texts.map((text) => (
            <div className="text-container" key={text.id}>
              <div className="task-name">{text.taskName}</div>
              <div className="time">{text.expected_time}</div>
              <div className="status">{text.done}</div>
              <button onClick={() => handleEdit(text)}
                className='editor-button'>Edit</button>
            </div>
          )) : <p>Nothing to Display</p>
        }
      </div>
    </div>
  );
}

export default Editor;
