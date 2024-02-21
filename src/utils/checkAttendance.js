const moment = require("moment");

module.exports = (attendanceList, date, studentId, status) => {
    for (let i = 0; i < attendanceList.length; i++) {
        if (
            moment(attendanceList[i].dataValues.dateLearn).format(
                "YYYY/MM/DD"
            ) === moment(date).format("YYYY/MM/DD") &&
            attendanceList[i].dataValues.studentId === studentId &&
            attendanceList[i].dataValues.status === status
        ) {
            return true;
        }
    }
};
