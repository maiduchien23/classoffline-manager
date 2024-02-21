const ExcelJS = require("exceljs");

module.exports = async (filename) => {
    const workbook = new ExcelJS.Workbook();
    let arr = [];
    await workbook.xlsx.readFile(filename).then(function () {
        const worksheet = workbook.getWorksheet(1);
        const columnCount = worksheet.actualColumnCount;
        worksheet.eachRow(
            { includeEmpty: false },
            async function (row, rowNumber) {
                const currRow = worksheet.getRow(rowNumber);
                let data = {};
                if (rowNumber !== 1) {
                    for (let index = 2; index <= columnCount; index++) {
                        data[`column_${index - 1}`] =
                            currRow.getCell(index).value;
                    }
                    arr.push(data);
                }
            }
        );
    });
    return arr;
};
