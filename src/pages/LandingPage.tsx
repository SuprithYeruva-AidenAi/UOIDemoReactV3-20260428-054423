import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showSystemError, setShowSystemError] = useState(false);

  const handleSingpassLogin = () => {
    navigate('/singpass-login');
  };

  const handleNricLogin = () => {
    navigate('/login-with-nric-fin');
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className="font-[Noto_Sans] min-h-screen w-full flex flex-col bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
      {/* System Error Toast */}
      {showSystemError && (
        <div className="absolute top-[24px] left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#f8d7da] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
          <Icon icon="material-symbols:error" width={16} height={16} style={{color: '#721c24'}} />
          <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#721c24]">System error. Please try again later.</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:flex-1 flex flex-col justify-center items-center p-[24px] md:p-[48px]">
          <div className="w-full max-w-[420px] bg-white/[0.70] bg-[radial-gradient(circle,_rgba(255,255,255,0.56)_0%,_rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] p-[32px_24px] flex flex-col items-center gap-[32px]">
            {/* Header */}
            <div className="flex flex-col items-center gap-[12px] w-full">
              <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" className="w-[100px] h-[50px]" alt="UOI Logo" />
              <h1 className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Welcome to UOI Customer Portal</h1>
              <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Manage all your policies in one portal.</p>
            </div>

            {/* Login Buttons */}
            <div className="flex flex-col gap-[16px] w-full">
              <button 
                onClick={handleSingpassLogin}
                className="w-full flex items-center justify-center gap-[10px] px-[40px] py-[14px] bg-[#dc3545] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-[16px] font-medium leading-[24px] text-white font-[Noto_Sans]">Log in with Singpass</span>
              </button>
              
              {/* Or Divider */}
              <div className="flex items-center gap-[16px] w-full">
                <div className="flex-1 h-px bg-[#e0e0e0]" />
                <span className="text-[14px] text-[#757575] font-[Noto_Sans]">Or</span>
                <div className="flex-1 h-px bg-[#e0e0e0]" />
              </div>
              
              <button 
                onClick={handleNricLogin}
                className="w-full flex items-center justify-center gap-[10px] px-[40px] py-[14px] bg-white border border-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-[16px] font-medium leading-[24px] text-[#005eb8] font-[Noto_Sans]">Log in with NRIC/FIN</span>
              </button>
            </div>
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