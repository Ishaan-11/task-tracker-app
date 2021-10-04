import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTask();
  }, []);

  async function fetchTask() {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    setTasks(data);
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

  function toggleReminder(id) {
    setTasks(tasks.map(
      (task) => task.id === id ? {...task, reminder: !task.reminder}: task  
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
