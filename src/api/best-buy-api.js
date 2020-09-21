import axios from 'axios';


export default axios.create({
  baseURL: 'haste-test-api.herokuapp.com/products'
});

