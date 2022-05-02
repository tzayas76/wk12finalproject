const Crud_url= 'https://crudcrud.com/api/'
const Crud_api = '0e6fea91d7ca42a2bd0b8dc9eaa1ab35'
const resource = '/reservations'
function createRes(){
     let resObj =
        {name : document.getElementById('name').value,
        Phone: document.getElementById('Phone').value,
         date: document.getElementById('date').value,
        time: document.getElementById('time').value
        }
     fetch(Crud_url+Crud_api+resource,{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body:JSON.stringify(resObj)
     })
     .then(response=> response.json())
     .then(data => {
         console.log('SUCCESS', data);
     })
     .catch(error =>{
         console.error('ERROR',error)
     })
    renderRes()
}
async function renderRes()
{
    await fetch(Crud_url+Crud_api+resource)
    .then(response => response.json())
    .then(data => {
        console.log('success', data);
        getRes(data);
    })
}
function deleteRes(){
    let resId = '/' + this.value;
    console.log(resId);
    fetch(Crud_url+Crud_api+resource+resId, {
        method: 'DELETE'
    })
    .then(() => renderRes());
}
function getRes(data){
    app.innerHTML = '';
    for(let i = 0; i < data.length; i++){

        let name = data[i].name;
        let Phone = data[i].Phone;
        let date = data[i].date;
        let time = data[i].time;
        let resItem =
        `
        <tr id="${data[i]._id}">
        <td>${data[i].name}</td>
        <td>${data[i].Phone}</td>
        <td>${data[i].date}</td>
        <td>${data[i].time}</td>
        </tr>
        <button class="btn btn-danger removeListBtn" value="${data[i]._id}">Delete</button>
       `
       let rescontainer= document.createElement('tr');
        rescontainer.innerHTML = resItem;
         app.append(rescontainer)
    }
    var removeList = document.getElementsByClassName('removeListBtn');
    for(let x = 0; x < removeList.length; x++)
    {
        removeList[x].addEventListener('click', deleteRes);
    }
}
function updateMovie(resId, resObj){
    fetch((Crud_url+Crud_api+resource+resId), {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(resObj)
    })
    .then(response => response.json())
    .then(data => {
        console.log('SUCCESS', data);
    })
    .catch((error) => {
        console.error('ERrro', error);
    });
 renderRes();
}
