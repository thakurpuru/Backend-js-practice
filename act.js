let input=document.querySelector("#tsk");
let btn=document.querySelector("#add");
let ul=document.querySelector("ul");

btn.addEventListener("click",function(){
    if(input.value!==""){
        let list=document.createElement("li");
        list.innerText=input.value;
        let delBtn=document.createElement("button");
        delBtn.classList.add("delete");
        delBtn.innerText="Delete";
        list.appendChild(delBtn);
        ul.appendChild(list);
        input.value="";

    }else{
        alert("Enter the tsak");
    }
});
let btns=document.querySelectorAll(".delete");

    ul.addEventListener("click",function(event){
        console.dir(event);
        if(event.target.nodeName=="BUTTON"){
            let par=event.target.parentElement;
            par.remove();
            console.log("Delete Sucessfully");

        }else{
            console.log(event.target.nodeName);
        }
    })
