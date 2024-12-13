// import { useState } from 'react';
// import axios from 'axios';

// const LeadsForm = () => {
//   const [fullname, setFullname] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [service, setService] = useState('');
//   const [serviceDescription, setServiceDescription] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const [isVerified, setIsVerified] = useState(false);
//   const [formId, setFormId] = useState(null);

//   const API_BASE_URL = 'http://localhost:3000';

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isVerified) {
//       alert('Please verify your email before submitting the form.');
//       return;
//     }

//     const formData = {
//       fullName: fullname,
//       email,
//       number: phone,
//       service,
//       serviceDescription,
//     };

//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/forms`, formData);
//       alert('Form submitted successfully!');
//       console.log('Form Response:', response.data);
//       // Clear the form fields
//       setFullname('');
//       setEmail('');
//       setPhone('');
//       setService('');
//       setServiceDescription('');
//       setIsVerified(false);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Failed to submit the form.');
//     }
//   };

//   const handleSendOtp = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/forms`, { email });
//       setFormId(response.data.formId); // Assume response contains an ID for verification
//       console.log(response.data);
//       console.log(response.data.formId);
//       alert('OTP sent to your email.');
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const payload = {
//         id: formId, // Ensure formId is correctly set during OTP send
//         otp,        // Ensure otp is the entered value
//       };
  
//       console.log("Verifying OTP with payload:", payload);
  
//       const response = await axios.post(`${API_BASE_URL}/api/forms/verify-otp`, payload);
  
//       if (response.data.success) { // Adjust based on your API's success response
//         alert('Email verified successfully!');
//         setIsVerified(true);
//         setIsModalOpen(false);
//       } else {
//         alert('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error.response?.data || error.message);
//       alert('Failed to verify OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <h1 className="text-xl font-bold">Query Form</h1>
//       <p>Complete the information below and we'll get back to you soon.</p>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Fullname */}
//         <div className="flex flex-col">
//           <label htmlFor="fullname">Full Name<span className="text-red-500">*</span></label>
//           <input
//             className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
//             type="text"
//             name="fullname"
//             id="fullname"
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             placeholder='John Doe'
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="flex flex-col relative">
//           <label htmlFor="email">Email<span className="text-red-500">*</span></label>
//           <input
//             className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
//             type="email"
//             name="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder='john@example.com'
//             required
//           />
//           <button
//             type="button"
//             onClick={handleSendOtp}
//             className={`absolute right-[3px] top-[31px] px-3 py-[2.5px] rounded ${
//               email ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
//             }`}
//             disabled={!email || isVerified}
//           >
//             {isVerified ? 'Verified' : 'Verify'}
//           </button>
//         </div>

//         {/* Phone Number */}
//         <div className="flex flex-col">
//           <label htmlFor="phone">Phone Number<span className="text-red-500">*</span></label>
//           <input
//             className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
//             type="text"
//             name="phone"
//             id="phone"
//             value={phone}
//             onChange={(e) => {
//               const input = e.target.value;
//               if (/^\d{0,10}$/.test(input)) setPhone(input);
//             }}
//             placeholder="e.g., 1234567890"
//             inputMode="numeric"
//             pattern="\d{10}"
//             required
//           />
//         </div>

//         {/* Select Services */}
//         <div className="flex flex-col">
//           <label htmlFor="service">Service<span className="text-red-500">*</span></label>
//           <select
//             className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
//             name="service"
//             id="service"
//             value={service}
//             onChange={(e) => setService(e.target.value)}
//             required
//           >
//             <option value="">Select our service</option>
//             <option value="Web Development">Web Development</option>
//             <option value="SEO">SEO</option>
//             <option value="SMO">SMO</option>
//           </select>
//         </div>

//         {/* Service Description */}
//         <div className="flex flex-col relative">
//           <label htmlFor="serviceDescription">Service Description</label>
//           <textarea
//             className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1 resize-none"
//             name="serviceDescription"
//             id="serviceDescription"
//             value={serviceDescription}
//             onChange={(e) => {
//               const input = e.target.value;
//               if (input.length <= 250) setServiceDescription(input);
//             }}
//             placeholder="Write your message"
//             rows={4}
//           ></textarea>
//           <span className="text-gray-500 text-sm absolute right-2 bottom-2">
//             {250 - serviceDescription.length}
//           </span>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-4 ring-blue-300 focus:outline-none"
//         >
//           Submit
//         </button>
//       </form>

//       {/* Modal for OTP Verification */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg w-96">
//             <h2 className="text-lg font-bold">Verify Your Email</h2>
//             <p>Enter the 6-digit OTP sent to your email:</p>
//             <input
//               className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none p-2 w-full"
//               type="text"
//               maxLength="6"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 onClick={handleVerifyOtp}
//               >
//                 Verify
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeadsForm;


import { useState } from 'react';
import axios from 'axios';

const LeadsForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [otp, setOtp] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formId, setFormId] = useState(null);
  const [formData, setFormData] = useState(null);

  const API_BASE_URL = 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullName: fullname,
      email,
      number: phone,
      service,
      serviceDescription,
    };
    setFormData(data);

    try {
      // Send a request to generate OTP and open the modal
      const response = await axios.post(`${API_BASE_URL}/api/forms`, { email });
      setFormId(response.data.formId); // Set the form ID for verification
      setIsModalOpen(true);
      console.log('OTP sent to email:', response.data.formId);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  // const handleVerifyOtp = async () => {
  //   try {
  //     const payload = {
  //       id: formId, // Form ID set during OTP send
  //       otp,        // OTP entered by the user
  //     };

  //     console.log('Verifying OTP with payload:', payload);

  //     const response = await axios.post(`${API_BASE_URL}/api/forms/verify-otp`, payload);

  //     if (response.data.success) { // Adjust based on your API's success response
  //       // Submit form data after successful OTP verification
  //       const formData = {
  //         fullName: fullname,
  //         email,
  //         number: phone,
  //         service,
  //         serviceDescription,
  //       };

  //       await axios.post(`${API_BASE_URL}/api/forms/submit`, formData);
  //       alert('Form submitted successfully!');
  //       console.log('Form submitted:', formData);

  //       // Clear form fields and close the modal
  //       setFullname('');
  //       setEmail('');
  //       setPhone('');
  //       setService('');
  //       setServiceDescription('');
  //       setOtp('');
  //       setIsModalOpen(false);
  //     } else {
  //       alert('Invalid OTP. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error.response?.data || error.message);
  //     alert('Failed to verify OTP. Please try again.');
  //   }
  // };
  const handleVerifyOtp = async () => {
    try {
      // Verify OTP
      const payload = {
        id: formId,
        otp,
        ...formData, // Include all form data
      };
      const response = await axios.post(`${API_BASE_URL}/api/forms/verify-otp`, payload);
      
      if (response.status === 200) { // response.data.success
        alert("Email verified and form submitted successfully!");
        setIsModalOpen(false);

        // Clear form fields
        setFullname("");
        setEmail("");
        setPhone("");
        setService("");
        setServiceDescription("");
        setOtp("");
        setFormId(null);
        setFormData(null);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
      alert("Failed to verify OTP. Please try again.");
    }
  };


  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Query Form</h1>
      <p>Complete the information below and we'll get back to you soon.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fullname */}
        <div className="flex flex-col">
          <label htmlFor="fullname">Full Name<span className="text-red-500">*</span></label>
          <input
            className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
            type="text"
            name="fullname"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email<span className="text-red-500">*</span></label>
          <input
            className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phone">Phone Number<span className="text-red-500">*</span></label>
          <input
            className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d{0,10}$/.test(input)) setPhone(input);
            }}
            placeholder="e.g., 1234567890"
            inputMode="numeric"
            pattern="\d{10}"
            required
          />
        </div>

        {/* Select Services */}
        <div className="flex flex-col">
          <label htmlFor="service">Service<span className="text-red-500">*</span></label>
          <select
            className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1"
            name="service"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select our service</option>
            <option value="Web Development">Web Development</option>
            <option value="SEO">SEO</option>
            <option value="SMO">SMO</option>
          </select>
        </div>

        {/* Service Description */}
        <div className="flex flex-col">
          <label htmlFor="serviceDescription">Service Description</label>
          <textarea
            className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none indent-1 p-1 mt-1 resize-none"
            name="serviceDescription"
            id="serviceDescription"
            value={serviceDescription}
            onChange={(e) => {
              const input = e.target.value;
              if (input.length <= 250) setServiceDescription(input);
            }}
            placeholder="Write your message"
            rows={4}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-4 ring-blue-300 focus:outline-none"
        >
          Submit
        </button>
      </form>

      {/* Modal for OTP Verification */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg w-96">
            <h2 className="text-lg font-bold">Verify Your Email</h2>
            <p>Enter the 6-digit OTP sent to your email:</p>
            <input
              className="border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-4 ring-blue-200 focus:outline-none p-2 w-full"
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleVerifyOtp}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsForm;