
import axios from "axios";

const vurl = `http://192.168.1.56/vehicle`;
const curl = `http://192.168.1.56/customer`;
const purl = `http://192.168.1.56/profile`;



class VehicleInsuranceService {

    static createCustomer(feilds){
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/customer/add";
        return axios.post(INSURANCE_API_BASE_URL, feilds);
    }

    static createPayment(feilds){
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/payment/add";
        return axios.post(INSURANCE_API_BASE_URL, feilds);
    }


    static getVehicleDetails(vnumber){
        const INSURANCE_API_BASE_URL = "http://192.168.1.200:9090/vehicle/get/"+vnumber;
        return axios.get(INSURANCE_API_BASE_URL);
    }
  
}

export default VehicleInsuranceService
