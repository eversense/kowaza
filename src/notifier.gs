// notify tips on spreadsheet to slack

function notify(){
  var row = getRowNumByDate(new Date())
  // skip if no data found
  if(row === 0){ return; }
  
  var elements = getNotifyMessageElements(row);
  var title = getNotifyMessageForSlack(elements);
  var attachments = getNotifyAttachments(elements);

  sendToSlack(title, attachments)
}

function getNotifyMessageForSlack(e){
  return "*" + e.title + "*" + "\n\n" +
    e.description + "\n" +
    "by" + e.author;
}

function getNotifyAttachments(e){
    var actions = [
                {
                    "name": "feedback",
                    "text": "great help",
                    "style": "primary",
                    "type": "button",
                    "value": FEEDBACK_TYPES.GREAT
                },
                {
                    "name": "feedback",
                    "text": "no use",
                    "style": "danger",
                    "type": "button",
                    "value": FEEDBACK_TYPES.BAD
                },
                {
                    "name": "feedback",
                    "text": "already know",
                    "type": "button",
                    "value": FEEDBACK_TYPES.KNOWN
                }
            ]
  return [
        {
            "fallback": "try once more",
            "callback_id": e.id,
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": actions
        }
    ]
}

function getNotifyMessageElements(row){
  var sheet = SpreadsheetApp.getActive().getSheetByName(TARGET_SHEET);
  var id = sheet.getRange(row, getColNum("id")).getValue()
  var title = sheet.getRange(row, getColNum("title")).getValue()
  var description = sheet.getRange(row, getColNum("description")).getValue()
  var author = sheet.getRange(row, getColNum("author")).getValue()
  
  return {id: id, title: title, description: description, author: author};
}
