function hellow(){
    console.log("Hellow World");
}
function dice_roll(){
    console.log("Dice Value",Math.floor(Math.random()*6)+1);
}
function printInfo(name,age){
    console.log(`${name}'s age is ${age}.`);
}
function calAvg(a,b,c){
    let avg=(a+b+c)/2;
    console.log(avg);
}
function table(n){
    for(let i=1;i<=10;i++){
        console.log(n*i);
    }
}

const add=function(a,b){
    return a+b;
}

const pow=(a,b)=>{
    return a**b;
}
const square=(n)=>{
    return n**2;
}

// let id=setInterval(()=>{
//     console.log("Hellow World");

// },2000)

// setTimeout(()=>{
//     clearInterval(id);
// },10000)
let arr=[7,8,10,30,50,3];
let check=arr.every((el)=>{
    return el%10==0;
});
let num=arr.reduce((min,el)=>{
    if(el<min){
        return el;
    }else{
        return min;
    }
})
