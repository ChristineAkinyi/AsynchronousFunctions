// Question 1

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


//Question 2
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


// Question 3
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
    for (let i = 0; i <= retries; i++) {
    try {
    const result = await unstableTask(taskName, failureProbability);
    console.log(result);
    return;
    } catch (error) {
    console.log(error);
    if (i === retries) {
    throw new Error(`Task has failed after ${retries} retries`);
    }
    }
    }
   }

executeWithRetry("reading novel", 3, 0.5);



