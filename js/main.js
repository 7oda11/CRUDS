//get total  
//create product
//save in localstorage
//clear inputes
//read
//count
//delete
//update
//search
//clean data
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;

//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02';

    }

}

//create product
let arr;
if (localStorage.product != null) {
    arr = JSON.parse(localStorage.product)
}
else {
    arr = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value.toLowerCase(),
        taxes: taxes.value.toLowerCase(),
        ads: ads.value,
        discount: discount.value.toLowerCase(),
        total: total.innerHTML.toLowerCase(),
        count: count.value.toLowerCase(),
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != ' ' && category.value != '' && newPro.count<100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    arr.push(newPro);
                }
            } else {
                arr.push(newPro);
            }
        } else {
            arr[temp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        cleareData()
    }
    localStorage.setItem('product', JSON.stringify(arr));
    showData()
}


//clear inputs

function cleareData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//read
showData();

function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < arr.length; i++) {
        table += `
    <tr>
                        <td>${i+1}</td>
                        <td>${arr[i].title}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].taxes}</td>
                        <td>${arr[i].ads}</td>
                        <td>${arr[i].discount}</td>
                        <td>${arr[i].total}</td>
                        <td>${arr[i].category}</td>
                        <td><button onclick="updateData(${i})"  id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

        </tr>`

    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (arr.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${arr.length})</button>
    `
    } else {
        btnDelete.innerHTML = '';
    }
}


//delete
function deleteData(i) {
    arr.splice(i, 1);
    localStorage.product = JSON.stringify(arr);
    showData();
}

//delete all
function deleteAll() {
    arr.splice(0);
    localStorage.clear;
    showData();
}


//update
function updateData(i) {
    title.value = arr[i].title;
    price.value = arr[i].price;
    taxes.value = arr[i].taxes;
    ads.value = arr[i].ads;
    discount.value = arr[i].discount;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = 'update';
    //total.innerHTML =  arr[i].total;
    //count.value =  arr[i].count;
    category.value = arr[i].category;
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//search
let searchMode = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    search.focus();
    if (id == 'searchTitle') {
        searchMode = 'title';
        search.placeholder = 'Search By Title';

    } else {
        searchMode = 'category';
        search.placeholder = 'Search By Category';

    }
    search.value = '';
    showData();
}

function searchData(value) {
    let table;
    if (searchMode == 'title') {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${arr[i].title}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].taxes}</td>
                        <td>${arr[i].ads}</td>
                        <td>${arr[i].discount}</td>
                        <td>${arr[i].total}</td>
                        <td>${arr[i].category}</td>
                        <td><button onclick="updateData(${i})"  id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

                </tr>`

            }
        }
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${arr[i].title}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].taxes}</td>
                        <td>${arr[i].ads}</td>
                        <td>${arr[i].discount}</td>
                        <td>${arr[i].total}</td>
                        <td>${arr[i].category}</td>
                        <td><button onclick="updateData(${i})"  id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

                </tr>`

            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}


//clean data
