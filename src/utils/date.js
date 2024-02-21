Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

module.exports = {
    getEndDate: (timeStart, totalDay, dayPerWeek) => {
        const date = new Date(timeStart);
        const countDate = Math.ceil((totalDay / dayPerWeek) * 7);
        // const dateEnd = moment(timeStart).add(countDate, "days");
        date.setDate(date.getDate() + countDate);
        return date;
    },

    getDateLearn: (timeStart, timeEnd, day) => {
        const dateArray = [];
        let currentDate = timeStart;
        while (currentDate <= timeEnd) {
            if (day.includes(currentDate.getDay())) {
                dateArray.push(currentDate);
            }
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    },
};
