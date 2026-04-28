import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import { fetchOrderData, downloadPolicyDocument } from '../api/uoi';

export default function PolicyDetails() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Policy Details');
  const [contactNumber, setContactNumber] = useState('91234567');
  const [emailAddress, setEmailAddress] = useState('chriswong@gmail.com');
  const [mailingAddress, setMailingAddress] = useState('BLK 123A #01-01 S.123456');


  // ── Live API: fetch policy by PolicyNo from URL ──────────────────────
  const { policyNo: _paramPolicyNo } = useParams<{ policyNo: string }>();
  const [_policy, setPolicy] = useState<any>(null);
  const [_apiLoading, setApiLoading] = useState<boolean>(true);
  const [_apiError, setApiError] = useState<string | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    if (!_paramPolicyNo) { setApiLoading(false); return; }
    (async () => {
      try {
        setApiLoading(true);
        const resp = await fetchOrderData<{ data?: any[] } | any[]>(
          { PolicyNo: _paramPolicyNo }, ac.signal,
        );
        const arr = Array.isArray(resp) ? resp : (resp?.data || []);
        const found = arr.find((p: any) => (p?.PolicyNo || p?.PolicyId) === _paramPolicyNo) || arr[0] || null;
        setPolicy(found);
      } catch (e: any) { if (e?.name !== 'AbortError') setApiError(e?.message || 'Could not load policy.'); }
      finally { setApiLoading(false); }
    })();
    return () => ac.abort();
  }, [_paramPolicyNo]);
  const _customer = _policy?.PolicyCustomerList?.[0];
  const _addressParts = [_customer?.Block, _customer?.StreetName, _customer?.BuildingName, _customer?.UnitNo, _customer?.PostCode].filter(Boolean);

  const tabs = [
    'Policy Details',
    'Contact Information', 
    'Document History',
    'Payment History',
    'Others'
  ];

  const handleDownloadPolicy = () => {
    // Download policy functionality
    console.log('Downloading policy...');
  };

  const handleSubmitClaim = () => {
    navigate('/claims');
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...');
  };

  const handleHelpClick = () => {
    navigate('/faq');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Policy Details':
        return (
          <div className="w-full max-w-[980px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
            <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[16px] border-b border-[#000000]/[0.09] bg-white rounded-t-[8px]">
              <h3 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Policy Details</h3>
            </div>
            <div className="p-[16px] md:p-[24px] bg-white rounded-b-[8px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px] mb-[16px] md:mb-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Insured Person(s)</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">{_customer?.CustomerName ?? "Chris Wong"}</span>
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
                  <div className="flex items-center gap-[8px]">
                    <Icon icon="material-symbols:credit-card" width={34} height={24} style={{color: '#ff6b35'}} />
                    <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">****9111</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Product Name</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">InsureTravel</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Trip Type</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Annual Trip</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Group Type</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Individual/Group</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Plan Type</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Value</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Destination Area</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Area 2</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Number of Insured</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">1 Adult</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'Contact Information':
        return (
          <div className="w-full max-w-[980px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
            <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[16px] border-b border-[#000000]/[0.09] bg-white rounded-t-[8px]">
              <div className="flex flex-col gap-[12px]">
                <h3 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Contact Information</h3>
                <p className="text-[12px] md:text-[14px] font-medium leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">All policy documents will be sent to the contact information tied to this specific policy.</p>
              </div>
            </div>
            <div className="p-[16px] md:p-[24px] bg-white">
              <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] mb-[16px] md:mb-[24px]">
                <div className="flex-1">
                  <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] mb-[12px] block">Contact Number</label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full px-[16px] py-[12px] border border-[#000000]/[0.09] rounded-[8px] text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans] bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] mb-[12px] block">Email Address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-[16px] py-[12px] border border-[#000000]/[0.09] rounded-[8px] text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans] bg-white"
                  />
                </div>
              </div>
              <div className="mb-[16px] md:mb-[24px]">
                <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] mb-[12px] block">Mailing Address</label>
                <input
                  type="text"
                  value={mailingAddress}
                  onChange={(e) => setMailingAddress(e.target.value)}
                  className="w-full px-[16px] py-[12px] border border-[#000000]/[0.09] rounded-[8px] text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans] bg-white"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between px-[16px] md:px-[24px] py-[16px] border-t border-[#000000]/[0.09] bg-[#f9f9f9] rounded-b-[8px] gap-[12px]">
              <span className="text-[12px] font-medium leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">Changes apply to this policy immediately.</span>
              <button
                onClick={handleSaveChanges}
                className="px-[16px] py-[8px] bg-[#f5f5f5] border border-[#000000]/[0.09] rounded-[8px] text-[14px] font-medium leading-[21px] text-[#9e9e9e] font-[Noto_Sans] cursor-pointer hover:opacity-90 transition-opacity w-full md:w-auto"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      
      case 'Document History':
        return (
          <div className="w-full max-w-[980px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
            <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[16px] border-b border-[#000000]/[0.09] bg-white rounded-t-[8px]">
              <h3 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Document History</h3>
            </div>
            <div className="p-[16px] md:p-[24px] bg-white rounded-b-[8px]">
              {/* Mobile View */}
              <div className="md:hidden space-y-[12px]">
                <div className="p-[16px] bg-[#f9f9f9] rounded-[8px] border border-[#000000]/[0.09]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex justify-between items-start">
                      <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">Renewal Notice 1</span>
                      <div className="flex gap-[8px]">
                        <Icon icon="material-symbols:visibility" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                        <Icon icon="material-symbols:download" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                      </div>
                    </div>
                    <span className="text-[12px] leading-[18px] text-[#6e6e6e] font-[Noto_Sans]">20 Jan 2026</span>
                  </div>
                </div>
                <div className="p-[16px] bg-[#f9f9f9] rounded-[8px] border border-[#000000]/[0.09]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex justify-between items-start">
                      <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">Renewal Notice 2</span>
                      <div className="flex gap-[8px]">
                        <Icon icon="material-symbols:visibility" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                        <Icon icon="material-symbols:download" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                      </div>
                    </div>
                    <span className="text-[12px] leading-[18px] text-[#6e6e6e] font-[Noto_Sans]">20 Jan 2026</span>
                  </div>
                </div>
              </div>
              
              {/* Desktop View */}
              <div className="hidden md:block">
                <div className="bg-[#f9f9f9] rounded-t-[8px] border-t border-l border-r border-[#000000]/[0.09] px-[24px] py-[12px]">
                  <div className="flex gap-[24px]">
                    <div className="flex-1 text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Doc Name</div>
                    <div className="flex-1 text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Doc Date</div>
                    <div className="w-[120px] text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans] text-center">Actions</div>
                  </div>
                </div>
                <div className="bg-white border-l border-r border-b border-[#000000]/[0.09] px-[24px] py-[12px]">
                  <div className="flex gap-[24px] items-center">
                    <div className="flex-1 text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Renewal Notice 1</div>
                    <div className="flex-1 text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">20 Jan 2026</div>
                    <div className="w-[120px] flex justify-center gap-[8px]">
                      <Icon icon="material-symbols:visibility" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                      <Icon icon="material-symbols:download" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                    </div>
                  </div>
                </div>
                <div className="bg-white border-l border-r border-b border-[#000000]/[0.09] rounded-b-[8px] px-[24px] py-[12px]">
                  <div className="flex gap-[24px] items-center">
                    <div className="flex-1 text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Renewal Notice 2</div>
                    <div className="flex-1 text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">20 Jan 2026</div>
                    <div className="w-[120px] flex justify-center gap-[8px]">
                      <Icon icon="material-symbols:visibility" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                      <Icon icon="material-symbols:download" width={20} height={20} style={{color: '#6e6e6e'}} className="cursor-pointer hover:opacity-70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'Payment History':
        return (
          <div className="w-full max-w-[980px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
            <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[16px] border-b border-[#000000]/[0.09] bg-white rounded-t-[8px]">
              <h3 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Payment History</h3>
            </div>
            <div className="p-[16px] md:p-[24px] bg-white rounded-b-[8px]">
              {/* Mobile View */}
              <div className="md:hidden space-y-[12px]">
                <div className="p-[16px] bg-[#f9f9f9] rounded-[8px] border border-[#000000]/[0.09]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex justify-between items-start">
                      <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">{_policy?.PolicyNo ?? _paramPolicyNo ?? 'PNF320104124A23'}</span>
                      <span className="px-[8px] py-[2px] bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-medium rounded-full">Successful</span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <Icon icon="material-symbols:credit-card" width={20} height={20} style={{color: '#ff6b35'}} />
                      <span className="text-[12px] leading-[18px] text-[#212121] font-[Noto_Sans]">****9111</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[12px] leading-[18px] text-[#6e6e6e] font-[Noto_Sans]">AXS Bill Collection</span>
                      <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">$265.20</span>
                    </div>
                  </div>
                </div>
                <div className="p-[16px] bg-[#f9f9f9] rounded-[8px] border border-[#000000]/[0.09]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex justify-between items-start">
                      <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">{_policy?.PolicyNo ?? _paramPolicyNo ?? 'PNF320104124A23'}</span>
                      <span className="px-[8px] py-[2px] bg-[#fce4ec] text-[#c62828] text-[11px] font-medium rounded-full">Unsuccessful</span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <Icon icon="material-symbols:credit-card" width={20} height={20} style={{color: '#ff6b35'}} />
                      <span className="text-[12px] leading-[18px] text-[#212121] font-[Noto_Sans]">****9111</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[12px] leading-[18px] text-[#6e6e6e] font-[Noto_Sans]">AXS Bill Collection</span>
                      <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">$265.20</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop View */}
              <div className="hidden md:block">
                <div className="bg-[#f9f9f9] rounded-t-[8px] border-t border-l border-r border-[#000000]/[0.09] px-[24px] py-[12px]">
                  <div className="flex gap-[24px]">
                    <div className="w-[180px] text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans] text-center">Transaction Date</div>
                    <div className="w-[160px] text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans] text-center">Transaction Type</div>
                    <div className="w-[170px] text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Payment Method</div>
                    <div className="flex-1 text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans] text-center">Amount</div>
                    <div className="flex-1 text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans] text-center">Status</div>
                  </div>
                </div>
                <div className="bg-white border-l border-r border-b border-[#000000]/[0.09] px-[24px] py-[12px]">
                  <div className="flex gap-[24px] items-center">
                    <div className="w-[180px] text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] text-center">{_policy?.PolicyNo ?? _paramPolicyNo ?? 'PNF320104124A23'}</div>
                    <div className="w-[160px] text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans] text-center">AXS Bill Collection</div>
                    <div className="w-[170px] flex items-center gap-[8px]">
                      <Icon icon="material-symbols:credit-card" width={24} height={24} style={{color: '#ff6b35'}} />
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">****9111</span>
                    </div>
                    <div className="flex-1 text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] text-center">$265.20</div>
                    <div className="flex-1 flex justify-center">
                      <span className="px-[8px] py-[2px] bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-medium rounded-full">Successful</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-l border-r border-b border-[#000000]/[0.09] rounded-b-[8px] px-[24px] py-[12px]">
                  <div className="flex gap-[24px] items-center">
                    <div className="w-[180px] text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] text-center">{_policy?.PolicyNo ?? _paramPolicyNo ?? 'PNF320104124A23'}</div>
                    <div className="w-[160px] text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans] text-center">AXS Bill Collection</div>
                    <div className="w-[170px] flex items-center gap-[8px]">
                      <Icon icon="material-symbols:credit-card" width={24} height={24} style={{color: '#ff6b35'}} />
                      <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">****9111</span>
                    </div>
                    <div className="flex-1 text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] text-center">$265.20</div>
                    <div className="flex-1 flex justify-center">
                      <span className="px-[8px] py-[2px] bg-[#fce4ec] text-[#c62828] text-[11px] font-medium rounded-full">Unsuccessful</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'Others':
        return (
          <div className="w-full max-w-[980px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
            <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[16px] border-b border-[#000000]/[0.09] bg-white rounded-t-[8px]">
              <div className="flex flex-col gap-[12px]">
                <h3 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Others</h3>
                <p className="text-[12px] md:text-[14px] font-medium leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">If this policy is purchased via an agent, please contact agent-in-charge for any updates or changes to policy.</p>
              </div>
            </div>
            <div className="p-[16px] md:p-[24px] bg-white rounded-b-[8px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Agent-in-Charge (Agent ID)</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Albert Tan (102434123)</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Mobile Number</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">9812 32345</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Email Address</span>
                  <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">albertan@aia.com</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-row overflow-hidden font-[Noto_Sans]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeItem="Policies" />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Main Content */}
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
            <div className="flex items-center justify-center w-[56px] h-[32px] bg-[#b3d1ff] rounded-[16px]">
              <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#005eb8'}} />
            </div>
          </div>

          {/* Mobile Notification Icon */}
          <button className="md:hidden">
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
          {/* Breadcrumbs & Header Section */}
          <div className="flex flex-col items-center px-[16px] md:px-[32px] pt-[24px] md:pt-[48px] pb-0 gap-[16px] md:gap-[28px] bg-white">
            <div className="w-full max-w-[980px] flex flex-col gap-[16px] md:gap-[32px]">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-[4px] overflow-x-auto scrollbar-hide">
                <Icon icon="material-symbols:dashboard" width={16} height={16} style={{color: '#6e6e6e'}} />
                <span className="text-[12px] leading-[16.8px] text-[#6e6e6e] font-[Noto_Sans] whitespace-nowrap">Dashboard</span>
                <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#6e6e6e'}} />
                <Icon icon="material-symbols:policy" width={16} height={16} style={{color: '#6e6e6e'}} />
                <span className="text-[12px] leading-[16.8px] text-[#6e6e6e] font-[Noto_Sans] whitespace-nowrap">Policies</span>
                <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#6e6e6e'}} />
                <span className="text-[12px] font-bold leading-[16.8px] text-[#005eb8] font-[Noto_Sans] whitespace-nowrap">InsureTravel (Annual Trip) - PNF320104124A23</span>
              </div>

              {/* Policy Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-[16px]">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col md:flex-row md:items-center gap-[8px] md:gap-[12px]">
                    <h1 className="text-[24px] md:text-[32px] font-bold leading-[28.8px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">InsureTravel (Annual Trip)</h1>
                    <span className="bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-medium px-[8px] py-[2px] rounded-full w-fit">In Force</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Policy No:</span>
                    <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">{_policy?.PolicyNo ?? _paramPolicyNo ?? 'PNF320104124A23'}</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-[12px]">
                  <button
                    onClick={handleDownloadPolicy}
                    className="flex items-center justify-center gap-[8px] px-[12px] py-[12px] bg-white border border-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <Icon icon="material-symbols:download" width={20} height={20} style={{color: '#005eb8'}} />
                    <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#005eb8] font-[Noto_Sans]">Download Policy</span>
                  </button>
                  <button
                    onClick={handleSubmitClaim}
                    className="flex items-center justify-center gap-[10px] px-[12px] py-[12px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-white font-[Noto_Sans]">Submit Claim</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center border-b border-[#000000]/[0.09] overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-[12px] py-[12px] text-[12px] md:text-[14px] font-medium leading-[18px] md:leading-[21px] font-[Noto_Sans] border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? 'text-[#005eb8] border-[#005eb8]'
                        : 'text-[#212121] border-transparent hover:text-[#005eb8]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col items-center px-[16px] md:px-[32px] py-[24px] md:py-[32px] gap-[16px] md:gap-[28px]">
            {renderTabContent()}
            
            {/* Footer Text */}
            <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans] max-w-[980px] text-center">
              For any amendments to your policy, please contact help@uoi.com.sg.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 flex items-center justify-between px-[16px] md:px-[24px] py-[16px] bg-[#005eb8]">
          <span className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
          <span className="hidden md:block text-[14px] leading-[21px] text-white font-[Noto_Sans]">All Rights Reserved.</span>
        </footer>
      </div>
    </div>
  );
}