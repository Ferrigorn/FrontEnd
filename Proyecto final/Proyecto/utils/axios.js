import axios from "axios";

export const axiosUtils = async(options) =>{
    return await axios.request(options).then((res) => res.data)  
};