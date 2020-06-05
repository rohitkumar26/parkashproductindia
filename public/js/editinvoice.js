let additem = document.querySelector("#additem");
// let removeitem = document.querySelector("#removeitem");
// removeitem.disabled = true;
let totalitems = document.querySelectorAll(".items").length;
console.log(totalitems);
let counter = totalitems;
additem.addEventListener('click', (e) => {
    e.preventDefault();
    // removeitem.disabled = false;
    let parent = document.createElement('div');
    parent.id = "parentitem";
    parent.class = "items";
    let itemname = document.createElement("input");
    itemname.setAttribute('type', 'text');
    itemname.name = `items[${counter}][name]`;
    itemname.placeholder = "name";
    itemname.required = true;
    let itemprice = document.createElement("input");
    itemprice.setAttribute('type', 'number');
    itemprice.name = `items[${counter}][price]`;
    itemprice.placeholder = "price";
    itemprice.required = true;
    let itemquantity = document.createElement("input");
    itemquantity.setAttribute('type', 'number');
    itemquantity.name = `items[${counter}][quantity]`;
    itemquantity.placeholder = "quantity";
    itemquantity.required = true;
    let buttonminus = document.createElement("button");
    buttonminus.innerHTML = "-";
    parent.appendChild(itemname);
    parent.appendChild(itemprice);
    parent.appendChild(itemquantity);
    parent.appendChild(buttonminus);
    buttonminus.addEventListener("click", deletehandler, parent);
    additem.insertAdjacentElement('beforebegin', parent);
    counter++;
})
function deletehandler(e) {
    if (counter > 1) {
        counter--;
        console.log(counter);
        this.parentNode.remove();
    }
    else {
        e.preventDefault();
        alert("Atleast have one item....");
    }
}
let deleteme = document.querySelectorAll('.deleteme');
deleteme.forEach((node) => {
    node.addEventListener('click', deletehandler, parent);
})