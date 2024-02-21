module.exports = (date) => {
    let month = date.getMonth() + 1;
    return [
        date.getFullYear(),
        month <= 9 ? `0${month}` : month,
        date.getDate(),
    ].join("/");
};
