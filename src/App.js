import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    setTasks(data);
  }

  async function fetchTask(id) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    
    return data;
  }

  async function addTask(task) {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body : JSON.stringify(task),
    });

    const data  = await res.json();

    setTasks([...tasks, data]);
  }

  async function deleteTask(id) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });

    res.status === 200 
    ? setTasks(tasks.filter((task) => task.id !== id)) 
    : alert('Error deleting task');
  }

  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body : JSON.stringify(updatedTask),
    });

    const data = await res.json();


    setTasks(tasks.map(
      (task) => task.id === id ? data: task  
    ));
  }

  return (
    <div className="container">
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}  
      />
      {showAddTask && <AddTask addTask={addTask} />}
      {
        tasks.length > 0 ? 
        <Tasks 
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        />
        :
        'No Tasks to show'
      }
    </div>
  );
}

export default App;
