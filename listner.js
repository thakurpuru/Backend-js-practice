let btn=document.querySelector("button");
let box=document.querySelector("div");
// let h3=document.querySelector("h3");


function change(){
    let bo=document.querySelector("div");
    let h3=document.querySelector("h3");
    let r=Math.floor(Math.random()*255);
    let g=Math.floor(Math.random()*255);
    let b=Math.floor(Math.random()*255);
    bo.style.backgroundColor=`rgb(${r},${g},${b})`;
    h3.innerText=`rgb(${r},${g},${b})`;
}
btn.addEventListener("click",change);