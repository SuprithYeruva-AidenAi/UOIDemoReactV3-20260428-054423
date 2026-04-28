import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingpassDataForFormFilling() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState({
    name: true,
    nric: true,
    dateOfBirth: true,
    address: true,
    email: false,
    phone: false
  });

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/singpass-login');
  };

  const handleDataToggle = (field: string) => {
    setSelectedData(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
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
            <h1 className="text-[20px] font-semibold text-white">Data Sharing Consent</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-[24px] md:p-[48px]">
        <div className="w-full max-w-[600px] bg-white rounded-[12px] shadow-lg p-[32px]">
          {/* Singpass Logo */}
          <div className="mb-[32px] text-center">
            <div className="w-[120px] h-[60px] bg-[#dc3545] rounded-[8px] mx-auto flex items-center justify-center mb-[16px]">
              <span className="text-white text-[24px] font-bold">Singpass</span>
            </div>
            <h2 className="text-[24px] font-semibold text-[#212121] mb-[8px]">Data for Form Filling</h2>
            <p className="text-[16px] text-[#6e6e6e]">
              UOI Customer Portal would like to access the following information from your Singpass profile:
            </p>
          </div>

          {/* Data Selection */}
          <div className="mb-[32px]">
            <div className="space-y-[16px]">
              {[
                { key: 'name', label: 'Full Name', value: 'John Doe', required: true },
                { key: 'nric', label: 'NRIC/FIN', value: 'S1234567A', required: true },
                { key: 'dateOfBirth', label: 'Date of Birth', value: '01/01/1990', required: true },
                { key: 'address', label: 'Residential Address', value: '123 Main Street, Singapore 123456', required: true },
                { key: 'email', label: 'Email Address', value: 'john.doe@email.com', required: false },
                { key: 'phone', label: 'Mobile Number', value: '+65 9123 4567', required: false }
              ].map((item) => (
                <div key={item.key} className="flex items-start gap-[12px] p-[16px] bg-[#f9f9f9] rounded-[8px]">
                  <input
                    type="checkbox"
                    checked={selectedData[item.key as keyof typeof selectedData]}
                    onChange={() => !item.required && handleDataToggle(item.key)}
                    disabled={item.required}
                    className="mt-[2px] w-[16px] h-[16px] text-[#dc3545] border-[#e0e0e0] rounded focus:ring-[#dc3545]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-[8px] mb-[4px]">
                      <span className="text-[14px] font-medium text-[#212121]">{item.label}</span>
                      {item.required && (
                        <span className="text-[12px] text-[#dc3545] bg-[#fce4ec] px-[6px] py-[2px] rounded-[4px]">Required</span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6e6e6e]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consent Text */}
          <div className="mb-[32px] p-[16px] bg-[#f0f8ff] border border-[#e3f2fd] rounded-[8px]">
            <p className="text-[12px] text-[#6e6e6e] leading-[18px]">
              By clicking "Allow", you consent to UOI Customer Portal accessing and using the selected information 
              from your Singpass profile to pre-fill forms and provide personalized services. 
              This information will be used in accordance with UOI's Privacy Policy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-[12px]">
            <button
              onClick={handleBack}
              className="flex-1 bg-transparent border border-[#e0e0e0] text-[#6e6e6e] px-[24px] py-[12px] rounded-[8px] text-[16px] font-medium leading-[24px] font-[Noto_Sans] hover:opacity-90 transition-opacity"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 bg-[#dc3545] text-white px-[24px] py-[12px] rounded-[8px] text-[16px] font-medium leading-[24px] font-[Noto_Sans] hover:opacity-90 transition-opacity"
            >
              Allow
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#f5f5f5] px-[24px] py-[16px] text-center">
        <p className="text-[12px] text-[#6e6e6e]">
          This is a secure government service. Your data is protected and will only be shared with your consent.
        </p>
      </footer>
    </div>
  );
}