import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function CreateAccountWithNric11() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: personal details, 2: password setup
  const [nric, setNric] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [showOtpSent, setShowOtpSent] = useState(false);
  const [showGetOtp, setShowGetOtp] = useState(false);

  const handleNext = () => {
    if (!nric || !dateOfBirth || !email) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setShowGetOtp(true);
  };

  const handleGetOtp = () => {
    setShowOtpSent(true);
    setCurrentStep(2);
    setTimeout(() => setShowOtpSent(false), 3000);
  };

  const handleCreateAccount = () => {
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setTimeout(() => navigate('/login-with-nric-fin'), 800);
  };

  const handleBackToLogin = () => {
    navigate('/login-with-nric-fin');
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Contains number', met: /\d/.test(password) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  return (
    <div className="font-[Noto_Sans] min-h-screen w-full flex flex-col bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
      {/* OTP Sent Toast */}
      {showOtpSent && (
        <div className="absolute top-[24px] left-1/2 transform -translate-x-1/2 z-50 bg-[#d8ffe2] px-[16px] py-[8px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[16px] h-[16px] bg-green-500 rounded-full flex items-center justify-center">
              <Icon icon="material-symbols:check" width={12} height={12} style={{color: '#ffffff'}} />
            </div>
            <span className="text-[14px] text-[#212121] font-[Noto_Sans]">OTP sent to email address</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:flex-1 flex flex-col justify-center items-center gap-[24px] p-[24px] md:p-[32px]">
          <div className="w-full max-w-[420px] bg-white/[0.70] rounded-[24px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] p-[32px] flex flex-col gap-[32px]">
            
            {/* Back Button (for step 2) */}
            {currentStep === 2 && (
              <button 
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-[4px] self-start text-[#6e6e6e] hover:opacity-70 transition-opacity"
              >
                <Icon icon="material-symbols:chevron-left" width={20} height={20} style={{color: '#6e6e6e'}} />
                <span className="text-[14px] leading-[21px] font-[Noto_Sans]">Back</span>
              </button>
            )}

            {/* Header */}
            <div className="flex flex-col items-center gap-[12px]">
              <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px]" />
              <h1 className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">
                {currentStep === 1 ? 'Create Account' : 'Set Password'}
              </h1>
              <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">
                {currentStep === 1 ? 'Enter your personal details to get started.' : 'Create a secure password for your account.'}
              </p>
            </div>

            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-[16px]">
                {/* NRIC/FIN Field */}
                <div className="flex flex-col gap-[4px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">NRIC/FIN</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={nric}
                        onChange={(e) => setNric(e.target.value)}
                        placeholder="S1234567A"
                        className="w-full px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] focus:outline-none focus:border-[#005eb8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Date of Birth Field */}
                <div className="flex flex-col gap-[4px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Date of Birth</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] focus:outline-none focus:border-[#005eb8] pr-[48px]"
                      />
                      <Icon icon="material-symbols:calendar-month" width={24} height={24} style={{color: '#6e6e6e'}} className="absolute right-[16px] top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-[4px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Email Address</span>
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="chriswong@gmail.com"
                        className={`w-full px-[16px] py-[12px] bg-white rounded-[8px] border ${error.includes('email') ? 'border-[#dc3545]' : 'border-[#000000]/[0.09]'} text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] focus:outline-none focus:border-[#005eb8] pr-[48px]`}
                      />
                      {showGetOtp && (
                        <button
                          onClick={handleGetOtp}
                          className="absolute right-[8px] top-1/2 transform -translate-y-1/2 bg-transparent border border-[#005eb8] text-[#005eb8] px-[12px] py-[4px] rounded-[4px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                        >
                          Get OTP
                        </button>
                      )}
                    </div>
                  </div>
                  {error.includes('email') && (
                    <div className="flex items-center gap-[8px]">
                      <Icon icon="material-symbols:error" width={16} height={16} style={{color: '#dc3545'}} />
                      <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">Invalid email address</span>
                    </div>
                  )}
                </div>

                {/* OTP Field (shown after Get OTP is clicked) */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex flex-col gap-[12px]">
                      <div className="flex items-center gap-[8px]">
                        <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">OTP Code</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="123456"
                          className="w-full px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] focus:outline-none focus:border-[#005eb8]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Password Setup */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-[16px]">
                {/* Password Field */}
                <div className="flex flex-col gap-[4px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] focus:outline-none focus:border-[#005eb8] pr-[48px]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[16px] top-1/2 transform -translate-y-1/2"
                      >
                        <Icon icon="material-symbols:visibility" width={24} height={24} style={{color: '#6e6e6e'}} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="flex flex-col gap-[8px]">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-[8px]">
                      {req.met ? (
                        <Icon icon="material-symbols:check-circle" width={16} height={16} style={{color: '#38a169'}} />
                      ) : (
                        <div className="w-[16px] h-[16px] rounded-full border border-[#e0e0e0]"></div>
                      )}
                      <span className={`text-[12px] leading-[16.8px] font-[Noto_Sans] ${req.met ? 'text-[#38a169]' : 'text-[#6e6e6e]'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-[4px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Confirm Password</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] focus:outline-none focus:border-[#005eb8] pr-[48px]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-[16px] top-1/2 transform -translate-y-1/2"
                      >
                        <Icon icon="material-symbols:visibility" width={24} height={24} style={{color: '#6e6e6e'}} />
                      </button>
                    </div>
                  </div>
                  {error === 'Passwords do not match' && (
                    <div className="flex items-center gap-[8px]">
                      <Icon icon="material-symbols:error" width={16} height={16} style={{color: '#dc3545'}} />
                      <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">Passwords do not match</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={currentStep === 1 ? handleNext : handleCreateAccount}
              className="w-full bg-[#005eb8] text-white px-[40px] py-[14px] rounded-[8px] text-[16px] font-medium leading-[24px] font-[Noto_Sans] hover:opacity-90 transition-opacity"
            >
              {currentStep === 1 ? 'Next' : 'Create Account'}
            </button>
          </div>

          {/* Footer Links */}
          <div className="w-full max-w-[420px] flex flex-col gap-[12px] text-center">
            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">
              Already have an account?{' '}
              <span 
                className="text-[#005eb8] cursor-pointer hover:underline"
                onClick={handleBackToLogin}
              >
                Log in
              </span>
            </p>
            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">
              If you're experiencing login issues, please contact us at{' '}
              <a href="mailto:help@uoi.com.sg" className="text-[#005eb8] hover:underline">
                help@uoi.com.sg
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:flex-1">
          <img src="https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__" alt="Travel" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full h-[53px] bg-[#005eb8] flex items-center justify-between px-[24px]">
        <p className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">
          Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.
        </p>
        <p className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">
          All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}