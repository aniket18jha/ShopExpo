// import React, { useState } from 'react';
// import API from '../api/api';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       nav('/');
//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.msg || 'Login failed');
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
//         <h2 className="text-center mb-4 fw-bold">Login</h2>
//         <form onSubmit={submit}>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             Login
//           </button>
//         </form>

//         {/* Optional: link to signup */}
//         <p className="text-center mt-3 mb-0">
//           Don’t have an account?{" "}
//           <a href="/signupbuyer" className="text-decoration-none">Signup as Buyer</a> |{" "}
//           <a href="/signupvendor" className="text-decoration-none">Signup as Vendor</a>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #d0bfe3 0%, #9cb5e0 100%)",
      }}
    >
      <div className="card shadow-lg border-0 p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Welcome Back</h2>
        <form onSubmit={submit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 shadow-sm"
          >
            Login
          </button>
        </form>

        {/* Signup links */}
        <p className="text-center mt-4 mb-0">
          Don’t have an account? <br />
          <a href="/signupbuyer" className="fw-bold text-decoration-none text-success">Signup as Customer</a> 
          {" "} | {" "}
          <a href="/signupvendor" className="fw-bold text-decoration-none text-warning">Signup as Vendor</a>
        </p>
      </div>
    </div>
  );
}
