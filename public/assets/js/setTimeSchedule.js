const schedule = document.querySelector("#classSchedule");
const renderTimeLearnSchedule = (wrapTimeSchedule) => {
    const searchChoices = document.querySelectorAll(".search-choice");
    let html = "";
    searchChoices.forEach((searchChoice, index) => {
        html += `<div class="form-group">
                    <label for="">Thời gian học: ${searchChoice.children[0].innerText}</label>
                    <div class="container">
                    <div class="row">
                        <div class="col">
                        <p>Bắt đầu:</p>
                        <input type="time" class="form-control" name="timeLearnStart"/>
                        </div>
                        <div class="col">
                        <p>Kết thúc:</p>
                        <input type="time" class="form-control" name="timeLearnEnd"/>
                        </div>
                    </div>
                    </div>
                </div>`;
    });
    wrapTimeSchedule.innerHTML = "";
    wrapTimeSchedule.insertAdjacentHTML("beforeend", html);
};

const setEventCloseDaySchedule = (wrapTimeSchedule) => {
    const searchChoiceCloses = document.querySelectorAll(
        ".search-choice-close"
    );

    searchChoiceCloses.forEach((searchChoiceClose) => {
        searchChoiceClose.addEventListener("click", () => {
            renderTimeLearnSchedule(wrapTimeSchedule);
        });
    });
};

if (schedule) {
    const chosenResults = document.querySelector(".chosen-results");
    const wrapTimeSchedule = document.querySelector(".wrap__time-schedule");

    chosenResults.addEventListener("click", (e) => {
        renderTimeLearnSchedule(wrapTimeSchedule);
        setEventCloseDaySchedule(wrapTimeSchedule);
    });
}

window.onload = () => {
    const wrapTimeSchedule = document.querySelector(".wrap__time-schedule");
    setEventCloseDaySchedule(wrapTimeSchedule);
    renderTimeLearnSchedule(wrapTimeSchedule);
};
