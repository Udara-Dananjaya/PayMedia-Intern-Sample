let timeOutDurationMins = 30;

const appSettings = {
  $api_url:process.env.VUE_APP_API_BASE_URL,
  timeoutDuration: timeOutDurationMins * 60 * 1000,
};

export { appSettings };
