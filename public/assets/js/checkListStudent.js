const inputUser = document.querySelector("#listUser");
const checkboxUsers = document.querySelectorAll(".checkboxItem");
const btnAdd = document.querySelector("#btn-add");
let arrUser = [];

if (inputUser) {
    checkboxUsers.forEach((checkboxUser) => {
        checkboxUser.addEventListener("change", function (e) {
            if (!e.target.checked) {
                arr = arr.filter((val) => val !== e.target.value);
                inputUser.value = arr.toString();
                return;
            }
            arr.push(e.target.value);
            inputUser.value = arr.toString();
        });
    });

    btnAdd.onclick = () => {
        arr = [...new Set(arr)];
    };
}
