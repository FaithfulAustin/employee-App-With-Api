    const givenId  = document.location.search.replace("?","")
    const url = 'https://postgresql-emloyee-app.herokuapp.com/api/v1/employee/' + givenId + '';
async function init(){
    const response = await fetch(url);
    const datas = await response.json();

    
     document.querySelector("#fname").value = datas.firstname;
     document.querySelector("#lname").value =  datas.lastname ;
     document.querySelector("#salary").value = datas.salary;
     document.querySelector("#email").value = datas.email;
     document.querySelector("#gender").value = datas.gender;
     document.querySelector("#dept").value = datas.department ;


   
}

function edit(){
    
    const fname = document.querySelector("#fname").value;
    const lname = document.querySelector("#lname").value;
    const salary = document.querySelector("#salary").value;
    const email = document.querySelector("#email").value;
    const gender = document.querySelector("#gender").value;
    const dept = document.querySelector("#dept").value;

var res;
fetch(url ,
 {method: "PUT" ,
 headers:{ "Content-type": "application/json"},
 body: JSON.stringify({
    "firstname": fname,
    "lastname": lname ,
    "salary": parseInt(salary), 
    "email": email,
    "gender": gender,
    "department": dept

}),

})
.then((res ) =>  {
    if(res.ok){
                 
      

         swal("SAVED", "update successful", "success")
         .then((value) => {
            window.document.location = "./index.html"
         });
        
    }
 
    return res;

})

}
document.addEventListener('DOMContentLoaded',function(){
     init().then()
    init();
})