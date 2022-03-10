let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let inp = document.querySelectorAll('.inp')

let mood = 'creat'
let tmp;

//get totlal
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }
    else {
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }
}

//creat product
let dataPro
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}
else {
    dataPro = []
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value.toLowerCase(),
        total: total.innerHTML,
    }

    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 20){
        if (mood === 'creat') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            }
            else {
                dataPro.push(newPro)
            }
        }
        else {
            dataPro[tmp] = newPro
            mood = 'creat'
            submit.innerHTML = 'creat'
            count.style.display = 'block'
        }
        clearData()
    }
    

    /**
       //count or how many products 
     // for count or how many products you want
    if(newPro.count > 1){
       for (let i=0; i<newPro.count; i++){
           dataPro.push(newPro)
       }
    }
    else{
        dataPro.push(newPro)
       }
    // for count or how many products you want

     */


    // dataPro.push(newPro)
    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))
    
    showData()
}


//clear inputs

function clearData() {
    /** title.value = ''
     price.value = ''
     taxes.value = ''
     ads.value = ''
     discount.value = ''
     count.value = ''
     category.value =''
     total.innerHTML = '' */
    inp.forEach(function (items) {
        items.value = ''
        total.innerHTML = ''
    })
}

//read
function showData() {
    let table;
    let tbody = document.getElementById('tbody')
    for (let i = 0; i < dataPro.length; i++) {
        table += `
    <tr>
       <td>${i + 1}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].category}</td>
       <td> <button id="update" onclick= "updateData(${i})" >Update</button> </td>
       <td><button id="delete" onclick= "deleteData(${i})" >Delete</button> </td>
   </tr>
    `
    }
    tbody.innerHTML = table


    // for creat Delete All Button ( 'deleteAllData()' )
    let btnDelet = document.getElementById('deleteAll')

    if (dataPro.length > 0) {
        btnDelet.innerHTML = `<button onclick="deleteAllData()">Delete All (${dataPro.length})</button>`
    }
    else {
        btnDelet.innerHTML = ''
    }

    /** 
       let table;
        let tbody =  document.getElementById('tbody')
      dataPro.forEach(function(i){
          table += `
        <tr>
          <td>${i.i}</td>
          <td>${i.title}</td>
          <td>${i.price}</td>
          <td>${i.taxes}</td>
          <td>${i.ads}</td>
          <td>${i.discount}</td>
          <td>${i.total}</td>
          <td>${i.category}</td>
          <td> <button id="update">Update</button></td>
          <td><button id="delete">Delete</button></td>
        </tr>`
      })
     tbody.innerHTML = table
     */
}
showData()



//delete

function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = (JSON.stringify(dataPro))
    showData()
}

// delete all
function deleteAllData() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


//update

function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category
    submit.innerHTML = 'Update'
    mood = 'Update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

//search

let searchMood = 'title'
function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id === 'searchTitle') {
        searchMood = 'Title'

    }
    else {
        searchMood = 'category'

    }
    search.placeholder = 'Search By ' + searchMood
    search.focus()
    search.value = ''
    showData()
}




function searchData(valuee) {
    let table = ''
    let tbody = document.getElementById('tbody')

    for (let i = 0; i < dataPro.length; i++) {



        if (searchMood == 'title') {

            if (dataPro[i].title.includes(valuee.toLowerCase())) {
                table += `
                <tr>
                   <td>${i + 1}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td> <button id="update" onclick= "updateData(${i})" >Update</button> </td>
                   <td><button id="delete" onclick= "deleteData(${i})" >Delete</button> </td>
               </tr>
                `
            }

        }


        else {

            if (dataPro[i].category.includes(valuee.toLowerCase())) {
                table += `
                <tr>
                   <td>${i + 1}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td> <button id="update" onclick= "updateData(${i})" >Update</button> </td>
                   <td><button id="delete" onclick= "deleteData(${i})" >Delete</button> </td>
               </tr>
                `
            }

            //  tbody.innerHTML = table
        }


    }

    tbody.innerHTML = table
}









/**
function searchData(valuee) {
    let table = ''
    let tbody = document.getElementById('tbody')
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(valuee.toLowerCase())) {
                table += `
                <tr>
                   <td>${i + 1}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td> <button id="update" onclick= "updateData(${i})" >Update</button> </td>
                   <td><button id="delete" onclick= "deleteData(${i})" >Delete</button> </td>
               </tr>
                `
            }
        }
    }



  else {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(valuee.toLowerCase())) {
                table += `
                <tr>
                   <td>${i + 1}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td> <button id="update" onclick= "updateData(${i})" >Update</button> </td>
                   <td><button id="delete" onclick= "deleteData(${i})" >Delete</button> </td>
               </tr>
                `
            }

          //  tbody.innerHTML = table
        }
    }


  tbody.innerHTML = table
}
**/
//clean data