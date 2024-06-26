// import Header from './Header';
// import './Secondpage.css';
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import ShieldIcon from '@mui/icons-material/Shield';
// import AvTimerIcon from '@mui/icons-material/AvTimer';
// import Footer1 from './Footer';
// import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// import axios from 'axios';

// const Secondpage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [errors, setErrors] = useState({});
//   const { state: locationState } = location;

//   const vname = locationState?.veh?.vname;
//   const vnumber = locationState?.veh?.vnumber;
//   const vyear = locationState?.veh?.vyear;
//   const veh = locationState?.veh;

//   const [formData, setFormData] = useState({
//     vnumber:vnumber,
//     firstName: '',
//     lastName: '',
//     address: '',
//     state: '',
//     mobile: '',
//     email: ''
//   });

  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value.trim(),
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     const namePattern = /^[A-Za-z\s]+$/;
//     const mobilePattern = /^[6789]\d{9}$/;
//     const emailPattern = /^\S+@\S+\.\S+$/;

//     if (!formData.firstName) {
//       newErrors.firstName = 'First name is required';
//     } else if (!namePattern.test(formData.firstName)) {
//       newErrors.firstName = 'First name can only contain letters and spaces';
//     }

//     if (!formData.lastName) {
//       newErrors.lastName = 'Last name is required';
//     } else if (!namePattern.test(formData.lastName)) {
//       newErrors.lastName = 'Last name can only contain letters and spaces';
//     }

//     if (!formData.address) {
//       newErrors.address = 'Address is required';
//     }

//     if (!formData.state) {
//       newErrors.state = 'State is required';
//     }

//     if (!formData.mobile) {
//       newErrors.mobile = 'Mobile number is required';
//     } else if (!mobilePattern.test(formData.mobile)) {
//       newErrors.mobile = 'Mobile number must start with 7,8,9 and should have 10 digits';
//     }

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailPattern.test(formData.email)) {
//       newErrors.email = 'Email address is invalid';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axios.post(`http://192.168.1.56:9090/customer/add`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       navigate('/3', {
//         state: {
//           name: `${formData.firstName} ${formData.lastName}`,
//           year: vyear,
//           formData,
//           veh
//         }
//       });
//       if (response.status === 200) {
//         console.log('Form submitted successfully');
//         // Handle success case
//       } else {
//         console.log('Form submission failed');
//         // Handle error case
//       }
//     } catch (error) {
//       console.error('Error submitting form', error);
//       // Handle error case
//     }
 
//   };

//   const indianStates = [
//     "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
//     "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
//     "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
//     "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
//     "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
//     "Uttar Pradesh", "Uttarakhand", "West Bengal"
//   ];

//   return (
//     <>
//       <Header />
//       <div className='container sp-secondpage mt-5'>
//         <div className="row">
//           <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
//             <form onSubmit={handleSubmit} className="sp-form shadow">
//                 <label htmlFor='firstname'>
//                   Full Name:(As per aadhar Card)
//                 </label><br/>
//                 <div className="d-flex justify-content-around flex-column flex-lg-row sp-form-group">
//                   <div>
//                     <input
//                       className="input p-3 rounded"
//                       placeholder='Enter first name'
//                       type="text"
//                       id='firstname'
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       required
//                       autoComplete='off'
//                     /><p/>
//                     {errors.firstName && <p className="sp-error">{errors.firstName}</p>}
//                   </div>
//                   <div>
//                     <input
//                       className="input p-3 rounded"
//                       placeholder='Enter last name'
//                       type="text"
//                       id='lastname'
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       required
//                       autoComplete='off'
//                     />
//                     {errors.lastName && <p className="sp-error">{errors.lastName}</p>}
//                   </div>
//                 </div>
//                 <div className="sp-form-group">
//                   <label>Address:</label>
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="sp-textarea"
//                     autoComplete='off'
//                   />
//                   {errors.address && <p className="sp-error">{errors.address}</p>}
//                 </div>
//                 <div className="sp-form-group">
//                   <label>State:</label>
//                   <select
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                     className="sp-input"
//                   >
//                     <option value="">Select State</option>
//                     {indianStates.map((state) => (
//                       <option key={state} value={state}>
//                         {state}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.state && <p className="sp-error">{errors.state}</p>}
//                 </div>
//                 <div className="sp-form-group">
//                   <label htmlFor='mobile'>Mobile Number:</label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     id='mobile'
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     required
//                     className="sp-input"
//                     maxLength={10}
//                     autoComplete='off'
//                   />
//                   {errors.mobile && <p className="sp-error">{errors.mobile}</p>}
//                 </div>
                
//                 <div className="sp-form-group">
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="sp-input"
//                     autoComplete='off'
//                   />
//                   {errors.email && <p className="sp-error">{errors.email}</p>}
//                 </div>
//                 <button type="submit" className="sp-submit-button px-5 py-2 rounded">Submit</button>
//             </form>
//           </div>
//           <div className='d-flex flex-column col-lg-6 col-md-4 col-sm-2 mt-5 pt-5'>
//             <div className="sp-card1 border rounded">
//               <div className="card-body">
//                 <p className='sp-carddata1'>
//                   {`${vname} / ${vnumber} / REGISTERED IN ${vyear}`}
//                   <i className="fa-solid fa-motorcycle fa-2xl"></i>
//                 </p>
//               </div>
//             </div>
//             <div className="spcard rounded shadow">
//               <div className="card-body border rounded">
//                 <h5 className="card-title sp-card-title pt-2 text-center">Why buy from RSbazaar</h5>
//                 <p className="card-text">
//                   <ul>
//                     <li><i className="fa-solid fa-globe text-success"></i> Claim assistance anytime, anywhere!</li>
//                     <li><ShieldIcon className='text-warning' /> Compare and choose best plan</li>
//                     <li><SupportAgentIcon className='text-dark' /> 24/7 support helpline</li>
//                     <li><AvTimerIcon className='text-primary' /> Get your policy instantly with quick and easy KYC process</li>
//                   </ul>
//                 </p>
//               </div>
//               <div className='sp-card-footer'>
//                 <p className='text-center mt-3 p-2 spfontsize'>
//                   <ContentPasteIcon className='text-success mx-1' /> 10,000+ people use Policybazaar every day to insure their bike
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer1 />
//     </>
//   );
// };

// export default Secondpage;