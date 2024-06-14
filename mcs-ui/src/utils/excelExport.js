import * as Excel from "exceljs";
import { saveAs } from 'file-saver';

export const exportToCSV = async({rows, columns, fileName, dateRange, sheetName}) => {
    const workbook = new Excel.Workbook();

    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet(sheetName);

    // add worksheet columns
    // each columns contains header and its mapping key from data
    worksheet.columns = columns;

    // loop through data and add each one to worksheet
    rows.forEach(singleData => {
        worksheet.addRow(singleData);
    });

    // updated the properties for first row.
    worksheet.getRow(1).font = { 
        bold: true, 
        color: { 
            argb: 'FFFFFF'
        } 
    };
    worksheet.getRow(1).eachCell({ includeEmpty: false }, function(cell) {
        worksheet.getCell(cell.address).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor: { argb:'0066B3' },
        }
    })

    // loop through all of the columns and set the alignment with width.
    worksheet.columns.forEach(column => {
        column.width = column.header.length + 20;
        column.alignment = { horizontal: 'center' };
    });

    if(dateRange?.length)
    {
        worksheet.insertRow(1, {});
        worksheet.insertRow(1, {});
        worksheet.insertRow(1, {});
        worksheet.getCell('A1').value = 'FROM:';
        worksheet.getCell('B1').value = dateRange[0];
        worksheet.getCell('A2').value = 'TO:';
        worksheet.getCell('B2').value = dateRange[1];
        
        for(const x of ['A1','A2'])
        {
            worksheet.getCell(x).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor: { argb:'0066B3' },
            }
            worksheet.getCell(x).font = {
                bold: true, 
                color: { argb: 'FFFFFF' } 
            }
        }
    }

    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer();

    // download the processed file
    saveAs(new Blob([buf]), `${fileName}.xlsx`);
};