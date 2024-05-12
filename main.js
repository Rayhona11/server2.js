// So`rovlar bilan ishlash
// So`rovni ichki strukturasi
// METHOD, BODY, HEADERS

let tb = document.querySelector('tbody')
let frm = document.querySelector('#addform')

function sendQuery(){
    fetch('https://cyberss.uz/api/dars')
    .then(res => res.json(res)).then(data => render(data))
}
    sendQuery()

    function render(users) {
        tb.innerHTML = ''
        users.forEach(user => {
            let tr = document.createElement('tr')
            tr.innerHTML =`
             <td>${user.firstname}</td>
             <td>${user.lastname}</td>
             <td>${user.age}</td>
             <td>${user.tel}</td>
             <td><button data-id="${user.id}</td>" class"btn btn-danger delbtn">Ochirish</button>
            `
            tb.append(tr)
        });
        onDelete()
    }


frm.addEventListener('submit',(e)=>{
  e.preventDefault()
  let user = {
    firstname:frm.firstname.value,
    lastname:frm.lastname.value,
    age:frm.age.value,
    tel:frm.tel.value
  }
  fetch('https://cyberss.uz/api/dars',{
    method:'POST',
    headers: {
        "Content-type":'application/json',
    },
    body:JSON.stringify(user)
  }).then((res)=>{
     if(res.status === 200){
        sendQuery()
     }
  })
})

function onDelete(){
   let btns = document.querySelectorAll('.delbtn')
   
   btns.forEach(el=>{
     el.addEventListener('click',(e)=>{
          fetch('https://cyberss.uz/api/dars/' + e.target.dataset.id,{
            method:'DELETE'
          }).then(res=>{
            if(res.status === 200){
                sendQuery()
            }
          })
       })
   })
}



