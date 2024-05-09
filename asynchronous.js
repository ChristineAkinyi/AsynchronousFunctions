// // Write an asynchronous function that accepts a message string and a delay time in milliseconds. The function should log the message to the console after the specified delay time.

let promise = new Promise(function (resolve){
     setTimeout(function(){
         resolve ("The time is now four seconds")}, 4000);
    })

 async function logMessageAfterDelay(message,delayTime){
         let result = await promise;

         console.log({result});
         console.log("Hello, time has been delayed by four seconds");
     }

 logMessageAfterDelay();


// You have an array of user IDs and a function getUserData(id) that returns a Promise with user data when given a user ID. Write an asynchronous function that fetches and logs the data for each user ID one by one, in sequence.
async function getUserData(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`User data for ID ${id}`);
      }, 1000); 
    });
  }

  const userIds = [1, 2, 3, 4, 5];
  
  
  async function fetchAndLogUserData(userIds) {
    
    const results = await userIds.reduce(async (previousPromise, id) => {
   
      await previousPromise;
     
      const userData = await getUserData(id);
           console.log(userData);
      
      return getUserData(id + 1); 
    }, Promise.resolve());

    console.log('All user data has been logged.');
  }
  
fetchAndLogUserData(userIds);


// You have an asynchronous function performTask() that returns a Promise. The Promise resolves if the task is successful and rejects if there's an error. Write a function that calls performTask() and logs a custom success message if the task is successful, and a custom error message if there's an error.
const result = true;
const ourPromise = new Promise((resolve, reject)=>{
    if(result){
        resolve ("Successful");
    }
    else{
       reject("Task not successful")
    }
})

ourPromise.then((response)=>{
    console.log({response});
    console.log("Task successful");
})

.catch((error)=>{
    console.log({error});
    console.log("Task is not successful");
})

console.log({ourPromise});

async function performTask(){
    try{
        console.log("Task successful");
        await ourPromise;
    }

    catch{
        console.log("Task has not been successful");
    }
}

performTask();

// Question 4
function unstableTask(taskName, failureProbability) {
    return new Promise((resolve, reject) => {
        const randomValue = Math.random();
        if (randomValue > failureProbability) {
            resolve(`${taskName} succeeded`);
        } else {
            reject(`${taskName} failed`);
        }
    });
}

async function executeWithRetry(taskName, retries, failureProbability) {
    for (let i = 1; i <= retries; i++) {
        try {
          await unstableTask(taskName, failureProbability);
          console.log(`${taskName} succeeded after ${i} attempt(s)`);
          return;
        } catch (error) {
          console.log(`${taskName} failed on attempt ${i}`);
          if (i === retries) {
            console.log(`${taskName} failed after ${i} attempts`);
          }
        }
      }
    }

executeWithRetry("SampleTask", 3, 0.5);




