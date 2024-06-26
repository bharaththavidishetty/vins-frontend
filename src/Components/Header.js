import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import img1 from '../images/ramanasoftlogo.jpg';
import '../App.css';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import { ClickAwayListener, Tooltip } from '@mui/material';

function Header() {

  let navigate=useNavigate();

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div className='text-center' >
      <header >
      <div class="d-flex justify-content-between align-items-center  py-2 rounded fixed" style={{background:'#f0f8ff'}} >

				<div className="" >
        <img class="mx-3 ramana" src={img1} alt="my pic" title='RamanaSoft Insurance' style={{borderRadius:'10px',cursor:'pointer'}}></img>
				</div> 

				<div className="ms-auto me-3 ">
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="1800-143-123"
              >
                <Button onClick={handleTooltipOpen} className='text-center me-4'>Call Us &nbsp;<PhoneIcon /></Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
				</div> 

			</div>
			
       
      </header>
    </div>
  )
}

export default Header

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import img1 from '../images/ramanasoftlogo.jpg';
// import '../App.css';
// import PhoneIcon from '@mui/icons-material/Phone';
// import Button from '@mui/material/Button';
// import { ClickAwayListener, Tooltip } from '@mui/material';

// function Header() {
//   let navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/admin");
//   };

//   const [open, setOpen] = useState(false);

//   const handleTooltipClose = () => {
//     setOpen(false);
//   };

//   const handleTooltipOpen = () => {
//     setOpen(true);
//   };

//   return (
//     <div className='text-center'>
//       <header>
//         <div className="d-flex justify-content-between align-items-center py-2 rounded fixed" style={{ background: '#f0f8ff' }}>
//          <Link to='/'><div>
//              <img
//               className="mx-3 ramana"
//               src={img1}
//               alt="RamanaSoft Insurance"
//               title='RamanaSoft Insurance'
//               style={{ borderRadius: '10px', cursor: 'pointer' }}
//               onClick={handleClick}
//             />
//           </div></Link> 

//           <div className="ms-auto me-3">
//             <ClickAwayListener onClickAway={handleTooltipClose}>
//               <div>
//                 <Tooltip
//                   PopperProps={{
//                     disablePortal: true,
//                   }}
//                   onClose={handleTooltipClose}
//                   open={open}
//                   disableFocusListener
//                   disableHoverListener
//                   disableTouchListener
//                   title="1800-143-123"
//                 >
//                   <Button onClick={handleTooltipOpen} className='text-center me-4'>
//                     Call Us &nbsp;<PhoneIcon />
//                   </Button>
//                 </Tooltip>
//               </div>
//             </ClickAwayListener>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;