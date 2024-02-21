module.exports = {
    getError: (errors, field) => {
        const error = errors.find(({ path }) => path === field);
        console.log(error);
        if (error) {
            return error.msg;
        }
    },
};
