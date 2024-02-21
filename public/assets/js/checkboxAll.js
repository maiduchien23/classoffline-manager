const checkboxAll = document.querySelector("#checkboxAll");
const inputDelete = document.querySelector("#listDelete");
const checkboxCourses = document.querySelectorAll(".checkboxItem");
const deleteAllBtn = document.querySelector("#deleteAll");
let arr = [];

if (checkboxAll) {
    checkboxAll.addEventListener("change", function (e) {
        const haveChecked = Array.from(checkboxCourses).some(
            (checkboxCourse) => checkboxCourse.checked
        );

        if (haveChecked) {
            e.target.checked = false;
            checkboxCourses.forEach((checkboxCourse) => {
                checkboxCourse.checked = false;
            });
            arr = [];
            inputDelete.value = "";
        }

        if (e.target.checked) {
            checkboxCourses.forEach((checkboxCourse) => {
                checkboxCourse.checked = true;
                arr.push(checkboxCourse.value);
            });
            inputDelete.value = arr.toString();
            return;
        }
        checkboxCourses.forEach((checkboxCourse) => {
            checkboxCourse.checked = false;
            arr = [];
        });
        inputDelete.value = "";
    });

    checkboxCourses.forEach((checkboxCourse) => {
        checkboxCourse.addEventListener("change", function (e) {
            if (!e.target.checked) {
                checkboxAll.checked = false;
                arr = arr.filter((val) => val !== e.target.value);
                inputDelete.value = arr.toString();
                return;
            }
            arr.push(e.target.value);
            inputDelete.value = arr.toString();
            checkboxAll.checked = Array.from(checkboxCourses).every(
                (checkboxCourse) => checkboxCourse.checked
            );
        });
    });

    deleteAllBtn.onclick = () => {
        arr = [...new Set(arr)];
        console.log(arr.toString());
    };
}
