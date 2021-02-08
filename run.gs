function run() {
  let licenseCounts = this.countLicenses();

  let slackWebHookURL = "";
  let alertEmailRecipient = "k";
  let alertEmailSubject = "";
  
  //sendEmail(licenseCounts, alertEmailRecipient, alertEmailSubject);
  sendSlackMessage(slackWebHookURL, licenseCounts);
}
