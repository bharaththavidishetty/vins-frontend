import React, { useState } from 'react';
import  './bikeentry.css';
import img2 from "../images/Bike.jpg"
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import VehicleInsuranceService from './service/VehicleInsuranceService';


const BikeEntry = () => {
  const [bikeNumber, setBikeNumber] = useState('');
  const [error, setError] = useState('');
  const [err, setErr] = useState('');

  const handleBikeNumberChange = (e) => {
    setBikeNumber(e.target.value.toUpperCase());
    setError(''); // Reset error message on input change
  };

  const validateBikeNumber = (number) => {
    const regex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    return regex.test(number);
  };

  //const [veh,setVeh]=useState([]);

  const navigate = useNavigate();
  

  const handleSearch = () => {
    if (validateBikeNumber(bikeNumber)) {
      console.log(`Searching for bike number: ${bikeNumber}`);


    //   try {
    //     // First API call to get customer details by email
    //     const policyResponse =  axios.get(
    //         `http://192.168.1.29:9090/payment/getCustomerDetailsByMail/${values1.username}`
    //     );

    //     const data = policyResponse.data;
    //     setPaymentdetails(data);
    //     console.log('Payment details:', data);

    //     // Second API call to login
    //     const loginResponse =  axios.post('http://192.168.1.29:9090/Loginpage/add', values1);

    //     // Handle successful response
    //     console.log('Response from backend:', loginResponse.data);

    //     if (loginResponse.data === "Login successfully") {
    //         alert("Login successfully");

    //         // Navigate based on payment details
    //         if (data.length>0) {
    //             navigate("/Profile", { state: { values1, paymentDetails: data } });
    //         } else {
    //             navigate("/PolicyDetails", { state: {  values1 } });
    //         }
    //     } else if (loginResponse.data === "Invalid credentials" || loginResponse.data === "User not found") {
    //         setloginerror("Invalid username or password");
    //     } else {
    //         seterrorvalues("");
    //     }
    // } catch (error) {
    //     console.error('Error during the process:', error);
    //     setloginerror("An unexpected error occurred. Please try again later.");
    // } finally {
    //     setIsLoading(false);
    // }

    
    VehicleInsuranceService.getVehicleDetails(bikeNumber)
    .then(resp=>
      {
          //setVeh(resp.data);
          console.log(resp)
          if(resp.data)
            {
              navigate("/2",{state:{veh:resp.data}});
            }
            else{
              setErr('vehicle does not exist');
            }
      }
      )
      .catch(error=>
        {
            console.log(error);
           setErr('vehicle does not exist');
        })


      // axios.get(`http://192.168.1.47:9090/vehicle/get/${bikeNumber}`)
      // .then(resp=>
      // {
      //     //setVeh(resp.data);
      //     console.log(resp)
      //     if(resp.data)
      //       {
      //         navigate("/2",{state:{veh:resp.data}});
      //       }
      //       else{
      //         setErr('vehicle does not exist');
      //       }
      // }
      // )
      // .catch(error=>
      //   {
      //       console.log(error);
      //      setErr('vehicle does not exist');
      //   })
      
    } else {
      setError('Please enter a valid bike number (e.g. UP15AB1234)');
    }
  };


  return (
    <div className='container-fluid'>
      <Header/>
      <div className='content'>
        <div className='left'>
          <img src={img2} alt='Bike Insurance' className='image' />
        </div>
        <div className='right'>
          <h4>Buy your two-wheeler insurance in <br />60 seconds!*** <i className="fa-solid fa-bolt fa-xl " style={{ color: "#FFD43B" }}></i></h4>
          <h6>Plan starting @ <i className="fa-solid fa-indian-rupee-sign"></i> 1.3/day</h6>
          <div className='input-section'>
            <input
              type='text'
              placeholder='Enter bike number (e.g. UP15AB1234)'
              value={bikeNumber}
              onChange={handleBikeNumberChange}
              maxLength={10}
            />
            {error && <p className='error'>{error}</p>}
            {err && <p className='error'>{err}</p>}
            <button onClick={handleSearch}>view prices</button>
           
          </div>
          <div className='options'>
            Existing user <a href='/login' className='option-link'>Login</a>here
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BikeEntry;