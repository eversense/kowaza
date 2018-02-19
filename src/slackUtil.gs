function sendToSlack(text, attachments){
  // username, channel, icon attributes will be overridden by Slack App
  var payload = {
                 "text": text,
                 "attachments": attachments,
                 "link_names": 1
                };
  
  var options = {
    "method" : "post",
    "payload" : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
}

function responseToSlack(responseUrl, payload){
  var options = {
    "method" : "post",
    "payload" : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(responseUrl, options);
}

