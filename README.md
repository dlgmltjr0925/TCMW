# TCMW (Task - Creator - Manager - Worker model)

This is a model that operated base on tasks.

It has 4 components such as
 - Task
 - Task Creator
 - Task Manager
 - Task Worker
 

# Role

### Task
1. It processes the infomation received from the Task Creator and changes it into a workable message type.

2. The task has a connection information of queue and access queue. Currently available queues are local and redis.

### Task Creator
1. It processes the information obtained by itself or other media and stores it in the queue through the Task.

### Task Manager
1. This makes it easy to manage multiple tasks by name.

### Task Worker 
1. It is responsible for doing what is defined in the Task. Progress time is efficient for handling various processes.


# How to use
1. Define Task  
   Create a new class by inheriting the Task object. Then override the "getMessage" and "work" function.

   ### sample
   ```
   import Task from './Task';

   class Print from Task {
     constructor(name = 'print') {
       this.name = name;
     }

     // example
     // info: {
     //   sequence: 1,
     //   name: 'amy',
     //   age: '20',
     // }

     getMessage(info) {
       const { sequence, name, age } = info;
       const header = `print[${sequence}]`; // header must be unique; 
       const body = {
         name, 
         age,
       };
       const message = { header, body: JSON.stringify(body) };
       // message: { header: 'string', body: 'string' } 
       return message;
     }
    
     // example
     // message: {
     //   header: "print[1]",
     //   body: '{
     //     "name": "amy",
     //     "age": 20
     //   }'
     // }

     work(message, callback) {
       const { header } = message;
       const body = JSON.parse(body);
       const { name, age } = body;
       console.log(`[${header}] My name is ${name} and I am ${age} years old.`)
       callback();        // Informs you that the job is finished. 
     }

     ...
     
   }
   ```

2. Define Task Creator  
   Create a new class by inheriting the TaskCreator object. Then override the "run" function.
   ```
    import TaskCreator from './TaskCreator';

    class PrintCreator extends TaskCreator {
      run() {
        for (let i = 0; i < 10; i++) {
          const info = {
            sequence: i,
            name: 'amy',
            age: i + 19,
          }
        }
      }
    }
    export default class Print extends TaskCreator {
      run() {
        for (let i = 0; i < 1000; i++) {
          const info = {
            name: `test${i}`,
            content: `hello world${i}`,
          };
          const message = this.taskManager.getMessage('print', info);
          // console.log(message);
          this.taskManager.push('print', message);
          this.taskManager.publish('print', message);
        }
      }
    }
   ```

3. Connect and Run
   After creating the object, connect and run TaskCreator.
   ```
   import Print from './Task/Print';
   import PrintCreator from './TaskCreator/PrintCreator';
   import TaskManager from './TaskManager';
   import TaskWorker from './TaskWorker';

   const TASK_NAME = 'print'; 

   // 1. create new Task 
   const print = new Print(TASK_NAME);
   
   // 2. create new TaskCreator
   const printCreator = new PrintCreator();

   // 3. create new TaskManager
   const taskManager = new TaskManager();

   // 4. create new TaskWorker
   const printWorker = new TaskWorker(TASK_NAME, 2);
   // input: name(string), count(number);
   // Count indicates the maximum number of operations that can be performed at the same time per worker.

   // 5. connect Task with Task Manager.
   taskManager.addTask(print);

   // 6. connect Task Manager with Task Worker.
   taskManager.addTaskWorker(printWorker);

   // 7. connect Task Creator with Task Manager.
   printCreator.setTaskManager(taskManager);

   // 8. run Task Creator
   printCreator.run();
   ```

4. Install node module
   ```
   npm install
   ```

5. Start node  
   ```
   npm start
   ```