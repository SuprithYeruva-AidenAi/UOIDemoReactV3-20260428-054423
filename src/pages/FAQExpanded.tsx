import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';

export default function FAQExpanded() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFAQs, setExpandedFAQs] = useState({
    'getting-started-1': true,
    'getting-started-2': true,
    'getting-started-3': true,
    'claim-1': true,
    'claim-2': true,
    'policy-1': true,
    'policy-2': true,
    'policy-3': true,
    'payment-1': true,
    'payment-2': true,
    'account-1': true,
    'account-2': true
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearch = () => {
    // Search functionality
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden font-[Noto_Sans]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeItem="Help" />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between px-[16px] md:px-[24px] py-[12px] bg-white border-b border-[#000000]/[0.09]">
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icon icon="material-symbols:menu" width={24} height={24} style={{color: '#212121'}} />
          </button>
          <div className="hidden md:flex items-center gap-[20px] ml-auto">
            <button onClick={() => navigate('/faq')} className="p-[4px] hover:bg-[#f0f0f0] rounded-[4px] transition-colors">
              <Icon icon="carbon:help" width={24} height={24} style={{color: '#6e6e6e'}} />
            </button>
            <button onClick={() => navigate('/open-notification')} className="p-[4px] hover:bg-[#f0f0f0] rounded-[4px] transition-colors">
              <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#6e6e6e'}} />
            </button>
            <div className="w-[1px] h-[32px] bg-[#000000]/[0.09] rounded-full" />
            <div className="w-[56px] h-[32px] bg-[#b3d1ff] rounded-[16px] flex items-center justify-center">
              <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#ffffff'}} />
            </div>
          </div>
          <button className="md:hidden">
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Hero Section */}
          <div className="flex flex-col items-center px-[16px] md:px-[32px] py-[24px] md:py-[48px] gap-[16px] md:gap-[28px] bg-white">
            <div className="w-full max-w-[980px] flex flex-col gap-[16px] md:gap-[32px]">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-[4px]">
                <Icon icon="material-symbols:dashboard" width={63} height={17} style={{color: '#6e6e6e'}} />
                <Icon icon="material-symbols:chevron-right" width={10} height={17} style={{color: '#6e6e6e'}} />
                <div className="flex items-center justify-center gap-[10px]">
                  <span className="text-[12px] font-bold leading-[16.8px] text-[#005eb8] font-[Noto_Sans]">Help & Support</span>
                </div>
              </div>

              {/* Title and Search */}
              <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px]">
                <div className="flex-1 flex flex-col gap-[16px] md:gap-[24px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="flex-1 flex flex-col gap-[8px]">
                      <h1 className="text-[24px] md:text-[32px] font-bold leading-[28.8px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">Hi Chris, how can we help you today?</h1>
                      <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Search our knowledge base for answers to common questions</p>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex flex-col gap-[10px] rounded-[8px]">
                      <div className="flex items-center px-[16px] py-[12px] md:py-[16px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                        <div className="flex-1 flex items-center gap-[12px]">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ask anything..."
                            className="flex-1 text-[16px] leading-[24px] text-[#8d8d8d] font-[Noto_Sans] bg-transparent border-none outline-none"
                          />
                          <button onClick={handleSearch} className="p-[4px] hover:bg-[#f0f0f0] rounded-[4px] transition-colors">
                            <Icon icon="material-symbols:send" width={24} height={24} style={{color: '#6e6e6e'}} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="flex flex-col items-center px-[16px] md:px-[32px] py-[24px] md:py-[48px] gap-[16px] md:gap-[28px] bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
            <div className="w-full max-w-[980px] flex flex-col gap-[16px] md:gap-[32px]">
              <div className="w-full flex flex-col gap-[24px] md:gap-[48px]">
                {/* Topics Section */}
                <div className="flex flex-col gap-[16px] md:gap-[32px] max-w-[980px]">
                  <div className="flex flex-col gap-[16px] md:gap-[20px]">
                    <div className="flex items-center justify-between gap-[16px]">
                      <h2 className="text-[18px] md:text-[20px] font-bold leading-[21.6px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Topics</h2>
                    </div>
                    
                    {/* Topic Cards Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[20px]">
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px]">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6e6e6e'}} />
                          <div className="flex flex-col justify-center gap-[4px]">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Getting Started</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Quick steps to help you begin using the portal.</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px]">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6e6e6e'}} />
                          <div className="flex flex-col justify-center gap-[4px]">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Claim</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Guidance on submitting, tracking, and managing claims.</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px]">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6e6e6e'}} />
                          <div className="flex flex-col justify-center gap-[4px]">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Policy Management</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Information on viewing, updating, and maintaining your policies.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Topic Cards Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px]">
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px]">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6e6e6e'}} />
                          <div className="flex flex-col justify-center gap-[4px]">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Payments & Billing</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Understand premiums, payments, and billing</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px]">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6e6e6e'}} />
                          <div className="flex flex-col justify-center gap-[4px]">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Account & Settings</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Help with login, personal details, and security settings.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Getting Started Section */}
                <div className="flex flex-col gap-[16px] md:gap-[24px]">
                  <div className="flex items-center justify-between gap-[16px]">
                    <h2 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Getting Started</h2>
                  </div>
                  <div className="flex flex-col gap-[16px] md:gap-[24px]">
                    {/* FAQ 1 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('getting-started-1')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I access the UOI Customer Portal?</span>
                        <Icon icon={expandedFAQs['getting-started-1'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['getting-started-1'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">You can access the UOI Customer Portal at any time through your web browser on desktop or mobile. Visit the portal URL and log in using your Singpass app, or your NRIC/FIN number and password. No app download is required — the portal is fully accessible via your mobile browser.</p>
                      )}
                    </div>
                    
                    {/* FAQ 2 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('getting-started-2')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I create a new account?</span>
                        <Icon icon={expandedFAQs['getting-started-2'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['getting-started-2'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">You can register for a Customer Portal account in two ways:\nVia Singpass: Tap 'Log in with Singpass' and follow the on-screen instructions. Singpass will pre-fill your personal details automatically.\nVia NRIC/FIN: Tap 'Log in with NRIC/FIN', then select 'Create an Account' and enter your details manually.\n\nIf you experience any issues during registration, please contact us at help@uoi.com.sg.</p>
                      )}
                    </div>
                    
                    {/* FAQ 3 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('getting-started-3')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">What can I do on the UOI Customer Portal?</span>
                        <Icon icon={expandedFAQs['getting-started-3'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['getting-started-3'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">The Customer Portal lets you manage all your UOI insurance needs in one place, including:\nView all your active policies (Travel, Home, Motor, Helper, Personal Accident)\nSubmit and track insurance claims\nDownload policy documents and renewal notices\nUpdate your personal and contact information\nAccess your rewards and promotions\nMake premium payments and view payment history</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Claim Section */}
                <div className="flex flex-col gap-[16px] md:gap-[24px]">
                  <div className="flex items-center justify-between gap-[16px]">
                    <h2 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Claim</h2>
                  </div>
                  <div className="flex flex-col gap-[16px] md:gap-[24px]">
                    {/* FAQ 1 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('claim-1')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I submit a claim through the portal?</span>
                        <Icon icon={expandedFAQs['claim-1'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['claim-1'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">To submit a claim:\nLog in to the Customer Portal\nTap 'Claims' in the navigation menu\nTap 'Submit Claim' in the top right\nSelect the relevant policy and fill in the claim details\nUpload the required supporting documents\nReview and submit your claim\n\nYou will receive a reference number upon submission and updates will be shared with you via email and Customer Portal.</p>
                      )}
                    </div>
                    
                    {/* FAQ 2 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('claim-2')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">What documents do I need to submit a claim?</span>
                        <Icon icon={expandedFAQs['claim-2'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['claim-2'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Required documents vary by claim type. Common documents include:\nCompleted claim form\nOriginal receipts or invoices\nMedical reports (for health-related claims)\nPolice report (where applicable)\nPhotographs of damage or incident\nFlight itinerary or booking details (for travel claims)\n\nA full checklist will be shown to you during the claim submission process in the portal.</p>
                      )}
                    </div>
                    
                    {/* FAQ 3 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('claim-3')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How long does it take to process my claim?</span>
                        <Icon icon={expandedFAQs['claim-3'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['claim-3'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Most standard claims are processed within 7–14 business days upon receipt of all required documents. Complex claims or those requiring a loss adjuster may take longer. You can monitor your claim status in real time under the Claims section of the portal. For urgent situations, please call our 24-hour hotline at (+65) 6222 7737.</p>
                      )}
                    </div>
                    
                    {/* FAQ 4 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('claim-4')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Can I edit or withdraw a claim I've already submitted?</span>
                        <Icon icon={expandedFAQs['claim-4'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['claim-4'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">You can edit a claim that is still 'Under Review' by logging into the portal and selecting the claim from your Claims list. However, once a claim has been submitted, you cannot withdraw it entirely. Please contact our Claims team at claims@uoi.com.sg if you need to make significant changes or provide additional information.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Policy Management Section */}
                <div className="flex flex-col gap-[16px] md:gap-[24px]">
                  <div className="flex items-center justify-between gap-[16px]">
                    <h2 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Policy Management</h2>
                  </div>
                  <div className="flex flex-col gap-[16px] md:gap-[24px]">
                    {/* FAQ 1 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('policy-1')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I view my active policies?</span>
                        <Icon icon={expandedFAQs['policy-1'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['policy-1'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">All your active UOI policies are displayed on your Dashboard under 'Your Coverage'. Tap any policy card to view its full details, including coverage period, insured persons, policy number, and benefit limits. You can also access all policies by tapping 'Policies' in the navigation menu.</p>
                      )}
                    </div>
                    
                    {/* FAQ 2 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('policy-2')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">What does 'Not Covered' mean on a policy card?</span>
                        <Icon icon={expandedFAQs['policy-2'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['policy-2'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">'Not Covered' indicates that you do not currently have an active policy for that insurance category. You can purchase a new policy by tapping 'Shop Now' on the card or contacting our sales team. Existing customers often receive special discounts when adding new coverage types.</p>
                      )}
                    </div>
                    
                    {/* FAQ 3 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('policy-3')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">What does 'Not Covered' mean on a policy card?</span>
                        <Icon icon={expandedFAQs['policy-3'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['policy-3'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">To download your policy documents:\nGo to 'Policies' in the navigation\nSelect the relevant policy\nTap the 'Documents' tab\nTap the download icon next to the document you need\n\nAvailable documents include your policy schedule, renewal notices, and certificate of insurance.</p>
                      )}
                    </div>
                    
                    {/* FAQ 4 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('policy-4')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I renew my policy?</span>
                        <Icon icon={expandedFAQs['policy-4'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['policy-4'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Your policy is due for renewal and shows 'Renewal Due' status. You can renew online through the portal by tapping the 'Renew' button on the policy card. You will be able to review and update your coverage details and make payment immediately. Renewal reminders are sent 30 days before expiry.</p>
                      )}
                    </div>
                    
                    {/* FAQ 5 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('policy-5')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Can I make changes to an existing policy?</span>
                        <Icon icon={expandedFAQs['policy-5'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['policy-5'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Policy amendments can be made through the portal, such as updating contact details or adding covered items or persons. Major changes may require underwriting approval. Contact our Customer Service team at (+65) 6222 7733 for assistance with policy amendments.</p>
                      )}
                    </div>
                    
                    {/* FAQ 6 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('policy-6')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I view my payment history for a policy?</span>
                        <Icon icon={expandedFAQs['policy-6'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['policy-6'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Payment history is available under each policy's detail page. Navigate to 'Policies', select your policy, and tap the 'Payment History' tab. You will see a list of past transactions including payment dates, amounts, and payment methods.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment & Billing Section */}
                <div className="flex flex-col gap-[16px] md:gap-[24px]">
                  <div className="flex items-center justify-between gap-[16px]">
                    <h2 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Payment & Billing</h2>
                  </div>
                  <div className="flex flex-col gap-[16px] md:gap-[24px]">
                    {/* FAQ 1 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('payment-1')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Where can I view my upcoming premium payments?</span>
                        <Icon icon={expandedFAQs['payment-1'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['payment-1'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Your upcoming payment schedule is shown in each policy's 'Payment History' tab under Policies. If you are enrolled in GIRO, your premium will be automatically deducted on the due date. You will also receive an email reminder 14 days before your premium is due.</p>
                      )}
                    </div>
                    
                    {/* FAQ 2 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('payment-2')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">My payment failed. What should I do?</span>
                        <Icon icon={expandedFAQs['payment-2'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['payment-2'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">If your payment did not go through:\nCheck that your card details are up to date\nEnsure sufficient funds are available\nTry an alternative payment method\nIf the issue persists, contact your bank or contact us at contactus@uoi.com.sg\n\nPlease ensure your premium is paid before the due date to avoid a lapse in coverage.</p>
                      )}
                    </div>
                    
                    {/* FAQ 3 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('payment-3')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I set up or cancel GIRO payments?</span>
                        <Icon icon={expandedFAQs['payment-3'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['payment-3'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">To set up GIRO, please download and complete the GIRO form available in your policy documents section. Singapore GIRO arrangements typically take 1-2 months to process. To cancel existing GIRO arrangements, please contact us directly at contactus@uoi.com.sg or call (+65) 6222 7733.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account & Settings Section */}
                <div className="flex flex-col gap-[16px] md:gap-[24px]">
                  <div className="flex items-center justify-between gap-[16px]">
                    <h2 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Account & Settings</h2>
                  </div>
                  <div className="flex flex-col gap-[16px] md:gap-[24px]">
                    {/* FAQ 1 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('account-1')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I update my contact details?</span>
                        <Icon icon={expandedFAQs['account-1'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['account-1'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">To update your mobile number, email address, or mailing address:\nLog in to the portal\nTap your profile icon at the top right\nGo to 'Account Settings'\nUpdate your details and tap 'Save Changes'\n\nChanges will take effect immediately. If you need to update your NRIC or legal name, please contact us directly at contactus@uoi.com.sg with a copy of your identification document.</p>
                      )}
                    </div>
                    
                    {/* FAQ 2 */}
                    <div className="flex flex-col justify-center gap-[12px] w-full">
                      <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => toggleFAQ('account-2')}>
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">How do I close or deactivate my portal account?</span>
                        <Icon icon={expandedFAQs['account-2'] ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} width={24} height={24} style={{color: '#6e6e6e'}} />
                      </div>
                      {expandedFAQs['account-2'] && (
                        <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">To deactivate your Customer Portal account, please contact us at contactus@uoi.com.sg with your full name, NRIC, and request for account deactivation. Please note that account deactivation does not cancel any active insurance policies. Active policies will continue until their expiry date.</p>
                      )}
                    </div>
                    
                    {/* Contact Card */}
                    <div className="flex flex-col justify-center p-[16px] md:p-[24px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                      <div className="flex flex-col justify-center gap-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="w-[24px] h-[24px] bg-[#005eb8] rounded-[4px] flex items-center justify-center">
                            <Icon icon="material-symbols:chat" width={16} height={16} style={{color: '#ffffff'}} />
                          </div>
                          <h3 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">Still have questions?</h3>
                        </div>
                        <p className="text-[12px] leading-[16.8px] text-[#6e6e6e] font-[Noto_Sans]">Phone: (+65) 6222 7733\nEmail: contactus@uoi.com.sg\n24Hr Emergency: (+65) 6222 7737\nOffice hours: Mon–Thu 8.45am–5.45pm, Fri 8.45am–4.45pm. Closed on weekends and public holidays.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 flex items-center justify-between px-[16px] md:px-[24px] py-[16px] bg-[#005eb8]">
          <span className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-white font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
          <span className="hidden md:block text-[14px] leading-[21px] text-white text-right font-[Noto_Sans]">All Rights Reserved.</span>
        </footer>
      </div>
    </div>
  );
}