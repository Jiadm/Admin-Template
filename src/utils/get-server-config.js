import Vue from 'vue'
import axios from 'axios'

Vue.prototype.axios = axios

/**
 * 
 * @param {*} jsonPath 传入的json地址
 */
export  function getServerConfig(jsonPath) {
    return new Promise((resolve) => {
        axios.get(jsonPath).then(result => {
            const config = result.data;
           resolve(config);
        });
    });
 
}
