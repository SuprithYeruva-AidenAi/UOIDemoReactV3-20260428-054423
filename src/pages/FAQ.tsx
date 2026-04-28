import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';

export default function FAQ() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFAQ = (id: string) => {
    setExpandedFAQs(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqSections = [
    {
      title: 'Getting Started',
      items: [
        {
          id: 'access-portal',
          question: 'How do I access the UOI Customer Portal?',
          answer: 'You can access the UOI Customer Portal at any time through your web browser on desktop or mobile. Visit the portal URL and log in using your Singpass app, or your NRIC/FIN number and password. No app download is required — the portal is fully accessible via your mobile browser.'
        },
        {
          id: 'create-account',
          question: 'How do I create a new account?',
          answer: 'You can register for a Customer Portal account in two ways:\nVia Singpass: Tap \'Log in with Singpass\' and follow the on-screen instructions. Singpass will pre-fill your personal details automatically.\nVia NRIC/FIN: Tap \'Log in with NRIC/FIN\', then select \'Create an Account\' and enter your details manually.\n\nIf you experience any issues during registration, please contact us at help@uoi.com.sg.'
        },
        {
          id: 'portal-features',
          question: 'What can I do on the UOI Customer Portal?',
          answer: 'The Customer Portal lets you manage all your UOI insurance needs in one place, including:\nView all your active policies (Travel, Home, Motor, Helper, Personal Accident)\nSubmit and track insurance claims\nDownload policy documents and renewal notices\nUpdate your personal and contact information\nAccess your rewards and promotions\nMake premium payments and view payment history'
        }
      ]
    },
    {
      title: 'Claim',
      items: [
        {
          id: 'submit-claim',
          question: 'How do I submit a claim through the portal?',
          answer: 'To submit a claim:\nLog in to the Customer Portal\nTap \'Claims\' in the navigation menu\nTap \'Submit Claim\' in the top right\nSelect the relevant policy and fill in the claim details\nUpload the required supporting documents\nReview and submit your claim\n\nYou will receive a reference number upon submission and updates will be shared with you via email and Customer Portal.'
        },
        {
          id: 'claim-documents',
          question: 'What documents do I need to submit a claim?',
          answer: 'Required documents vary by claim type. Common documents include:\nCompleted claim form\nOriginal receipts or invoices\nMedical reports (for health-related claims)\nPolice report (where applicable)\nPhotographs of damage or incident\nAny other relevant supporting documents'
        },
        {
          id: 'claim-processing-time',
          question: 'How long does it take to process my claim?',
          answer: 'Most standard claims are processed within 7–14 business days upon receipt of all required documents. Complex claims or those requiring a loss adjuster may take longer. You can monitor your claim status in real time under the Claims section of the portal. For urgent situations, please call our 24-hour hotline at (+65) 6222 7737.'
        },
        {
          id: 'edit-claim',
          question: 'Can I edit or withdraw a claim I\'ve already submitted?',
          answer: 'You can edit a claim that\'s still under review by logging into the portal and selecting the claim from your Claims list. If you need to withdraw a claim that\'s been submitted, please contact our Claims team at claims@uoi.com.sg with your claim reference number.'
        }
      ]
    },
    {
      title: 'Policy Management',
      items: [
        {
          id: 'view-policies',
          question: 'How do I view my active policies?',
          answer: 'All your active UOI policies are displayed on your Dashboard under \'Your Coverage\'. Tap any policy card to view its full details, including coverage period, insured persons, policy number, and benefit limits. You can also access all policies by tapping \'Policies\' in the navigation menu.'
        },
        {
          id: 'not-covered-meaning',
          question: 'What does \'Not Covered\' mean on a policy card?',
          answer: '\'Not Covered\' indicates that the policy has expired, been cancelled, or is currently lapsed due to non-payment. You will not be able to make claims under policies showing this status. Contact us to discuss renewal or reactivation options.'
        },
        {
          id: 'not-covered-duplicate',
          question: 'What does \'Not Covered\' mean on a policy card?',
          answer: 'To download your policy documents:\nGo to \'Policies\' in the navigation\nSelect the relevant policy\nTap the \'Documents\' tab\nTap the download icon next to the document you need\n\nAvailable documents include your policy schedule, renewal notices, and certificate of insurance.'
        },
        {
          id: 'renew-policy',
          question: 'How do I renew my policy?',
          answer: 'Your policy will automatically renew if you have GIRO set up and sufficient funds are available. If you need to manually renew or update your policy, you can do so through the portal or contact our customer service team.'
        },
        {
          id: 'policy-changes',
          question: 'Can I make changes to an existing policy?',
          answer: 'Some policy changes can be made through the portal, while others require assistance from our team. Log in to your account and check the policy details page for available options, or contact us for guidance.'
        },
        {
          id: 'payment-history',
          question: 'How do I view my payment history for a policy?',
          answer: 'Payment history is available under each policy\'s detail page. Navigate to \'Policies\', select your policy, and tap the \'Payment History\' tab. You will see a list of past transactions including payment dates, amounts, and payment methods.'
        }
      ]
    },
    {
      title: 'Payment & Billing',
      items: [
        {
          id: 'upcoming-payments',
          question: 'Where can I view my upcoming premium payments?',
          answer: 'Your upcoming payment schedule is shown in each policy\'s \'Payment History\' tab under Policies. If you are enrolled in GIRO, your premium will be automatically deducted on the due date. You will also receive an email reminder 14 days before your premium is due.'
        },
        {
          id: 'payment-failed',
          question: 'My payment failed. What should I do?',
          answer: 'If your payment did not go through:\nCheck that your card details are up to date\nEnsure sufficient funds are available\nTry an alternative payment method\nIf the issue persists, contact your bank or contact us at contactus@uoi.com.sg\n\nPlease ensure your premium is paid before the due date to avoid a lapse in coverage.'
        },
        {
          id: 'giro-setup',
          question: 'How do I set up or cancel GIRO payments?',
          answer: 'To set up GIRO payments, download the GIRO form from your policy page, complete it, and submit it to your bank. Processing typically takes 1-2 months. To cancel GIRO, contact us at contactus@uoi.com.sg or call (+65) 6222 7733.'
        }
      ]
    },
    {
      title: 'Account & Settings',
      items: [
        {
          id: 'update-contact',
          question: 'How do I update my contact details?',
          answer: 'To update your mobile number, email address, or mailing address:\nLog in to the portal\nTap your profile icon at the top right\nGo to \'Account Settings\'\nUpdate your details and tap \'Save Changes\'\n\nChanges will take effect immediately. If you need to update your NRIC or legal name, please contact us directly at contactus@uoi.com.sg with a copy of your identification document.'
        },
        {
          id: 'close-account',
          question: 'How do I close or deactivate my portal account?',
          answer: 'To deactivate your Customer Portal account, please contact us at contactus@uoi.com.sg with your full name, NRIC, and request for account deactivation. Please note that account deactivation does not cancel any active insurance policies. Active policies will continue until their expiry date.'
        }
      ]
    }
  ];

  return (
    <div className="font-[Noto_Sans] h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeItem="Help" />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between gap-[20px] py-[12px] px-[16px] md:px-[24px] h-[56px] bg-white border-b border-[#000000]/[0.09]">
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icon icon="material-symbols:menu" width={24} height={24} style={{color: '#212121'}} />
          </button>
          <div className="hidden md:flex items-center gap-[20px] ml-auto">
            <Icon icon="carbon:help" width={24} height={24} style={{color: '#6b7280'}} />
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#6b7280'}} />
            <div className="w-[1px] h-[32px] bg-[#000000]/[0.09] rounded-full" />
            <Icon icon="material-symbols:person" width={56} height={32} style={{color: '#b3d1ff'}} />
          </div>
          <button className="md:hidden">
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
          </button>
        </header>

        {/* Hero Section */}
        <div className="shrink-0 flex flex-col items-center py-[24px] md:py-[48px] px-[16px] md:px-[32px] gap-[16px] md:gap-[28px] bg-white">
          <div className="flex flex-col gap-[16px] md:gap-[32px] w-full max-w-[980px]">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-[4px]">
              <Icon icon="material-symbols:dashboard" width={63} height={17} style={{color: '#6b7280'}} />
              <Icon icon="material-symbols:chevron-right" width={10} height={17} style={{color: '#6b7280'}} />
              <div className="flex items-center justify-center gap-[10px]">
                <span className="text-[12px] font-bold leading-[16.8px] text-[#005eb8] font-[Noto_Sans]">Help & Support</span>
              </div>
            </div>

            {/* Title and Search */}
            <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px] w-full">
              <div className="flex-1 flex flex-col gap-[16px] md:gap-[24px]">
                <div className="flex items-center gap-[8px] w-full">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <h1 className="text-[24px] md:text-[32px] font-bold leading-[28.8px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">Hi Chris, how can we help you today?</h1>
                    <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Search our knowledge base for answers to common questions</p>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="flex flex-col gap-[4px] w-full">
                  <div className="flex flex-col gap-[10px] w-full rounded-[8px]">
                    <div className="flex items-center px-[16px] w-full h-[48px] md:h-[56px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[12px] flex-1">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Ask anything..."
                          className="flex-1 text-[16px] leading-[24px] text-[#8d8d8d] font-[Noto_Sans] bg-transparent border-none outline-none"
                        />
                        <Icon icon="material-symbols:send" width={24} height={24} style={{color: '#6b7280'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <main className="flex-1 overflow-y-auto bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
          <div className="flex flex-col items-center py-[24px] md:py-[48px] px-[16px] md:px-[32px] gap-[16px] md:gap-[28px]">
            <div className="flex flex-col gap-[16px] md:gap-[32px] w-full max-w-[980px]">
              <div className="flex flex-col gap-[24px] md:gap-[48px] w-full">
                {/* Topics Section */}
                <div className="flex flex-col gap-[16px] md:gap-[32px] w-full max-w-[980px]">
                  <div className="flex flex-col gap-[16px] md:gap-[20px] w-full">
                    <div className="flex items-center justify-between gap-[16px] w-full">
                      <h2 className="text-[18px] md:text-[20px] font-bold leading-[21.6px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Topics</h2>
                    </div>
                    
                    {/* Topic Cards Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[20px] w-full">
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px] w-full">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6b7280'}} />
                          <div className="flex flex-col justify-center gap-[4px] w-full">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Getting Started</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Quick steps to help you begin using the portal.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px] w-full">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6b7280'}} />
                          <div className="flex flex-col justify-center gap-[4px] w-full">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Claim</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Guidance on submitting, tracking, and managing claims.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px] w-full">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6b7280'}} />
                          <div className="flex flex-col justify-center gap-[4px] w-full">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Policy Management</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Information on viewing, updating, and maintaining your policies.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Topic Cards Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] w-full">
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px] w-full">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6b7280'}} />
                          <div className="flex flex-col justify-center gap-[4px] w-full">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Payments & Billing</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Understand premiums, payments, and billing</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col p-[16px] gap-[16px] md:gap-[24px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px] w-full">
                          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6b7280'}} />
                          <div className="flex flex-col justify-center gap-[4px] w-full">
                            <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Account & Settings</h3>
                            <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Help with login, personal details, and security settings.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Sections */}
                {faqSections.map((section) => (
                  <div key={section.title} className="flex flex-col gap-[16px] md:gap-[24px] w-full">
                    <div className="flex items-center justify-between gap-[16px] w-full">
                      <h2 className="text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[27px] text-[#212121] font-[Noto_Sans]">{section.title}</h2>
                    </div>
                    
                    <div className="flex flex-col gap-[16px] md:gap-[24px] w-full">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex flex-col justify-center gap-[12px] w-full">
                          <button
                            onClick={() => toggleFAQ(item.id)}
                            className="flex items-center gap-[12px] w-full text-left"
                          >
                            <span className="flex-1 text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">{item.question}</span>
                            <Icon 
                              icon={expandedFAQs.includes(item.id) ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"} 
                              width={24} 
                              height={24} 
                              style={{color: '#6b7280'}} 
                            />
                          </button>
                          
                          {expandedFAQs.includes(item.id) && (
                            <div className="mt-[12px]">
                              <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans] whitespace-pre-line">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Contact Section */}
                <div className="flex flex-col justify-center p-[16px] md:p-[24px] gap-[16px] md:gap-[24px] w-full bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-col justify-center gap-[12px] w-full">
                    <div className="flex items-center gap-[12px] w-full">
                      <div className="w-[24px] h-[24px] bg-[#005eb8] rounded-[4px] flex items-center justify-center">
                        <Icon icon="material-symbols:chat" width={16} height={16} style={{color: '#ffffff'}} />
                      </div>
                      <h3 className="text-[18px] md:text-[20px] font-bold leading-[21.6px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Still have questions?</h3>
                    </div>
                    <p className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans] whitespace-pre-line">
                      Phone: (+65) 6222 7733  |  Email: contactus@uoi.com.sg  |  24Hr Emergency: (+65) 6222 7737{"\n"}Office hours: Mon–Thu 8.45am–5.45pm, Fri 8.45am–4.45pm. Closed on weekends and public holidays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 flex items-center justify-between py-[16px] px-[16px] md:px-[24px] gap-[16px] md:gap-[447px] w-full h-[53px] bg-[#005eb8]">
          <span className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-white font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
          <span className="hidden md:block text-[14px] leading-[21px] text-white font-[Noto_Sans] text-right">All Rights Reserved.</span>
        </footer>
      </div>
    </div>
  );
}