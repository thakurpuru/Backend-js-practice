let ele=document.getElementById("Intro");
let newPara=document.createElement("p");
newPara.append("Hey I'm red!");
let bd=document.querySelector("pre");
bd.insertAdjacentElement("afterend",newPara);
newPara.classList.add("red")
let h3=document.createElement("h3");
h3.innerText="Hey I'm blue!";
h3.style.color="blue";
bd.insertAdjacentElement("afterend",h3);
