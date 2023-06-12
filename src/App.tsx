import React, {useState} from 'react';

//components
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal'
//CSS
import styles from './App.module.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
//Interface
import {ITask} from './interfaces/Task'




function App() {

  const[taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpadate] = useState<ITask | null>(null);

  const deleteTask = (id:number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id;
      }

      )
    )
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if(display){
        modal!.classList.remove("hide")
    } else {
        modal!.classList.add("hide")
    }
  };

  const editTask = (task:ITask):void => {
    hideOrShowModal(true);
    setTaskToUpadate(task)
  };

  const updateTask = (id: number, title: string, difficulty: number) => {

    const updatedTask: ITask = {id, title, difficulty};
    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    });

    setTaskList(updatedItems);

    hideOrShowModal(false);
  }

  return (
    <div>
      <Modal children={<TaskForm 
      btnText="Edit task" 
      taskList={taskList}
      task={taskToUpdate}
      handleUpdate={updateTask}
      />
      }
      />
     <Header />
      <main className={styles.main}>
        <div>
          <h2>Workout of the day</h2>
          <TaskForm 
          btnText='Create task' 
          taskList={taskList} 
          
          setTaskList={setTaskList} 
          />
        </div>
        <div>
          <h2>Tasks:</h2>
          <TaskList 
          taskList={taskList} 
          handleDelete={deleteTask} 
          handleEdit={editTask}/>
        </div>
      </main>
      <Footer />
    </div>

  );
}

export default App;
