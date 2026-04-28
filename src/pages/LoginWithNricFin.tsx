import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function LoginWithNricFin() {
  const navigate = useNavigate();
  const [nric, setNric] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'forgot-password', 'reset-password'
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = () => {
    if (!nric || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleSendResetEmail = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setShowToast('Password reset email sent');
    setTimeout(() => {
      setShowToast('');
      setCurrentView('reset-password');
    }, 2000);
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setShowToast('Password updated successfully.');
    setTimeout(() => {
      setShowToast('');
      setCurrentView('login');
      setNewPassword('');
      setConfirmPassword('');
      setEmail('');
    }, 2000);
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setError('');
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className="font-[Noto_Sans] min-h-screen w-full flex flex-col bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-[24px] left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
          <div className="w-[16px] h-[16px] bg-[#38a169] rounded-full flex items-center justify-center">
            <Icon icon="material-symbols:check" width={12} height={12} style={{color: '#ffffff'}} />
          </div>
          <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">{showToast}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:flex-1 flex flex-col justify-center items-center p-[24px] md:p-[48px]">
          <div className="w-full max-w-[420px] bg-white/[0.70] bg-[radial-gradient(circle,_rgba(255,255,255,0.56)_0%,_rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] p-[32px_24px] flex flex-col items-center gap-[32px]">
            
            {/* Back Button (only for forgot password and reset password) */}
            {(currentView === 'forgot-password' || currentView === 'reset-password') && (
              <div className="w-full flex items-center gap-[4px] cursor-pointer" onClick={handleBackToLogin}>
                <Icon icon="material-symbols:chevron-left" width={20} height={20} style={{color: '#6e6e6e'}} />
                <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Back</span>
              </div>
            )}

            {/* Header */}
            <div className="flex flex-col items-center gap-[12px] w-full">
              <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" className="w-[100px] h-[50px]" alt="UOI Logo" />
              <h1 className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">
                {currentView === 'login' && 'Welcome to UOI Customer Portal'}
                {currentView === 'forgot-password' && 'Forgot Password'}
                {currentView === 'reset-password' && 'Reset Password'}
              </h1>
              <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">
                {currentView === 'login' && 'Manage all your policies in one portal.'}
                {currentView === 'forgot-password' && 'Enter your email address to receive a password reset link.'}
                {currentView === 'reset-password' && 'Enter your new password.'}
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-[16px] w-full">
              {currentView === 'login' && (
                <>
                  {/* NRIC/FIN Field */}
                  <div className="flex flex-col gap-[4px] w-full">
                    <div className="flex flex-col gap-[12px] w-full">
                      <div className="flex items-center gap-[8px] h-[21px]">
                        <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">NRIC/FIN</span>
                      </div>
                      <div className="flex items-center px-[16px] py-[12px] gap-[8px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                        <input
                          type="text"
                          value={nric}
                          onChange={(e) => setNric(e.target.value)}
                          className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex flex-col gap-[4px] w-full">
                      <div className="flex flex-col gap-[12px] w-full">
                        <div className="flex items-center gap-[8px] h-[21px]">
                          <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password</span>
                        </div>
                        <div className="flex items-center justify-between px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                            placeholder=""
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer"
                          >
                            <Icon icon={showPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"} width={24} height={24} style={{color: '#6e6e6e'}} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <span 
                      onClick={handleForgotPassword}
                      className="text-[14px] leading-[21px] text-[#0d6efd] font-[Noto_Sans] cursor-pointer"
                    >
                      Forgot password?
                    </span>
                  </div>
                </>
              )}

              {currentView === 'forgot-password' && (
                <div className="flex flex-col gap-[4px] w-full">
                  <div className="flex flex-col gap-[12px] w-full">
                    <div className="flex items-center gap-[8px] h-[21px]">
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Email Address</span>
                    </div>
                    <div className="flex items-center px-[16px] py-[12px] gap-[8px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'reset-password' && (
                <>
                  {/* New Password Field */}
                  <div className="flex flex-col gap-[4px] w-full">
                    <div className="flex flex-col gap-[12px] w-full">
                      <div className="flex items-center gap-[8px] h-[21px]">
                        <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">New Password</span>
                      </div>
                      <div className="flex items-center justify-between px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                          placeholder=""
                        />
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="cursor-pointer"
                        >
                          <Icon icon={showNewPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"} width={24} height={24} style={{color: '#6e6e6e'}} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="flex flex-col gap-[4px] w-full">
                    <div className="flex flex-col gap-[12px] w-full">
                      <div className="flex items-center gap-[8px] h-[21px]">
                        <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Confirm Password</span>
                      </div>
                      <div className="flex items-center justify-between px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                          placeholder=""
                        />
                        <button
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="cursor-pointer"
                        >
                          <Icon icon={showConfirmPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"} width={24} height={24} style={{color: '#6e6e6e'}} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Error Message */}
              {error && (
                <p className="text-[14px] leading-[21px] text-[#dc3545] font-[Noto_Sans]">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              onClick={currentView === 'login' ? handleLogin : currentView === 'forgot-password' ? handleSendResetEmail : handleResetPassword}
              className="w-full flex items-center justify-center gap-[10px] px-[40px] py-[14px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white font-[Noto_Sans]">
                {currentView === 'login' && 'Login'}
                {currentView === 'forgot-password' && 'Send Reset Email'}
                {currentView === 'reset-password' && 'Update Password'}
              </span>
            </button>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
            <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
              Don't have an account? <span onClick={handleCreateAccount} className="text-[#005eb8] cursor-pointer">Create an account</span>
            </p>
            <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
              If you're experiencing login issues, please contact us at <span className="text-[#005eb8]">help@uoi.com.sg</span>.
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:flex-1">
          <img src="https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__" className="w-full h-full object-cover" alt="Travel" />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full h-[53px] bg-[#005eb8] flex items-center justify-between px-[24px]">
        <span className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
        <span className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">All Rights Reserved.</span>
      </footer>
    </div>
  );
}