// report today's evaluation to Slack

function report(){
  var row = getRowNumByDate(new Date())
  // skip if no data found
  if(row === 0){ return; }
  
  var elements = getReportMessageElements(row);
  var title = getReportMessageForSlack(elements);

  sendToSlack(title,[])
}

function getReportMessageForSlack(e){
  return "*Today's result*" + "\n" +
    ":joy: great help *" + e.great_count + "*\n" +
    ":cry: no use *" + e.bad_count + "*\n" +
    ":neutral_face: already know *" + e.known_count + "*";
}

function getReportMessageElements(row){
  var sheet = SpreadsheetApp.getActive().getSheetByName(TARGET_SHEET);
  var great_count = sheet.getRange(row, getColNum("great_count")).getValue()
  var bad_count = sheet.getRange(row, getColNum("bad_count")).getValue()
  var known_count = sheet.getRange(row, getColNum("known_count")).getValue()
  
  return {great_count: great_count, bad_count: bad_count, known_count: known_count};
}
