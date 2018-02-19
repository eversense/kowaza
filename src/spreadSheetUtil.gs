function getColNum(str){
  var headers = getHeaders();
  return headers.indexOf(str) + 1;
}

function getHeaders(){
  var sheet = SpreadsheetApp.getActive().getSheetByName(TARGET_SHEET);
  var range = sheet.getRange("1:1");
  return range.getValues()[0];
}

function toDate(d){
  if(d instanceof Date) {
    return Utilities.formatDate(d,"JST", "yyyy/MM/dd")
  } else {
    return ""
  }
}

function getRowNumByDate(date){
  var dateStr = toDate(date);
  var sheet = SpreadsheetApp.getActive().getSheetByName(TARGET_SHEET);
  var range = sheet.getRange("B2:B");
  var values = range.getValues();
  var row = -ROW_OFFSET;
  for(i=0;i<values.length;i++){ 
    if(toDate(values[i][0]) == dateStr){
      row = i;
      break;
    }
  }
  return row + ROW_OFFSET;
}

// for Debug
function logOnCell(val, col){
  var sheet = SpreadsheetApp.getActive().getSheetByName(TARGET_SHEET);
  var row = 10
  var range = sheet.getRange(row, col)
  range.setValue(val);
}
