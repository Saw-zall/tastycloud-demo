import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8080'
  // baseURL: process.env.API_ENDPOINT
})
