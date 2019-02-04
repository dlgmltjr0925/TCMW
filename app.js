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

  const printWorker1 = new TaskWorker('print', 2);
  taskManager.addSubscriber(printWorker1);
  const printWorker2 = new TaskWorker('print', 10);
  taskManager.addSubscriber(printWorker2);

  const printCreator = new TaskCreator.Print();
  printCreator.setTaskManager(taskManager);
  printCreator.run();
};

app();
