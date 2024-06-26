import React, { useState, useEffect, useRef } from 'react';
import Footer1 from './Footer';
import './Reviewpage.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

import Header from './Header1';
import fileDownload from "js-file-download";

const ReviewPage = () => {
  const [editMode, setEditMode] = useState({ mobile: false, email: false });
  const [otpMode, setOtpMode] = useState({ mobile: false, email: false });
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    state: '',
    mobile: '',
    email: '',
  });
  const [policy, setPolicy] = useState({
    policynumber:'',
    vehicleNo: '',
    vehiclePrice: '',
    vehicleName: '',
    idv: '',
    registrationYear: '',
    premiumAmount: '',
    customerId: '', // Added customerId to policy details
  });
  const [customerid, setid] = useState('');
  const [paymentid, setpid] = useState('');

  const invoiceUrl = `http://192.168.1.47:9090/payment/create?paymentid=${paymentid}&customerid=${customerid}`;

  const [mobileOtp, setMobileOtp] = useState(Array(5).fill(''));
  const [mobileOtpa, setMobileOtpa] = useState('');
  const [mobileOtpError, setMobileOtpError] = useState('');
  const [mobileOtpSuccessMessage, setMobileOtpSuccessMessage] = useState('');

  const [emailOtp, setEmailOtp] = useState(Array(5).fill(''));
  const [emailOtpa, setEmailOtpa] = useState('');
  const [emailOtpError, setEmailOtpError] = useState('');
  const [emailOtpSuccessMessage, setEmailOtpSuccessMessage] = useState('');

  const otpRefs = useRef([]);
  const emailOtpRefs = useRef([]);

  const location = useLocation();
  const { mobileNumber } = location.state || {};

  useEffect(() => {
    if (mobileNumber) {
      getCustomerDetails(mobileNumber);
    } 
  }, [mobileNumber]);

  useEffect(() => {
    if (customerid) {
      getProfileDetails(customerid);
    }
  }, [customerid]);

  const getCustomerDetails = async (mobile) => {
    try {
      const response = await axios.get(`http://192.168.1.47:9090/customer/get/${mobile}`);
      if (response.status === 200) {
        const customerData = response.data;
        setid(response.data.customerid);
        setProfile({
          name: `${customerData.firstName} ${customerData.lastName}`,
          address: customerData.address,
          state: customerData.state,
          mobile: customerData.mobile,
          email: customerData.email,
          vehicleNo: customerData.vnumber,
        });
      } else {
        console.log('Failed to get details');
      }
    } catch (error) {
      console.error('Error getting details:', error);
    }
  };

  const getProfileDetails = async (customerid) => {
    try {
      const response = await axios.get(`http://192.168.1.47:9090/payment/fetch/${customerid}`);
      if (response.status === 200) {
        const profileData = response.data[0];
        console.log(response.data);
        setpid(response.data[0].paymentid);
        setPolicy({
          policynumber: profileData.id,
          vehicleNo: profileData.vnumber,
          vehiclePrice: profileData.vprice,
          vehicleName: profileData.vname,
          idv: profileData.idv,
          registrationYear: profileData.vyear,
          premiumAmount: profileData.premiumAmount,
          customerId: profileData.customerid, // Updated to include customerId
        });
      } else {
        console.log('Failed to get details');
      }
    } catch (error) {
      console.error('Error getting details:', error);
    }
  };

  const handleSendMobileOTP = async () => {
    if (/^[6-9]\d{9}$/.test(profile.mobile)) {
      try {
        const response = await axios.get(`http://192.168.1.47:9090/vehicle/sendOtp`, {
          params: { mobile: profile.mobile },
        });
        console.log('mobile otp received',response.data);
        if (response.status === 200) {
          setMobileOtpa(response.data);
          setMobileOtpError('');
          setMobileOtpSuccessMessage('OTP sent successfully!');
          setOtpMode({ ...otpMode, mobile: true });
        } else {
          setMobileOtpError('Failed to send OTP');
        }
      } catch (error) {
        setMobileOtpError('Error sending OTP');
      }
    } else {
      setMobileOtpError('Please enter a valid mobile number');
    }
  };

  const handleSendEmailOTP = async () => {
    if (/^[a-z0-9._%+-]+@gmail\.com$/.test(profile.email)) {
      
      try {
        const response = await axios.post(`http://192.168.1.47:9090/vehicle/sendEmailOTPforUpdation/${profile.email}`);
        console.log('email otp received',response.data);
        if (response.status === 200) {
          setEmailOtpa(response.data);
          setEmailOtpError('');
          setEmailOtpSuccessMessage('OTP sent successfully!');
          setOtpMode({ ...otpMode, email: true });
        } else {
          setEmailOtpError('Failed to send OTP');
        }
      } catch (error) {
        setEmailOtpError('Error sending OTP');
      }
    } else {
      setEmailOtpError('Please enter a valid email address');
    }
  };

  const handleOTPChange = (otpType, index, value) => {
    if (value.length <= 1) {
      if (otpType === 'mobile') {
        const newOtp = [...mobileOtp];
        newOtp[index] = value;
        setMobileOtp(newOtp);

        if (value && index < otpRefs.current.length - 1) {
          otpRefs.current[index + 1].focus();
        }
      } else if (otpType === 'email') {
        const newOtp = [...emailOtp];
        newOtp[index] = value;
        setEmailOtp(newOtp);

        if (value && index < emailOtpRefs.current.length - 1) {
          emailOtpRefs.current[index + 1].focus();
        }
      }
    }
  };

  const handleVerifyOTP = async (otpType) => {
    if (otpType === 'mobile') {
      const enteredOtp = mobileOtp.join('');
      if (enteredOtp == mobileOtpa) {
        setMobileOtpError('');
        setMobileOtpSuccessMessage('Mobile OTP verified successfully!');
        setEditMode({ ...editMode, mobile: false });
        setOtpMode({ ...otpMode, mobile: false });
        try {
          const response = await axios.put(`http://192.168.1.47:9090/customer/updatemobile/${customerid}/${profile.mobile}`);
          console.log(response.data);
          if (response.status === 200) {
            console.log('sucess in changing mobile number');
          } else {
            console.log('Failed to changing mobile number');
          }
        } catch (error) {
          console.error('Error changing mobile:', error);
        }
      } else {
        setMobileOtpError('Invalid OTP');
      }
    } else if (otpType === 'email') {
      const enteredOtp = emailOtp.join('');
      if (enteredOtp == emailOtpa) {
        setEmailOtpError('');
        setEmailOtpSuccessMessage('Email OTP verified successfully!');
        setEditMode({ ...editMode, email: false });
        setOtpMode({ ...otpMode, email: false });
        try {
          const response = await axios.put(`http://192.168.1.47:9090/customer/updateemail/${customerid}/${profile.email}`);
          console.log(response.data);
          if (response.status === 200) {
            console.log('sucess in changing email');
          } else {
            console.log('Failed to change email');
          }
        } catch (error) {
          console.error('Error changing email:', error);
        }
      } else {
        setEmailOtpError('Invalid OTP');
      }
    }
  };

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = (field) => {
    console.log(profile.mobile);
    if (field === 'mobile' && !/^[6-9]\d{9}$/.test(profile.mobile)) {
      setMobileOtpError('Please enter a valid mobile number');
      return;
    }
    console.log(profile.email);
    if (field === 'email' && !/^[a-z0-9._%+-]+@gmail\.com$/.test(profile.email)) {
      setEmailOtpError('Please enter a valid email address');
      return;
    }
    if (field === 'mobile') {
      handleSendMobileOTP();
    } else if (field === 'email') {
      handleSendEmailOTP();
    }
  };

  return (
    <div className='rp-main'>
      <Header />
      <div className='rp-cd ' style={{ marginTop: '60px' }}>
        <div className='row'></div>
      </div>

      <div className='row mt-2 pt-3 reviewpage-1'>
        <div className='px-3 col-12 col-md-4'>
          <h4 className='profile-heading'>Profile Details <i className="fa-solid fa-pen-nib"></i></h4>
          <div className="card rp-card">
            <div className="rp-card-body">
              <div className="profile-item">
                <label>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                <span>{profile.name}</span>
              </div>
              <div className="profile-item">
                <label>Address &nbsp;&nbsp; :&nbsp;</label>
                <span>{profile.address}</span>
              </div>
              <div className="profile-item">
                <label>State &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;</label>
                <span>{profile.state}</span>
              </div>
              <div className="profile-item">
                <label>Mobile No&nbsp; :&nbsp;</label>
                {editMode.mobile ? (
                  <>
                    <input
                      type="text"
                      name="mobile"
                      value={profile.mobile}
                      onChange={handleChange}
                     id='mobile-field'
                      placeholder='Enter Mobile'
                      onKeyPress={(e) => {
                        const isValidInput = /[0-9]/;
                        if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <button className="btn btn-sm btn-primary mx-2" onClick={() => handleSave('mobile')}>Save</button>
                  </>
                ) : (
                  <>
                    <span>{profile.mobile}</span>
                    <button className="btn btn-sm btn-primary mx-2 " onClick={() => handleEdit('mobile')} >Edit</button>
                  </>
                )}
              </div>
              {otpMode.mobile && (
                <div className="otp-verification">
                  <div className="otp-input">
                    {mobileOtp.map((digit, index) => (
                      <input
                        key={index}
                        type="text" 
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange('mobile', index, e.target.value)}
                        ref={(el) => otpRefs.current[index] = el}
                      />
                    ))}
                  </div>
                  <button className="btn btn-sm btn-primary mx-2" onClick={() => handleVerifyOTP('mobile')}>Verify OTP</button>
                  {mobileOtpError && <div className="error">{mobileOtpError}</div>}
                  {mobileOtpSuccessMessage && <div className="success">{mobileOtpSuccessMessage}</div>}
                </div>
              )}
              <div className="profile-item">
                <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                {editMode.email ? (
                  <>
                    <input
                      type="text"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder='Enter Email'
                      id='mobile-field'
                    />
                    <button className="btn btn-sm btn-primary mx-2 " onClick={() => handleSave('email')}>Save</button>
                  </>
                ) : (
                  <>
                    <span>{profile.email}</span>
                    <button className="btn btn-sm btn-primary mx-2" onClick={() => handleEdit('email')}>Edit</button>
                  </>
                )}
              </div>
              {otpMode.email && (
                <div className="otp-verification">
                  <div className="otp-input">
                    {emailOtp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange('email', index, e.target.value)}
                        ref={(el) => emailOtpRefs.current[index] = el}
                      />
                    ))}
                  </div>
                  <button className="btn btn-sm btn-primary mx-2" onClick={() => handleVerifyOTP('email')}>Verify OTP</button>
                  {emailOtpError && <div className="error">{emailOtpError}</div>}
                  {emailOtpSuccessMessage && <div className="success">{emailOtpSuccessMessage}</div>}
                </div>
              )}
            </div>
          </div>  
        </div>

        <div className='px-3 col-12 col-md-8'>
          <h4 className='profile-heading'>Policy Details <i className="fa-solid fa-pen-nib"></i></h4>
          <div class="card">
          <div class="card-body profile-card d-flex justify-content-between">
          <div className="text-nowrap">
            <label>Policy Number :&nbsp;</label>
            <span>RSVI{policy.policynumber}</span>
          </div>
          <div className="text-nowrap">
            <label>Customer Id :&nbsp;</label>
            <span>{customerid}</span>
          </div>
          
          </div>
</div>
<div className="card rp-card">
            <div className="rp-card-body ">
              <div className="d-flex flex-column p-3 flex-md-row">
                <div className="col rp-line" style={{ borderRight: '2px solid grey' }}>
                  <div className="profile-item text-nowrap">
                    <label>Vehicle No &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                    <span>{policy.vehicleNo}</span>
                  </div>
                  <div className="profile-item text-nowrap">
                    <label>Vehicle Price&nbsp; &nbsp;&nbsp;&nbsp;:&nbsp;</label>
                    <span>{policy.vehiclePrice}</span>
                  </div>
                  <div className="profile-item text-nowrap">
                    <label>Vehicle Name&nbsp; &nbsp;&nbsp;:&nbsp;</label>
                    <span>{policy.vehicleName}</span>
                  </div>
                </div>
                <div className="col-1 line-divider">
                  <div className="divider"></div>
               </div>
                 <div className="col-7 ps-5 ms-5">
                  <div className="profile-item text-nowrap">
                    <label>IDV&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                    <span>{policy.idv}</span>
                   </div>
                  <div className="profile-item text-nowrap">
                   <label>Registration Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                   <span>{policy.registrationYear}</span>
                   </div>
                   <div className="profile-item text-nowrap">
                     <label>Premium Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                    <span>{policy.premiumAmount}</span>
                  </div>
                </div>
               </div>
               <a href={invoiceUrl} class="btn btn-primary" className='rp-invoice' >Invoice <i class="fa-solid fa-download"></i></a>
               {/* <button className="invoice-button" onClick={handleInvoiceDownload} >  Invoice <i class="fa-solid fa-download"></i></button> */}
             </div>
           </div>
         </div>
       </div>

      <Footer1 />
    </div>
  );
};

export default ReviewPage;