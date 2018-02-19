// request endpoint for Slack App
// It will be invoked when a user taps button on a message
function doPost(e){
  var json = JSON.parse(e.parameter.payload)
  addFeedback(json)
        
  var feedbackType = getFeedbackType(json.actions)
  var responsePayload = getResponsePayloadByFeedbackType(feedbackType);
  responseToSlack(json.response_url,responsePayload);
  
  return ContentService.createTextOutput();
}

function addFeedback(json){
  var feedbackType = getFeedbackType(json.actions)
  var sheet = SpreadsheetApp.getActive().getSheetByName(TARGET_SHEET);
  var row = getRowNumById(json.callback_id);

  Object.keys(FEEDBACK_TYPES).forEach(function (key) {
    var col = getColNum(FEEDBACK_TYPES[key]);
    var range = sheet.getRange(row, col);

    if(FEEDBACK_TYPES[key] === feedbackType){
      appendName(range, json.user.name)
    } else {
      subName(range, json.user.name)
    }
  });
}

function appendName(range, name){
  var original_value = range.getValue()
  var names = original_value.split(",");
  names.push(name)
  var uniqueNames = names.filter(function (x, i, self) {
            return self.indexOf(x) === i && x !== "";
        });

  range.setValue(uniqueNames.join(","))
}

function subName(range, name){
  var original_value = range.getValue()
  var names = original_value.split(",");
  var index = names.indexOf(name);
  if(index >= 0){
    names.splice(index,1)
  }
  range.setValue(names.join(","))
}

function getFeedbackType(actions){
  var type = FEEDBACK_TYPES.KNOWN;
  if(actions.filter(function(e){ return e.name == "feedback" && e.value == FEEDBACK_TYPES.GREAT }).length > 0) {
    type = FEEDBACK_TYPES.GREAT;
  } else if(actions.filter(function(e){ return e.name == "feedback" && e.value == FEEDBACK_TYPES.BAD }).length > 0) {
    type = FEEDBACK_TYPES.BAD;
  }
  return type;
}

function getRowNumById(id){
  var sheet = SpreadsheetApp.getActive().getSheetByName(TARGET_SHEET);
  var range = sheet.getRange("A2:A");
  var values = range.getValues();
  var row = 0;
  for(i=0;i<values.length;i++){
    if(values[i][0] == id){
      row = i;
      break;
    }
  }
  return row + ROW_OFFSET;
}

function getResponsePayloadByFeedbackType(feedbackType){
  var payload = {
    "response_type": "ephemeral",
    "replace_original": false,
    "text": "text"
  }

  switch(feedbackType){
    case FEEDBACK_TYPES.GREAT:
      payload.text = "Thank you! I am grad to help you :joy: ";
      break;
    case FEEDBACK_TYPES.BAD:
      payload.text = "Sorry. You can expect good one tomorrow :smile: ";
      break;
    case FEEDBACK_TYPES.KNOWN:
      payload.text = "Splendid! :laughing: ";
      break;
  }

  return payload;
}


