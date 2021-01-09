import axios from 'axios'

const jajanRequest = axios.create({
  baseURL: 'https://jajanbackend.herokuapp.com',
})

export default jajanRequest
