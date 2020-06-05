let additem = document.querySelector("#additem");

let totalitems = document.querySelectorAll(".items").length;
console.log(totalitems);
let counter = 1;
additem.addEventListener('click', (e) => {
    e.preventDefault();


    let parent = document.createElement('div');
    parent.id = "parentitem";
    let itemname = document.createElement("input");
    itemname.setAttribute('type', 'text');
    itemname.name = `items[${counter}][name]`;
    itemname.placeholder = "name";

    let itemprice = document.createElement("input");
    itemprice.setAttribute('type', 'number');
    itemprice.name = `items[${counter}][price]`;
    itemprice.placeholder = "price";

    let itemquantity = document.createElement("input");
    itemquantity.setAttribute('type', 'number');
    itemquantity.name = `items[${counter}][quantity]`;
    itemquantity.placeholder = "quantity";

    let buttonminus = document.createElement("button");
    buttonminus.innerHTML = "-";

    parent.appendChild(itemname);
    parent.appendChild(itemprice);
    parent.appendChild(itemquantity);
    parent.appendChild(buttonminus);
    buttonminus.addEventListener("click", deletehandler, parent);

    additem.insertAdjacentElement('afterend', parent);
    counter++;


})
function deletehandler(e) {

    this.parentNode.remove();

}

