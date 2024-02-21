const scheduleUpdate = document.querySelector("#classScheduleClass");

const getTimeLearnStart = () =>
    document.querySelectorAll("[data-time-learn-start]");
const getTimeLearnEnd = () =>
    document.querySelectorAll("[data-time-learn-end]");

const renderTimeLearnScheduleUpdate = (
    wrapTimeScheduleUpdate,
    indexSchedule = null
) => {
    if (!wrapTimeScheduleUpdate) return;

    const searchChoicesUpdate = document.querySelectorAll(".search-choice");
    if (
        indexSchedule !== null &&
        document.querySelector("[data-time-learn-start]")
    ) {
        getTimeLearnStart()[indexSchedule]?.remove();
        getTimeLearnEnd()[indexSchedule]?.remove();
        getTimeLearnStart().length > 1 &&
            setEventCloseDayScheduleUpdate(wrapTimeScheduleUpdate);
    }

    let html = "";

    searchChoicesUpdate.forEach((searchChoice, index) => {
        if (getTimeLearnStart()) {
            html += `<div class="form-group">
                        <label for="">Thời gian học: ${
                            searchChoice.children[0].innerText
                        }</label>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                <p>Bắt đầu:</p>
                                <input type="time" class="form-control" name="timeLearnStart" value="${
                                    getTimeLearnStart()[index]?.value
                                }"/>
                                </div>
                                <div class="col">
                                <p>Kết thúc:</p>
                                <input type="time" class="form-control" name="timeLearnEnd" value="${
                                    getTimeLearnEnd()[index]?.value
                                }"/>
                                </div>
                            </div>
                            </div>
                    </div>`;
        } else {
            html += `<div class="form-group">
                        <label for="">Thời gian học: ${searchChoice.children[0].innerText}</label>
                        <div class="container">
                        <div class="row">
                            <div class="col">
                            <p>Bắt đầu:</p>
                            <input type="time" class="form-control" name="timeLearnStart" />
                            </div>
                            <div class="col">
                            <p>Kết thúc:</p>
                            <input type="time" class="form-control" name="timeLearnEnd"/>
                            </div>
                        </div>
                        </div>
                    </div>`;
        }
    });

    wrapTimeScheduleUpdate.innerHTML = "";
    wrapTimeScheduleUpdate.insertAdjacentHTML("beforeend", html);
};

const setEventCloseDayScheduleUpdate = (wrapTimeScheduleUpdate) => {
    const searchChoiceClosesUpdate = document.querySelectorAll(
        ".search-choice-close"
    );

    searchChoiceClosesUpdate.forEach((searchChoiceClose, indexSchedule) => {
        searchChoiceClose.addEventListener("click", () => {
            renderTimeLearnScheduleUpdate(
                wrapTimeScheduleUpdate,
                indexSchedule
            );
        });
    });
};

if (scheduleUpdate) {
    const chosenResults = document.querySelector(".chosen-results");
    const wrapTimeScheduleUpdate = document.querySelector(
        ".wrap__time-schedule"
    );

    chosenResults.addEventListener("click", (e) => {
        renderTimeLearnScheduleUpdate(wrapTimeScheduleUpdate);
        setEventCloseDayScheduleUpdate(wrapTimeScheduleUpdate);
    });
}

window.onload = () => {
    const wrapTimeScheduleUpdate = document.querySelector(
        ".wrap__time-schedule"
    );
    setEventCloseDayScheduleUpdate(wrapTimeScheduleUpdate);
    renderTimeLearnScheduleUpdate(wrapTimeScheduleUpdate);
};
