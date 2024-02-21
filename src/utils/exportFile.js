const ExcelJS = require("exceljs");

module.exports = async (
    res,
    models,
    nameSheet = "Unnamed",
    fileName,
    columns
) => {
    try {
        let workbook = new ExcelJS.Workbook();
        let arrData = [];
        const sheet = workbook.addWorksheet(nameSheet);
        sheet.columns = columns;

        await models.forEach((model, index) => {
            let data = {};
            data[`${columns[0].key}`] = index + 1;
            for (let i = 1; i < columns.length; i++) {
                data[`${columns[i].key}`] =
                    model.dataValues[`${columns[i].key}`];
            }
            arrData.push(data);
        });
        arrData.forEach((data) => {
            sheet.addRow(data);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + fileName
        );
        workbook.xlsx.write(res);
    } catch (e) {
        console.log(e);
    }
};
