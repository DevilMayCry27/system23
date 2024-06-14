import * as XLSX from "xlsx";

export const exportToCSVMultiple = ({
  row1,
  row2,
  row3,
  headers,
  fileName,
  sheetName,
}) => {
  let worksheet_tmp1 = XLSX.utils.json_to_sheet(row1);
  let worksheet_tmp2 = XLSX.utils.json_to_sheet(row2);
  let worksheet_tmp3 = XLSX.utils.json_to_sheet(row3);

  let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
  let b = XLSX.utils.sheet_to_json(worksheet_tmp2, { header: 1 });
  let c = XLSX.utils.sheet_to_json(worksheet_tmp3, { header: 1 });

  a = a.concat([""]).concat(b).concat([""]).concat(c);

  let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true });

  const new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, worksheet, sheetName);
  XLSX.writeFile(new_workbook, `${fileName}.xlsx`);
};
