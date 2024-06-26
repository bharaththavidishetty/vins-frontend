import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';
import Header from './Header';
import Footer from './Footer';

const UserLogin = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [otpa, setOtpa] = useState(Array(5).fill(''));
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const validateMobileNumber = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

  const handleSendOTP = async () => {
    if (validateMobileNumber(mobileNumber)) {
      try {
        const response = await axios.get('http://192.168.1.95:9090/vehicle/sendOtp', {
          params: { mobile: mobileNumber },
        });

        if (response.status === 200) {
          console.log('OTP sent successfully', response.data);
          setOtpa(response.data);
          setIsOTPSent(true);
          setError('');
          setSuccessMessage('OTP sent successfully!');
        } else {
          console.log('Failed to send OTP', response);
          setError('Failed to send OTP');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        setError('Error sending OTP');
      }
    } else {
      setError('Please enter a valid mobile number');
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if a value is entered
      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp); // Debugging log
    
    if(enteredOtp == otpa)
      {
        console.log('sus');
        navigate('/review',{
          state:{mobileNumber}
        });
      }
      
  };

  return (
    
    <div className='ulogin-main'>
      <Header/>
      <div className='cont'>
      <h2 className='ulogin-bold'>Login-Form</h2>
      <div>
        <label className="ulogin-label">Mobile Number:</label>
        <input
          type="text"
          className="ulogin-input"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          maxLength="10"
        />
        <button type="button" className="ulogin-button ulogin-btn-primary" onClick={handleSendOTP}>Send OTP</button>
        {error && <p className="ulogin-message" style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p className="ulogin-message" style={{ color: 'green' }}>{successMessage}</p>}
      </div>
      {isOTPSent && (
        <div>
          <label className="ulogin-label">Enter OTP:</label>
          <div className="ulogin-otp-inputs">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                className="ulogin-otp-input"
                value={value}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                maxLength="1"
                ref={(el) => (otpRefs.current[index] = el)}
              />
            ))}
          </div>
          {otp.every((digit) => digit) && (
            <button type="button" className="ulogin-button ulogin-btn-success" onClick={handleVerifyOTP}>Verify OTP</button>
          )}
        </div>
      )}
      </div>
      <Footer/>
    </div>
  );
};

export default UserLogin;