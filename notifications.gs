function sendEmail(licenses, to, subject) {
  let htmlBody = "Hi Administrator,<br><br>" +
                "Please investigate the Google Workspace license count as there are currently a small amount remaining.<br><br>" +
                "Remaining Licenses: " + licenses.available + "<br>" +
                "Total Licenses: " + licenses.total + "<br>" +
                "Used Licenses: " + licenses.used + "<br>" +
                "As of date: " + licenses.date + "<br><br>" +
                "(Please note that due to API limitations and needing to use the reporting API, the license counts may sometimes be as of a few days before today)<br><br>" +
                "Thanks!<br>The License Alert Bot";

  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: htmlBody,
    noReply: true,
  })
}

function sendSlackMessage(url, licenses) {

  data = {
    "text": "This is a test message",
    "blocks": [
    	{
    		"type": "section",
    		"text": {
    			"type": "mrkdwn",
    			"text": "Remaining licenses: " + licenses.available,
    		}
    	},
    ]
  };

  let options = {
    "method": 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data),
  };

  UrlFetchApp.fetch(url, options);
}
