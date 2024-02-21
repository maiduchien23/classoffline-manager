module.exports = (date) => {
    return (
        [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
        " " +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(":")
    );
};
