
let mydel = document.querySelectorAll(".mydel");
mydel.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        let elhref = element.href;
        let result = confirm("r u sure u want to delete");
        if (!result)
            return
        if (result)
            window.location.href = elhref;
    })
})
