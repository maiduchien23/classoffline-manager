const recordNumber = document.querySelector(".record-number");
if (recordNumber) {
    recordNumber.addEventListener("change", (e) => {
        let currentPathname = window.location.href;
        if (currentPathname.includes("?")) {
            currentPathname = currentPathname.slice(
                0,
                currentPathname.indexOf("?")
            );
            console.log(currentPathname);
        }
        window.location = `${currentPathname}?recordNumber=${e.target.value}`;
    });
}
