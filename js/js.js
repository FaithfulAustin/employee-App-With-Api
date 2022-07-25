
async function employeeData() {
  //lds-spinner
  document.querySelector('.lds-spinner').style.opacity = '1'
  document.querySelector('.loading').style.display = 'block'
  const table = document.querySelector(".employeeTable");
  const totalEmp = document.querySelector(".totalEmp");
  const totalMale = document.querySelector(".maleCount");
  const totalFemale = document.querySelector(".femaleCount");
  const url = "https://postgresql-emloyee-app.herokuapp.com/api/v1/employees";
  const response = await fetch(url);
  const datas = await response.json();
  let editUrl ;
  let maleCount = 0;
  let femaleCount = 0;
  let count ;


  totalEmp.innerText = datas.length + " employees";
  document.querySelector('.lds-spinner').style.display = 'none'
  document.querySelector('.loading').style.display = 'none'
  table.innerHTML = ' <tr><th >S/N</th><th >ID</th><th>Firstname</td><th>Lastname</th><th>Salary</th><th>Email</th><th>Gender</th><th>department</th><th></th><th></th></tr>  <tr> '
  for (var i = 0; i < datas.length; i++) {

    count = i+1;
  editUrl = './edit.html'+'?'+datas[i].id
    table.innerHTML += '<td >' + count + '</td>   <td class="id">' + datas[i].id + '</td> <td class="firstname">' + datas[i].firstname + '</td> <td class="lastname">' + datas[i].lastname + '</td> <td class="salary">' + datas[i].salary + '</td><td class="email">' + datas[i].email + '</td> <td class="gender">' + datas[i].gender + '</td><td class="department">' + datas[i].department + '</td> <td> <a href="'+editUrl+'"> <button class="edit"><i class="bi bi-pencil-fill"></i>EDIT</button></a></td><td><button  onclick="deleteFunction('+ datas[i].id +')" class="del"><i class="bi bi-trash"></i>DELETE</button> </td> </tr>'
    if (datas[i].gender.toLowerCase() === "male") { maleCount++ }
    else if (datas[i].gender.toLowerCase() === "female") { femaleCount++ }
  }
  totalMale.innerText = maleCount + " men"
  totalFemale.innerText = femaleCount + " women"



}
async function search() {

  const givenId = document.querySelector("#search").value

 
  document.querySelector('.loading').style.display = 'block'
  const table = document.querySelector(".employeeTable");
  const url = 'https://postgresql-emloyee-app.herokuapp.com/api/v1/employee/' + givenId + '';
  const response = await fetch(url);
  const datas = await response.json();
  let editUrl = './edit.html'+'?'+givenId;
  // console.log(datas)
if(datas.id !== undefined){

  document.querySelector('.loading').innerText = "Loading..."
   document.querySelector('.loading').style.display = 'none'
  table.innerHTML = ' <tr><th >ID</th><th>Firstname</td><th>Lastname</th><th>Salary</th><th>Email</th><th>Gender</th><th>department</th><th></th><th></th></tr>  <tr> '
 

    table.innerHTML += '  <td class="id">' + datas.id + '</td> <td class="firstname">' + datas.firstname + '</td> <td class="lastname">' + datas.lastname + '</td> <td class="salary">' + datas.salary + '</td><td class="email">' + datas.email + '</td> <td class="gender">' + datas.gender + '</td><td class="department">' + datas.department + '</td><td><a href="'+editUrl+'"> <button class="edit"><i class="bi bi-pencil-fill"></i>EDIT</button></a></td><td><button  onclick="deleteFunction('+ datas.id +')" class="del"><i class="bi bi-trash"></i>DELETE</button> </td> </tr>'
    
  
}else{
  document.querySelector('.loading').innerText = datas.message 
  table.innerHTML =  ""
}



 

}



function deleteEmployee(givenId) {
  const url = 'https://postgresql-emloyee-app.herokuapp.com/api/v1/employee/' + givenId + '';
  fetch(url, { method: "DELETE" })
  employeeData();

}


async function deleteFunction(id){
  const url = "https://postgresql-emloyee-app.herokuapp.com/api/v1/employees";
  const response = await fetch(url);
  const datas = await response.json();
  let fullName  ;
  for (var i = 0; i < datas.length; i++) {
    if(id === datas[i].id){
       fullName = datas[i].lastname +" "+ datas[i].firstname;
    }
  }
  

  console.log(id);
  swal({
    title: "Are you sure?",
    text: "Empoylee "+fullName+", with the ID of  "+id+" will be permantly deleted",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      deleteEmployee(id);
      employeeData().then()
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Employees details are safe!");
    }
  });
}
 


document.addEventListener('DOMContentLoaded',function(){
 
employeeData().then()
})




