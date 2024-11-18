
import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {

  const {getTasks, tasks } = useTask();
  //console.log(getTasks);

  useEffect(() => {
    getTasks();
  }, [])

  if (tasks.length === 0) return <h1>No hay tareas</h1>

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1">
      {
        tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))
      }
    </div>
  )
}

export default TasksPage