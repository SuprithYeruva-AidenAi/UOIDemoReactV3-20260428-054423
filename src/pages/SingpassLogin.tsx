import { useNavigate } from 'react-router-dom';

export default function SingpassLogin() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/singpass-data-for-form-filling');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="font-[Noto_Sans] min-h-screen w-full flex flex-col bg-white">
      {/* Header */}
      <header className="w-full bg-[#dc3545] px-[24px] py-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <button 
              onClick={handleBack}
              className="text-white hover:opacity-80 transition-opacity"
            >
              ← Back
            </button>
            <h1 className="text-[20px] font-semibold text-white">Singpass Login</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-[24px] md:p-[48px]">
        <div className="w-full max-w-[600px] bg-white rounded-[12px] shadow-lg p-[32px] text-center">
          {/* Singpass Logo */}
          <div className="mb-[32px]">
            <div className="w-[120px] h-[60px] bg-[#dc3545] rounded-[8px] mx-auto flex items-center justify-center">
              <span className="text-white text-[24px] font-bold">Singpass</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="mb-[32px]">
            <div className="w-[200px] h-[200px] bg-[#f5f5f5] border-2 border-dashed border-[#e0e0e0] rounded-[8px] mx-auto flex items-center justify-center">
              <div className="text-[#6e6e6e] text-center">
                <div className="text-[48px] mb-[8px]">📱</div>
                <p className="text-[14px]">QR Code</p>
                <p className="text-[12px]">Scan with Singpass app</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-[32px]">
            <h2 className="text-[24px] font-semibold text-[#212121] mb-[16px]">Login with Singpass</h2>
            <p className="text-[16px] text-[#6e6e6e] mb-[16px]">
              Scan the QR code with your Singpass app to login securely.
            </p>
            <div className="text-left max-w-[400px] mx-auto">
              <p className="text-[14px] text-[#6e6e6e] mb-[8px]">1. Open your Singpass app</p>
              <p className="text-[14px] text-[#6e6e6e] mb-[8px]">2. Tap "Scan QR"</p>
              <p className="text-[14px] text-[#6e6e6e] mb-[8px]">3. Point your camera at the QR code</p>
              <p className="text-[14px] text-[#6e6e6e]">4. Follow the instructions on your phone</p>
            </div>
          </div>

          {/* Continue Button (for demo purposes) */}
          <button
            onClick={handleContinue}
            className="w-full bg-[#dc3545] text-white px-[40px] py-[14px] rounded-[8px] text-[16px] font-medium leading-[24px] font-[Noto_Sans] hover:opacity-90 transition-opacity"
          >
            Continue (Demo)
          </button>

          {/* Help Text */}
          <div className="mt-[24px]">
            <p className="text-[12px] text-[#6e6e6e]">
              Don't have Singpass? <a href="#" className="text-[#dc3545] hover:underline">Sign up here</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#f5f5f5] px-[24px] py-[16px] text-center">
        <p className="text-[12px] text-[#6e6e6e]">
          This is a secure government service. Your data is protected.
        </p>
      </footer>
    </div>
  );
}