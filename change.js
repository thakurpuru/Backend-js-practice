let user=document.querySelector("#user");
let pass=document.querySelector("#pass");
user.addEventListener("change",function(){
    console.log("input changed");
    console.log("changed value=",this.value);
});
user.addEventListener("input",function(){
    console.log(this.value);
})