let url="https://catfact.ninja/fact";

fetch(url)
.then((res)=>{
    console.log(res);
    res.json().then((data)=>{
        console.log(data.fact);
    });
})
.catch((err)=>{
    console.log("Error -",err);
})

async function getFact() {
    try{
        let res=await axios.get(url);
        console.log(res.data.fact);

    }catch(e){
        console.log("Error -",e);
    }

    
}