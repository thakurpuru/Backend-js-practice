let h1=document.querySelector("h1");

function changeColor(color,delay,nextcolor){
    setTimeout(()=>{
        h1.style.color=color;
        if(nextcolor) nextcolor();
    },delay);
}

// changeColor("blue",1000,()=>{
//     changeColor("green",1000,()=>{
//         changeColor("yellow",1000,()=>{
//             changeColor("black",1000);
//         });
//  });
// });
// callback nesting -> callback hell 
function colorChange(color,delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            h1.style.color=color;
            resolve("Color changed");
        },delay);

    });
}
// colorChange("red",1000)
//     .then((result)=>{
//         console.log(result);
//         return colorChange("orange",1000);
//     })
//     .then((result)=>{
//         console.log(result);
//         return colorChange("blue",1000);
//     })
//     .then((result)=>{
//         console.log(result);
//         return colorChange("green",1000);
//     })
//     .then((result)=>{
//         console.log(result);
//     })

async function demo(){
    await colorChange("red",1000);
    await colorChange("blue",1000);
    await colorChange("green",1000);
    await colorChange("yellow",1000);
    colorChange("black",1000);
    
}

