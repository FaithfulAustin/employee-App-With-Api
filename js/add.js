function save(){

    
            const fname = document.querySelector("#fname").value;
            const lname = document.querySelector("#lname").value;
            const salary = document.querySelector("#salary").value;
            const email = document.querySelector("#email").value;
            const gender = document.querySelector("#gender").value;
            const dept = document.querySelector("#dept").value;

    const url = 'https://postgresql-emloyee-app.herokuapp.com/api/v1/employees';
    var res;
    fetch(url ,
         {method: "POST" ,
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
            console.log(res)
            if(res.ok){
                 swal("SAVED", "Employee saved successfully", "success");              
            }

            return res;

        })

        
    
}