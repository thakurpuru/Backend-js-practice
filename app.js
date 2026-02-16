const classInfo=[
    {
        name:"aman",
        grade:"A+",
        city:"Delhi"
    },
    {
        name:"Karn",
        grade:"B",
        city:"Mumbai"

    }

]
// classInfo[0].city
// 'Delhi'
// classInfo[1]["city"]

// 'Mumbai'
const range=prompt("Enter the range");
let random=Math.floor(Math.random()*range)+1;
let guess=prompt("Guess the number");
while(true){
    if(guess=="exit"){
        console.log("Exit succesfully!");
        break;
    }
    if(guess==random){
        console.log("Your guess correctly!");
        break;
    }else if(guess>random){
        guess=prompt("Your is too large.Please try again"); 
    }else{
        guess=prompt("Your is too small.Please try again");
    }
}

let li=[];
li.push(45);

