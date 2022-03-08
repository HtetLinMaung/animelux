import axios from "axios";

const host = process.env.log_server;

export const log = (level, message, duration = 0) => {
  try {
    const data = {};
    if (window) {
      data.screen_width = window.screen.width;
      data.screen_height = window.screen.height;
      data.page = window.document.title;
    }
    data.appname = "animelux";
    data.level = level;
    data.message = message;
    data.page_load_duration = duration;
    console.log(data);
    axios.post(`${host}/techhype-analytics/logs`, data);
  } catch (err) {
    console.log(err.message);
  }
};
