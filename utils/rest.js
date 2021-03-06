const axios = require("axios");
const prefix = `${process.env.server}/fetchit`;

const rest = {
  get: async (url, params = {}) => {
    try {
      const res = await axios.get(`${prefix}${url}`, { params: params });
      return [res, null];
    } catch (err) {
      return [null, err];
    }
  },
  post: async (url, body = {}) => {
    try {
      const res = await axios.post(`${prefix}${url}`, body);
      return [res, null];
    } catch (err) {
      return [null, err];
    }
  },
};

module.exports = rest;
