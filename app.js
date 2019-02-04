import chalk, { bgYellow } from 'chalk';
import * as Task from './Task';
import * as TaskCreator from './TaskCreator';
import TaskManager from './TaskManager';
import TaskWorker from './TaskWorker';


const app = () => {
  console.log(bgYellow.black('======= Start ======='));

  // define task;
  const print = new Task.Print();

  // console.log('create task manager');
  const taskManager = new TaskManager();
  taskManager.addTask(print);

  const printWorker1 = new TaskWorker('print', 10);
  taskManager.addTaskWorker(printWorker1);
  const printWorker2 = new TaskWorker('print', 10);
  taskManager.addTaskWorker(printWorker2);
  // const printWorker3 = new TaskWorker('print', 10);
  // taskManager.addTaskWorker(printWorker3);
  // const printWorker4 = new TaskWorker('print', 10);
  // taskManager.addTaskWorker(printWorker4);
  // const printWorker5 = new TaskWorker('print', 10);
  // taskManager.addTaskWorker(printWorker5);
  // const printWorker6 = new TaskWorker('print', 10);
  // taskManager.addTaskWorker(printWorker6);
  // const printWorker7 = new TaskWorker('print', 10);
  // taskManager.addTaskWorker(printWorker7);

  const printCreator = new TaskCreator.Print();
  printCreator.setTaskManager(taskManager);
  printCreator.run();
};

app();
