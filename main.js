let menu = loadData();

function display() {
    let str = "<tr>" +
        "<th>Drink Name</th>" +
        "<th>Price</th>" +
        "<th>Image</th>" +
        "<th colspan='2'>Action</th>" +
        "</tr>";
    for (let i = 0; i < menu.length; i++) {
        // str += '<tr>' +
        //             '<td>'+menu[i]+'</td>' +
        //             '<td><button onclick="updateDrink('+i+')">Update</button></td>' +
        //             '<td><button onclick="deleteDrink('+i+')">Delete</button></td>' +
        //         '</tr>';

        str += `<tr>
                        <td>${menu[i][0]}</td>
                        <td>${menu[i][1]}</td>
                        <td><img src="${menu[i][2]}" alt=""></td>
                        <td><button onclick="updateDrink(${i})">Update</button></td>
                        <td><button onclick="deleteDrink(${i})">Delete</button></td>
                    </tr>`;
    }
    document.getElementById('menu').innerHTML = str;
    saveData();
}

display();

function addDrink() {
    let name = document.getElementById('drink-name').value;
    let price = document.getElementById('drink-price').value;
    let image = document.getElementById('drink-image').value;
    if (name != "" && price != "") {
        let drink = [name, price, image];
        menu.push(drink);
        display();
        resetInput();
    } else {
        alert("Please input name");
    }

}

function deleteDrink(index) {
    menu.splice(index, 1);
    display();
}

function updateDrink(index) {
    let newName = prompt("Input new name: ", menu[index][0]);
    let newPrice = prompt("Input new price: ", menu[index][1]);
    let newImage = prompt("Input new image: ", menu[index][2]);
    let drink = [newName, newPrice, newImage];
    menu[index] = drink;
    display();
}

function resetInput() {
    document.getElementById('drink-name').value = "";
    document.getElementById('drink-price').value = "";
    document.getElementById('drink-image').value = "";
}

function saveData() {
    localStorage.setItem('drink', JSON.stringify(menu));
}

function loadData() {
    if (localStorage.hasOwnProperty('drink')) {
        let data = JSON.parse(localStorage.getItem('drink'));
        return data;
    } else {
        return [];
    }
}

function showMenuHtml() {
    let formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
    });

    let str = "";
    for (let i = 0; i < menu.length; i++) {
        let money = formatter.format(menu[i][1]);
            str += `<div class="card">
                    <img src="${menu[i][2]}" alt="drink" style="width:100%">
                    <h1>${menu[i][0]}</h1>
                    <p class="price">${money}</p>
                    <p><button>Order</button></p>
                </div>`;
    }
    document.getElementById('menu').innerHTML = str;
}
