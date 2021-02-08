function countLicenses() {
  let date = new Date()
  let dateInISO = date.toISOString().split('T')[0];

  while (true) {
    try {
      var response = AdminReports.CustomerUsageReports.get(dateInISO, {parameters : "accounts:gsuite_enterprise_total_licenses,accounts:gsuite_enterprise_used_licenses"});
      Logger.log("countLicenses: " + response)

      if (response.usageReports[0].parameters[0].intValue & response.usageReports[0].parameters[1].intValue) {
        break;
      }
    } catch(e) {
      date.setDate(date.getDate()-1);
      dateInISO = date.toISOString().split('T')[0];
      Logger.log("countLicenses: No data available, going back 1 day")
    }
  }

  let totalLicenses = response.usageReports[0].parameters[0].intValue;
  let usedLicenses = response.usageReports[0].parameters[1].intValue;
  let availableLicnses = totalLicenses - usedLicenses;

  Logger.log("countLicenses: Total licenses: " + totalLicenses);
  Logger.log("countLicenses: Used licenses: " + usedLicenses);
  Logger.log("countLicenses: Available licenses: " + availableLicnses);
  Logger.log("countLicenses: As of date: " + dateInISO)

  return {
    total: totalLicenses,
    used: usedLicenses,
    available: availableLicnses,
    date: dateInISO
  };
}
