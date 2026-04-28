import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import { useEffect } from 'react';
import { fetchOrderData, findIssuedPolicies } from '../api/uoi';

export default function Policies() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policyFilter, setPolicyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [travelExpanded, setTravelExpanded] = useState(true);
  const [homeExpanded, setHomeExpanded] = useState(true);
  const [helperExpanded, setHelperExpanded] = useState(false);
  const [motorExpanded, setMotorExpanded] = useState(false);
  const [hospitalisationExpanded, setHospitalisationExpanded] = useState(false);
  const [personalAccidentExpanded, setPersonalAccidentExpanded] = useState(false);


  // ── Live API data (overrides the hardcoded fallback values below) ───
  const [policiesByProduct, setPoliciesByProduct] = useState<Record<string, any[]>>({});
  const [_apiLoading, setApiLoading] = useState<boolean>(true);
  const [_apiError, setApiError] = useState<string | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setApiLoading(true);
        const codes = ['TR01', 'HM01', 'MO01', 'PA01'];
        const results = await Promise.all(codes.map(code =>
          fetchOrderData<{ data?: any[] } | any[]>(
            { ProductCode: code, PageSize: 50, PageNo: 1 }, ac.signal,
          ).then(r => {
            const arr = Array.isArray(r) ? r : (r?.data || []);
            return arr.filter((p: any) => p && (p.PolicyNo || p.PolicyId || p.OrderId));
          }).catch(() => [] as any[])
        ));
        setPoliciesByProduct({ TR01: results[0], HM01: results[1], MO01: results[2], PA01: results[3] });
      } catch (e: any) { if (e?.name !== 'AbortError') setApiError(e?.message || 'Could not load.'); }
      finally { setApiLoading(false); }
    })();
    return () => ac.abort();
  }, []);
  // Convenience — first policy per product (the friend's JSX renders one per accordion)
  const _travel  = policiesByProduct.TR01?.[0];
  const _home    = policiesByProduct.HM01?.[0];
  const _motor   = policiesByProduct.MO01?.[0];
  const _helper  = policiesByProduct.PA01?.[0];
  const _travelCust = _travel?.PolicyCustomerList?.[0];
  const _homeCust   = _home?.PolicyCustomerList?.[0];
  const _travelCount = (policiesByProduct.TR01 || []).length;
  const _homeCount   = (policiesByProduct.HM01 || []).length;
  const _motorCount  = (policiesByProduct.MO01 || []).length;
  const _helperCount = (policiesByProduct.PA01 || []).length;

  const handleBuyPolicy = () => {
    navigate('/proposals/new');
  };

  const handleSubmitClaim = (policyId?: string) => {
    if (policyId) navigate(`/claims/new?policyNo=${encodeURIComponent(policyId)}`);
    else navigate('/claims/new');
  };

  const handleViewPolicy = (policyId?: string) => {
    if (policyId) navigate(`/policies/${encodeURIComponent(policyId)}`);
    else navigate('/policy-details');
  };

  const handleRenew = (policyId?: string) => {
    if (policyId) navigate(`/proposals/new?renew=${encodeURIComponent(policyId)}`);
    else navigate('/proposals/new');
  };

  const handleHelpClick = () => {
    navigate('/faq');
  };

  return (
    <div className="h-screen flex flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeItem="Policies" />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Right Column */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between px-[16px] md:px-[24px] py-[12px] bg-white border-b border-[#000000]/[0.09]">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center gap-[12px]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icon icon="material-symbols:menu" width={24} height={24} style={{color: '#212121'}} />
            <img 
              src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" 
              className="w-[59px] h-[30px]" 
              alt="Logo" 
            />
          </button>

          {/* Desktop Header Icons */}
          <div className="hidden md:flex items-center gap-[20px] ml-auto">
            <button onClick={handleHelpClick}>
              <Icon icon="carbon:help" width={24} height={24} style={{color: '#212121'}} />
            </button>
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
            <div className="w-[1px] h-[32px] bg-[#000000]/[0.09] rounded-full" />
            <Icon icon="material-symbols:person" width={56} height={32} style={{color: '#b3d1ff'}} />
          </div>

          {/* Mobile Notification Icon */}
          <button className="md:hidden">
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
          <div className="p-[16px] md:p-[48px_32px_100px_32px] max-w-[980px] mx-auto space-y-[24px] md:space-y-[28px]">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-[4px]">
              <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Dashboard</span>
              <Icon icon="material-symbols:chevron-right" width={10} height={17} style={{color: '#212121'}} />
              <span className="text-[14px] leading-[21px] text-[#005eb8] font-[Noto_Sans]">Policies</span>
            </div>

            {/* Header Section */}
            <div className="flex flex-col gap-[24px] w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-[12px] w-full">
                <div className="flex-1 flex flex-col gap-[12px]">
                  <h1 className="text-[24px] md:text-[32px] font-bold leading-[28.8px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">Policies</h1>
                </div>
                <button 
                  onClick={() => handleBuyPolicy()}
                  className="flex items-center justify-center px-[16px] py-[12px] gap-[10px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity w-full md:w-auto"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-white font-[Noto_Sans]">Buy Policy</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-[12px] w-full">
                <div className="flex flex-col gap-[8px] w-full md:w-[230px]">
                  <div className="flex items-center justify-between px-[16px] py-[12px] gap-[8px] w-full h-[45px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                    <div className="flex items-center gap-[8px] flex-1">
                      <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy:</span>
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">{policyFilter}</span>
                    </div>
                    <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} style={{color: '#212121'}} />
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full md:w-[230px]">
                  <div className="flex items-center px-[16px] py-[12px] gap-[12px] w-full h-[45px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                    <div className="flex-1 flex items-center gap-[8px]">
                      <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Status:</span>
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">{statusFilter}</span>
                    </div>
                    <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} style={{color: '#212121'}} />
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="flex flex-col gap-[24px] w-full">
              {/* Travel Section */}
              <div className="flex flex-col p-[16px] md:p-[24px] gap-[24px] w-full bg-white rounded-[8px] border-b border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-[8px] w-full">
                  <div className="flex-1 flex items-center gap-[8px]">
                    <Icon icon="material-symbols:flight" width={24} height={24} style={{color: '#212121'}} />
                    <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Travel ({_travelCount})</span>
                  </div>
                  <Icon 
                    icon={travelExpanded ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} 
                    width={24} 
                    height={24} 
                    style={{color: '#212121'}} 
                    onClick={() => setTravelExpanded(!travelExpanded)}
                    className="cursor-pointer"
                  />
                </div>
                
                {travelExpanded && (
                  <div className="flex flex-col md:flex-row p-[16px] md:p-[24px] gap-[24px] w-full bg-white rounded-[8px] border border-[#000000]/[0.09]">
                    <div className="flex-1 flex flex-col gap-[24px]">
                      <div className="flex flex-col gap-[4px]">
                        <div className="flex flex-col md:flex-row md:items-center gap-[8px]">
                          <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">InsureTravel (Annual Trip)</span>
                          <div className="flex items-center justify-center px-[8px] py-[2px] gap-[4px] bg-[#d8ffe2] rounded-[12px] w-fit">
                            <span className="text-[11px] font-medium text-[#2e7d32] font-[Noto_Sans]">In Force</span>
                          </div>
                        </div>
                        <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Policy No: {_travel?.PolicyNo ?? _travel?.PolicyId ?? _travel?.OrderId ?? 'PNF320104124A23'}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px] rounded-[8px]">
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Insured Person(s)</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">{_travelCust?.CustomerName ?? "Chris Wong"}</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Coverage Period</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">1/1/2026 - 31/12/2026</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Premium Amount</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">$265.20</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Premium Due Date</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">NA (Non-Renewal)</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Recurring Payment</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">No (Non-Renewal)</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Payment Method</span>
                          <div className="flex gap-[8px] h-[24px]">
                            <Icon icon="material-symbols:credit-card" width={34} height={24} style={{color: '#ff5722'}} />
                            <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">****9111</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col justify-center gap-[12px] w-full md:w-[126px]">
                      <button 
                        onClick={() => handleSubmitClaim(_travel?.PolicyNo ?? _travel?.PolicyId ?? _travel?.OrderId)}
                        className="flex items-center justify-center px-[12px] py-[12px] gap-[10px] flex-1 md:w-[126px] h-[48px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-white font-[Noto_Sans]">Submit Claim</span>
                      </button>
                      <button 
                        onClick={() => handleViewPolicy(_travel?.PolicyNo ?? _travel?.PolicyId ?? _travel?.OrderId)}
                        className="flex items-center justify-center px-[12px] py-[12px] gap-[10px] flex-1 md:w-[126px] h-[48px] bg-white border border-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#005eb8] font-[Noto_Sans]">View Policy</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Home Section */}
              <div className="flex flex-col p-[16px] md:p-[24px] gap-[24px] w-full bg-white rounded-[8px] border-b border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-[8px] w-full">
                  <div className="flex-1 flex items-center gap-[8px]">
                    <Icon icon="material-symbols:home" width={24} height={24} style={{color: '#212121'}} />
                    <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Home ({_homeCount})</span>
                  </div>
                  <Icon 
                    icon={homeExpanded ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} 
                    width={24} 
                    height={24} 
                    style={{color: '#212121'}} 
                    onClick={() => setHomeExpanded(!homeExpanded)}
                    className="cursor-pointer"
                  />
                </div>
                
                {homeExpanded && (
                  <div className="flex flex-col md:flex-row p-[16px] md:p-[24px] gap-[24px] w-full bg-white rounded-[8px] border border-[#000000]/[0.09]">
                    <div className="flex-1 flex flex-col gap-[24px]">
                      <div className="flex flex-col gap-[4px]">
                        <div className="flex flex-col md:flex-row md:items-center gap-[8px]">
                          <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">UniHome</span>
                          <div className="flex items-center justify-center px-[8px] py-[2px] gap-[4px] bg-[#f8f1da] rounded-[12px] w-fit">
                            <span className="text-[11px] font-medium text-[#e65100] font-[Noto_Sans]">Renewal Due</span>
                          </div>
                        </div>
                        <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Policy No: {_home?.PolicyNo ?? _home?.PolicyId ?? _home?.OrderId ?? 'PNF320104124A23'}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px] rounded-[8px]">
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Insured Person(s)</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">{_homeCust?.CustomerName ?? "Chris Wong"}</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Coverage Period</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">1/1/2026 - 31/12/2026</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Premium Amount</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">$525.00</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Premium Due Date</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">31/12/2026</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Recurring Payment</span>
                          <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Yes</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Payment Method</span>
                          <div className="flex gap-[8px] h-[24px]">
                            <Icon icon="material-symbols:credit-card" width={34} height={24} style={{color: '#ff5722'}} />
                            <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">****9111</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col justify-center gap-[12px] w-full md:w-[126px]">
                      <button 
                        onClick={() => handleRenew(_home?.PolicyNo ?? _home?.PolicyId ?? _home?.OrderId)}
                        className="flex items-center justify-center px-[12px] py-[12px] gap-[10px] flex-1 md:w-[126px] h-[48px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-white font-[Noto_Sans]">Renew</span>
                      </button>
                      <button 
                        onClick={handleSubmitClaim}
                        className="flex items-center justify-center px-[12px] py-[12px] gap-[10px] flex-1 md:w-[126px] h-[48px] bg-white border border-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#005eb8] font-[Noto_Sans]">Submit Claim</span>
                      </button>
                      <button 
                        onClick={() => handleViewPolicy(_home?.PolicyNo ?? _home?.PolicyId ?? _home?.OrderId)}
                        className="flex items-center justify-center px-[12px] py-[12px] gap-[10px] flex-1 md:w-[126px] h-[48px] bg-white border border-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#005eb8] font-[Noto_Sans]">View Policy</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Helper Section */}
              <div className="flex flex-col px-[16px] md:px-[24px] py-[16px] gap-[24px] w-full bg-white rounded-[8px] border-b border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-[8px] w-full">
                  <div className="flex-1 flex items-center gap-[8px]">
                    <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#212121'}} />
                    <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Helper ({_helperCount})</span>
                  </div>
                  <Icon 
                    icon={helperExpanded ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} 
                    width={24} 
                    height={24} 
                    style={{color: '#212121'}} 
                    onClick={() => setHelperExpanded(!helperExpanded)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Motor Section */}
              <div className="flex flex-col px-[16px] md:px-[24px] py-[16px] gap-[24px] w-full bg-white rounded-[8px] border-b border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-[8px] w-full">
                  <div className="flex-1 flex items-center gap-[8px]">
                    <Icon icon="material-symbols:directions-car" width={24} height={24} style={{color: '#212121'}} />
                    <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Motor ({_motorCount})</span>
                  </div>
                  <Icon 
                    icon={motorExpanded ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} 
                    width={24} 
                    height={24} 
                    style={{color: '#212121'}} 
                    onClick={() => setMotorExpanded(!motorExpanded)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Hospitalisation Protection Section */}
              <div className="flex flex-col px-[16px] md:px-[24px] py-[16px] gap-[24px] w-full bg-white rounded-[8px] border-b border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-[8px] w-full">
                  <div className="flex-1 flex items-center gap-[8px]">
                    <Icon icon="material-symbols:local-hospital" width={24} height={24} style={{color: '#212121'}} />
                    <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Hospitalisation Protection (0)</span>
                  </div>
                  <Icon 
                    icon={hospitalisationExpanded ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} 
                    width={24} 
                    height={24} 
                    style={{color: '#212121'}} 
                    onClick={() => setHospitalisationExpanded(!hospitalisationExpanded)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Personal Accident Section */}
              <div className="flex flex-col px-[16px] md:px-[24px] py-[16px] gap-[24px] w-full bg-white rounded-[8px] border-b border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-[8px] w-full">
                  <div className="flex-1 flex items-center gap-[8px]">
                    <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#212121'}} />
                    <span className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Personal Accident (0)</span>
                  </div>
                  <Icon 
                    icon={personalAccidentExpanded ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} 
                    width={24} 
                    height={24} 
                    style={{color: '#212121'}} 
                    onClick={() => setPersonalAccidentExpanded(!personalAccidentExpanded)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">
              Unable to find a policy? Please contact us at <span className="text-[#005eb8]">help@uoi.com.sg</span>.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 flex items-center justify-between px-[16px] md:px-[24px] py-[16px] bg-[#005eb8] text-white">
          <span className="text-[14px] leading-[21px] font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
          <span className="hidden md:block text-[14px] leading-[21px] font-[Noto_Sans]">All Rights Reserved.</span>
        </footer>
      </div>
    </div>
  );
}