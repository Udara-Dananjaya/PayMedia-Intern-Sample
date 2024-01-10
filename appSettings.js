let appSettings;

if (process.env.NODE_ENV === "production") {
  let timeOutDurationMins = 30;
  appSettings = {
    $api_url: process.env.VUE_APP_API_BASE_URL,
    timeoutDuration: timeOutDurationMins * 60 * 1000,
  };
} else {
  let timeOutDurationMins = 30;
  appSettings = {
    $api_url: "http://localhost:44351",
    // $api_url: "http://18.217.1.224:4000",
    // $api_url: "http://dfccekycuat.paymediasolutions.com:4000",
    timeoutDuration: timeOutDurationMins * 60 * 1000,
  };
}

export { appSettings };
