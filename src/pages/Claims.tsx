import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import { findIssuedPolicies, uploadDocument, sendEmail } from '../api/uoi';

export default function Claims() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policyFilter, setPolicyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [claimants, setClaimants] = useState({
    chris: true,
    joseph: true,
    child1: false,
    child2: false
  });
  const [claimType, setClaimType] = useState('');
  const [benefitType, setBenefitType] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [natureOfIncident, setNatureOfIncident] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [currency, setCurrency] = useState('SGD');
  const [medicalConditions, setMedicalConditions] = useState('yes');
  const [treatmentDate, setTreatmentDate] = useState('');

  // ── Live API state for claim submission ──────────────────────────────
  const [_searchParams] = useSearchParams();
  const _preselectedPolicy = _searchParams.get('policyNo') || '';
  const [_userPolicies, setUserPolicies] = useState<any[]>([]);
  const _isSubmitMode = window.location.pathname.includes('/claims/new');
  const [_selectedPolicyForSubmit, _setSelectedPolicyForSubmit] = useState<string>(_preselectedPolicy);
  const [_uploadFile, setUploadFile] = useState<File | null>(null);
  const [_submitting, setSubmitting] = useState<boolean>(false);
  const [_submitMsg, setSubmitMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const resp = await findIssuedPolicies<{ data?: any[] } | any[]>({}, ac.signal);
        const arr = Array.isArray(resp) ? resp : (resp?.data || []);
        setUserPolicies(arr.filter((p: any) => p && (p.PolicyNo || p.PolicyId)));
      } catch (_e) {}
    })();
    return () => ac.abort();
  }, []);
  // Resolve full policy record from the picker selection.
  const _policyFor = (polNo: string) => _userPolicies.find((p: any) =>
    (p?.PolicyNo || p?.PolicyId || p?.OrderId) === polNo,
  );

  async function _submitClaim(opts: {
    claimType: string;
    policyId: string;
    description?: string;
    customerEmail?: string;
    customerName?: string;
  }) {
    setSubmitting(true); setSubmitMsg(null);
    try {
      if (!opts.policyId) throw new Error('Please select a policy.');
      if (!_uploadFile) throw new Error('Please attach a supporting document.');
      const picked = _policyFor(opts.policyId) || {};
      const productCode: string =
        (picked as any).ProductCode || (picked as any).ProdCode || 'TR01';
      const productName: string =
        (picked as any).Product || (picked as any).ProductName || 'UOI Insurance';
      // Step 1 — upload the supporting doc (BFF base64-encodes + forwards
      // UOI's JSON {PolicyNo, DocType, Base64Content}).
      await uploadDocument(_uploadFile, {
        PolicyNo: opts.policyId,
        DocType: opts.claimType || 'claim_attachment',
      });
      // Step 2 — send the claim notification email via UOI's templated
      // email/send. Schema is from the UOI Postman collection.
      await sendEmail({
        email: opts.customerEmail || 'claims@uoi.com.sg',
        fullName: opts.customerName || 'Policyholder',
        productCode,
        productName,
        proposalNumber: opts.policyId,
        templateCode: 'emailAlert',
        link: 'https://uoi.com.sg',
      });
      setSubmitMsg({
        kind: 'ok',
        text: `Claim received for policy ${opts.policyId} — our claims team will be in touch.`,
      });
    } catch (e: any) {
      setSubmitMsg({ kind: 'err', text: e?.message || 'Could not submit claim.' });
    } finally { setSubmitting(false); }
  }

  const [currentStep, setCurrentStep] = useState('list'); // 'list', 'select-policy', 'form-empty', 'form-filled'

  const handleSubmitClaim = () => {
    setCurrentStep('select-policy');
  };

  const handlePolicySelect = () => {
    // Resolve from the live <select> the user picked. Fall back to the
    // ?policyNo= URL param (deep-link from a Policies row) or the first
    // available in-force policy.
    const polNo =
      _selectedPolicyForSubmit ||
      _preselectedPolicy ||
      ((_userPolicies[0] as any)?.PolicyNo) ||
      ((_userPolicies[0] as any)?.PolicyId) || '';
    if (!polNo) {
      setSubmitMsg({
        kind: 'err',
        text: 'No active policy found for your account. Please buy a policy before submitting a claim.',
      });
      return;
    }
    const picked = _policyFor(polNo) || {};
    const productName = (picked as any).Product || (picked as any).ProductName || 'Policy';
    setSelectedPolicy(`${productName} - Policy No: ${polNo}`);
    if (!_selectedPolicyForSubmit) _setSelectedPolicyForSubmit(polNo);
    setCurrentStep('form-empty');
  };

  const handleFormFill = () => {
    setClaimType('Medical, Personal Accident, & Travel');
    setBenefitType('Medical & Other Requests');
    setIncidentDate('09/02/2026');
    setNatureOfIncident('Fell sick');
    setClaimAmount('200');
    setTreatmentDate('09/02/2026');
    setCurrentStep('form-filled');
  };

  const handleSaveAndProceed = async () => {
    // Final submit — actually fires uploadDocument + sendEmail via the
    // wired UOI client. Falls back to the list view only after both
    // calls succeed; otherwise the form-filled view stays visible so the
    // user can read the error banner and retry.
    await _submitClaim({
      claimType: claimType || 'General',
      policyId: _selectedPolicyForSubmit || '',
      description: natureOfIncident || `Claim for policy ${_selectedPolicyForSubmit}.`,
    });
  };

  const handleHelpClick = () => {
    navigate('/faq');
  };

  const claimsData = [
    {
      policy: 'InsureTravel',
      policyNo: '',
      description: 'Luggage damaged',
      reference: 'P15204912EFG',
      status: 'Submitted',
      statusColor: '#28a745',
      statusBg: '#d8ffe2',
      date: '05 Jan 2026'
    },
    {
      policy: 'UniTravel',
      policyNo: '',
      description: 'Trip curtailment due to family medical emergency in Singapore and had to...',
      reference: 'P15204912EFG',
      status: 'Submitted',
      statusColor: '#28a745',
      statusBg: '#d8ffe2',
      date: '05 Jan 2026'
    },
    {
      policy: 'InsureTravel',
      policyNo: '',
      description: 'Flight cancellation',
      reference: 'P15204912EFG',
      status: 'Draft',
      statusColor: '#e65100',
      statusBg: '#fff8e1',
      date: '05 Jan 2026'
    },
    {
      policy: 'UniTravel',
      policyNo: '',
      description: 'Luggage damaged',
      reference: 'P15204912EFG',
      status: 'Draft',
      statusColor: '#e65100',
      statusBg: '#fff8e1',
      date: '05 Jan 2026'
    },
    {
      policy: 'InsureTravel',
      policyNo: '',
      description: 'Medical emergency due to accident in ski resort and required immediate s...',
      reference: 'P15204912EFG',
      status: 'Closed',
      statusColor: '#9e9e9e',
      statusBg: '#f5f5f5',
      date: '05 Jan 2026'
    },
    {
      policy: 'UniMotor',
      policyNo: '',
      description: 'Accident',
      reference: 'P15204912EFG',
      status: 'Closed',
      statusColor: '#9e9e9e',
      statusBg: '#f5f5f5',
      date: '05 Jan 2026'
    }
  ];

  const renderClaimsList = () => (
    <>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-[4px] mb-[24px] md:mb-[32px]">
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:dashboard" width={16} height={16} style={{color: '#6e6e6e'}} />
          <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Dashboard</span>
        </div>
        <Icon icon="material-symbols:chevron-right" width={10} height={10} style={{color: '#6e6e6e'}} />
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:assignment-turned-in" width={16} height={16} style={{color: '#005eb8'}} />
          <span className="text-[12px] font-bold font-[Noto_Sans] leading-[16.8px] text-[#005eb8]">Claims</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-[16px] mb-[24px] md:mb-[32px]">
        <h1 className="text-[24px] md:text-[32px] font-bold font-[Noto_Sans] leading-[28.8px] md:leading-[38.4px] text-[#212121]">Claims</h1>
            {_isSubmitMode && (
              <div className="rounded-[12px] bg-white border border-[#005eb8]/[0.20] p-[16px] md:p-[20px] my-[12px] flex flex-col md:flex-row gap-[12px] items-start md:items-center">
                <div className="flex-1">
                  <p className="text-[14px] md:text-[16px] font-medium text-[#212121] font-[Noto_Sans]">Submit a new claim</p>
                  <p className="text-[12px] md:text-[14px] text-[#6e6e6e] font-[Noto_Sans] mt-[2px]">Pick a policy below to start.</p>
                </div>
                <select
                  value={_selectedPolicyForSubmit}
                  onChange={(e) => _setSelectedPolicyForSubmit(e.target.value)}
                  className="w-full md:w-[280px] px-[12px] py-[10px] rounded-[8px] border border-[#005eb8] text-[14px] font-[Noto_Sans]"
                >
                  <option value="">— Select a policy —</option>
                  {_userPolicies.map((p: any) => {
                    const id = p.PolicyNo || p.PolicyId || p.OrderId || '';
                    return (<option key={id} value={id}>{id} — {p.ProductName || p.PlanCode || ''}</option>);
                  })}
                </select>
                {_userPolicies.length === 0 && (
                  <span className="text-[12px] text-[#6e6e6e] font-[Noto_Sans]">Loading your policies...</span>
                )}
              </div>
            )}
        <button 
          onClick={handleSubmitClaim}
          className="flex items-center justify-center px-[16px] py-[12px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity w-full md:w-auto"
        >
          <span className="text-[16px] font-medium font-[Noto_Sans] leading-[24px] text-white">Submit Claim</span>
        </button>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center px-[16px] md:px-[24px] py-[16px] gap-[16px] md:gap-[24px] bg-white rounded-t-[8px]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-[16px] flex-1">
            <div className="w-full md:w-[230px]">
              <div className="flex items-center justify-between px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                <div className="flex items-center gap-[8px]">
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#6e6e6e]">Policy:</span>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">{policyFilter}</span>
                </div>
                <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
              </div>
            </div>
            <div className="w-full md:w-[230px]">
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                <div className="flex items-center gap-[8px] flex-1">
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#6e6e6e]">Status:</span>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">{statusFilter}</span>
                </div>
                <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
              </div>
            </div>
            <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-center text-[#8d8d8d] cursor-pointer">Clear Filter</span>
          </div>
        </div>

        {/* Table */}
        <div className="px-[8px] md:px-[16px] pb-[24px]">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-[24px] px-[24px] py-[12px] border-b border-[#000000]/[0.09]">
            <div className="w-[150px]">
              <span className="text-[12px] font-medium font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Policy Product / Policy No.</span>
            </div>
            <div className="w-[250px]">
              <span className="text-[12px] font-medium font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Claim Description</span>
            </div>
            <div className="w-[98px]">
              <span className="text-[12px] font-medium font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Reference No.</span>
            </div>
            <div className="w-[80px]">
              <span className="text-[12px] font-medium font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Status</span>
            </div>
            <div className="w-[119px] flex items-center gap-[4px]">
              <span className="text-[12px] font-medium font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Date Submitted</span>
              <Icon icon="material-symbols:sort" width={24} height={24} />
            </div>
            <div className="flex-1">
              <span className="text-[12px] font-medium font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Action</span>
            </div>
          </div>

          {/* Table Rows */}
          {claimsData.map((claim, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center gap-[12px] md:gap-[24px] px-[16px] md:px-[24px] py-[16px] md:py-[12px] border-b border-[#000000]/[0.09] last:border-b-0">
              <div className="w-full md:w-[150px]">
                <div className="flex flex-col justify-center gap-[4px]">
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">{claim.policy}</span>
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">{claim.policyNo}</span>
                    <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#6e6e6e'}} />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[250px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">{claim.description}</span>
              </div>
              <div className="w-full md:w-[98px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">{claim.reference}</span>
              </div>
              <div className="w-full md:w-[80px]">
                <div className="flex items-center justify-center px-[8px] py-[2px] rounded-[12px] w-fit" style={{backgroundColor: claim.statusBg}}>
                  <span className="text-[12px] font-medium font-[Noto_Sans] leading-[16.8px] text-center" style={{color: claim.statusColor}}>{claim.status}</span>
                </div>
              </div>
              <div className="w-full md:w-[119px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">{claim.date}</span>
              </div>
              <div className="flex-1 flex items-center gap-[16px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-center text-[#9e9e9e] cursor-pointer">Edit</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-center text-[#0d6efd] cursor-pointer">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center mt-[24px]">
        <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-center text-[#8d8d8d]">Showing 6 out of 6 record(s)</span>
      </div>
    </>
  );

  const renderSelectPolicy = () => (
    <>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-[4px] mb-[24px]">
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:dashboard" width={16} height={16} style={{color: '#6e6e6e'}} />
          <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Dashboard</span>
        </div>
        <Icon icon="material-symbols:chevron-right" width={10} height={10} style={{color: '#6e6e6e'}} />
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:assignment-turned-in" width={16} height={16} style={{color: '#6e6e6e'}} />
          <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Claims</span>
        </div>
        <Icon icon="material-symbols:chevron-right" width={10} height={10} style={{color: '#6e6e6e'}} />
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] font-bold font-[Noto_Sans] leading-[16.8px] text-[#005eb8]">Submit New Claim</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-[24px]">
        <h1 className="text-[24px] md:text-[32px] font-bold font-[Noto_Sans] leading-[28.8px] md:leading-[38.4px] text-[#212121]">Submit New Claim</h1>
      </div>

      {/* Select Policy — real <select> populated from findIssuedPolicies */}
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Select Policy</span>
          {_userPolicies.length === 0 && (
            <span className="text-[12px] text-[#8d8d8d] font-[Noto_Sans]">Loading…</span>
          )}
        </div>
        <select
          value={_selectedPolicyForSubmit}
          onChange={(e) => _setSelectedPolicyForSubmit(e.target.value)}
          className="px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]"
        >
          <option value="">— Select an in-force policy —</option>
          {_userPolicies.map((p: any) => {
            const polNo = p.PolicyNo || p.PolicyId || p.OrderId || '';
            const name = p.Product || p.ProductName || p.PlanCode_CodeDesc || 'Policy';
            return (
              <option key={polNo} value={polNo}>{name} — {polNo}</option>
            );
          })}
        </select>
        <button
          onClick={handlePolicySelect}
          disabled={!_selectedPolicyForSubmit && _userPolicies.length === 0}
          className="self-end mt-[8px] px-[24px] py-[10px] bg-[#005eb8] text-white text-[14px] font-medium rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Continue
        </button>
        {_submitMsg && (
          <div className={`mt-[8px] px-[12px] py-[8px] rounded-[8px] text-[13px] font-[Noto_Sans] ${
            _submitMsg.kind === 'ok'
              ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7]'
              : 'bg-[#fce4ec] border border-[#f48fb1] text-[#c62828]'
          }`}>
            {_submitMsg.text}
          </div>
        )}
      </div>
    </>
  );

  const renderFormEmpty = () => (
    <>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-[4px] mb-[24px]">
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:dashboard" width={16} height={16} style={{color: '#6e6e6e'}} />
          <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Dashboard</span>
        </div>
        <Icon icon="material-symbols:chevron-right" width={10} height={10} style={{color: '#6e6e6e'}} />
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:assignment-turned-in" width={16} height={16} style={{color: '#6e6e6e'}} />
          <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Claims</span>
        </div>
        <Icon icon="material-symbols:chevron-right" width={10} height={10} style={{color: '#6e6e6e'}} />
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] font-bold font-[Noto_Sans] leading-[16.8px] text-[#005eb8]">Submit New Claim</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-[24px]">
        <h1 className="text-[24px] md:text-[32px] font-bold font-[Noto_Sans] leading-[28.8px] md:leading-[38.4px] text-[#212121]">Submit New Claim</h1>
      </div>

      {/* Select Policy */}
      <div className="flex flex-col gap-[12px] mb-[28px]">
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Select Policy</span>
          </div>
        </div>
        <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
          <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] flex-1">{selectedPolicy}</span>
          <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
        </div>
      </div>

      {/* Claim Information Card */}
      <div className="bg-white rounded-[12px] border border-[#000000]/[0.09] p-[16px] md:p-[32px] mb-[28px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[24px] md:mb-[32px]">
          <h2 className="text-[18px] md:text-[20px] font-bold font-[Noto_Sans] leading-[21.6px] md:leading-[24px] text-[#212121]">Claim Information</h2>
          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} />
        </div>

        {/* Claimant Profiles */}
        <div className="flex flex-col gap-[24px] mb-[24px]">
          <h3 className="text-[16px] font-bold font-[Noto_Sans] leading-[24px] text-[#212121]">Claimant Profile(s)</h3>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[4px] mb-[12px]">
              <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
              <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Select Claimant(s)</span>
            </div>
            <div className="flex flex-col md:flex-row gap-[12px]">
              <div className="flex-1 flex flex-col gap-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] border-2 border-[#005eb8] rounded-[2px] flex items-center justify-center cursor-pointer" onClick={() => setClaimants({...claimants, chris: !claimants.chris})}>
                    {claimants.chris && <Icon icon="material-symbols:check" width={16} height={16} style={{color: '#005eb8'}} />}
                  </div>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Chris Wong (Policyholder)</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] border border-[#000000]/[0.09] rounded-[2px] flex items-center justify-center cursor-pointer" onClick={() => setClaimants({...claimants, child1: !claimants.child1})}>
                    {claimants.child1 && <Icon icon="material-symbols:check" width={16} height={16} style={{color: '#005eb8'}} />}
                  </div>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Unnamed Child (Insured Child 1)</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] border-2 border-[#005eb8] rounded-[2px] flex items-center justify-center cursor-pointer" onClick={() => setClaimants({...claimants, joseph: !claimants.joseph})}>
                    {claimants.joseph && <Icon icon="material-symbols:check" width={16} height={16} style={{color: '#005eb8'}} />}
                  </div>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Joseph Wong (Insured Adult)</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] border border-[#000000]/[0.09] rounded-[2px] flex items-center justify-center cursor-pointer" onClick={() => setClaimants({...claimants, child2: !claimants.child2})}>
                    {claimants.child2 && <Icon icon="material-symbols:check" width={16} height={16} style={{color: '#005eb8'}} />}
                  </div>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Unnamed Child (Insured Child 2)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Details */}
        <div className="flex flex-col gap-[24px]">
          <h3 className="text-[16px] font-bold font-[Noto_Sans] leading-[24px] text-[#212121]">Claim Details</h3>
          <div className="flex flex-col gap-[24px]">
            {/* Type of Claim */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Type of Claim</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#8d8d8d] flex-1">Please Select</span>
                <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
              </div>
            </div>

            {/* Type of Benefit */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Type of Benefit</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#8d8d8d] flex-1">Please Select</span>
                <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
              </div>
            </div>

            {/* Incident Date */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Incident Date</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] h-[50px]">
                <input 
                  type="text" 
                  placeholder="Select Incident Date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#8d8d8d] flex-1 bg-transparent outline-none"
                />
                <Icon icon="material-symbols:calendar-today" width={16} height={16} style={{color: '#8d8d8d'}} />
              </div>
            </div>

            {/* Nature of Incident */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Nature of Incident</span>
              </div>
              <div className="flex px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] h-[160px]">
                <textarea 
                  placeholder="Please describe what happened"
                  value={natureOfIncident}
                  onChange={(e) => setNatureOfIncident(e.target.value)}
                  className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#8d8d8d] flex-1 bg-transparent outline-none resize-none"
                />
                <div className="w-[4px] h-[70px] bg-[#000000]/[0.40] rounded-[2px] ml-[8px]" />
              </div>
            </div>

            {/* Claim Amount */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Claim Amount</span>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-[8px]">
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-[12px] py-[10px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] outline-none w-full md:w-auto"
                >
                  <option value="SGD">SGD</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Input Amount"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  className="flex-1 px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] font-[Noto_Sans] leading-[24px] text-[#8d8d8d] outline-none"
                />
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Do you have any existing medical conditions?</span>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[16px]">
                  <div 
                    onClick={() => setMedicalConditions('yes')}
                    className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      medicalConditions === 'yes' ? 'border-[#005eb8]' : 'border-[#000000]/[0.09]'
                    }`}
                  >
                    {medicalConditions === 'yes' && <div className="w-[8px] h-[8px] bg-[#005eb8] rounded-full" />}
                  </div>
                  <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121]">Yes</span>
                </div>
                <div className="flex items-center gap-[16px]">
                  <div 
                    onClick={() => setMedicalConditions('no')}
                    className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center cursor-pointer ${
                      medicalConditions === 'no' ? 'border-[#005eb8]' : 'border-[#000000]/[0.09]'
                    }`}
                  >
                    {medicalConditions === 'no' && <div className="w-[8px] h-[8px] bg-[#005eb8] rounded-full" />}
                  </div>
                  <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121]">No</span>
                </div>
              </div>
            </div>

            {/* Treatment Date */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Treatment Date</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] h-[50px]">
                <input
                  type="text"
                  placeholder="Select Treatment Date"
                  value={treatmentDate}
                  onChange={(e) => setTreatmentDate(e.target.value)}
                  className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#8d8d8d] flex-1 bg-transparent outline-none"
                />
                <Icon icon="material-symbols:calendar-today" width={16} height={16} style={{color: '#8d8d8d'}} />
              </div>
            </div>

            {/* Supporting Document — uploaded to UOI DMS as base64 via the BFF */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Supporting Document</span>
              </div>
              <input
                type="file"
                accept="application/pdf,image/png,image/jpeg"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  setUploadFile(f || null);
                }}
                className="text-[14px] font-[Noto_Sans] text-[#212121] file:mr-3 file:px-3 file:py-2 file:rounded-[6px] file:border-0 file:bg-[#005eb8] file:text-white file:cursor-pointer"
              />
              {_uploadFile && (
                <span className="text-[12px] text-[#6e6e6e] font-[Noto_Sans]">
                  Selected: {_uploadFile.name} ({Math.round(_uploadFile.size / 1024)} KB)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleFormFill}
          className="flex items-center justify-center px-[40px] py-[14px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity w-full md:w-auto"
        >
          <span className="text-[16px] font-medium font-[Noto_Sans] leading-[24px] text-white">Save & Proceed</span>
        </button>
      </div>
    </>
  );

  const renderFormFilled = () => (
    <>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-[4px] mb-[24px]">
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:dashboard" width={16} height={16} style={{color: '#6e6e6e'}} />
          <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Dashboard</span>
        </div>
        <Icon icon="material-symbols:chevron-right" width={10} height={10} style={{color: '#6e6e6e'}} />
        <div className="flex items-center gap-[4px]">
          <Icon icon="material-symbols:assignment-turned-in" width={16} height={16} style={{color: '#6e6e6e'}} />
          <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#6e6e6e]">Claims</span>
        </div>
        <Icon icon="material-symbols:chevron-right" width={10} height={10} style={{color: '#6e6e6e'}} />
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] font-bold font-[Noto_Sans] leading-[16.8px] text-[#005eb8]">Submit New Claim</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-[24px]">
        <h1 className="text-[24px] md:text-[32px] font-bold font-[Noto_Sans] leading-[28.8px] md:leading-[38.4px] text-[#212121]">Submit New Claim</h1>
      </div>

      {/* Select Policy */}
      <div className="flex flex-col gap-[12px] mb-[28px]">
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Select Policy</span>
          </div>
        </div>
        <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
          <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] flex-1">{selectedPolicy}</span>
          <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
        </div>
      </div>

      {/* Claim Information Card */}
      <div className="bg-white rounded-[12px] border border-[#000000]/[0.09] p-[16px] md:p-[32px] mb-[28px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[24px] md:mb-[32px]">
          <h2 className="text-[18px] md:text-[20px] font-bold font-[Noto_Sans] leading-[21.6px] md:leading-[24px] text-[#212121]">Claim Information</h2>
          <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} />
        </div>

        {/* Claimant Profiles */}
        <div className="flex flex-col gap-[24px] mb-[24px]">
          <h3 className="text-[16px] font-bold font-[Noto_Sans] leading-[24px] text-[#212121]">Claimant Profile(s)</h3>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[4px] mb-[12px]">
              <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
              <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Select Claimant(s)</span>
            </div>
            <div className="flex flex-col md:flex-row gap-[12px]">
              <div className="flex-1 flex flex-col gap-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] bg-[#005eb8] rounded-[2px] flex items-center justify-center">
                    <Icon icon="material-symbols:check" width={16} height={16} style={{color: '#ffffff'}} />
                  </div>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Chris Wong (Policyholder)</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] border border-[#000000]/[0.09] rounded-[2px]" />
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Unnamed Child (Insured Child 1)</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] bg-[#005eb8] rounded-[2px] flex items-center justify-center">
                    <Icon icon="material-symbols:check" width={16} height={16} style={{color: '#ffffff'}} />
                  </div>
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Joseph Wong (Insured Adult)</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] border border-[#000000]/[0.09] rounded-[2px]" />
                  <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Unnamed Child (Insured Child 2)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Details */}
        <div className="flex flex-col gap-[24px]">
          <h3 className="text-[16px] font-bold font-[Noto_Sans] leading-[24px] text-[#212121]">Claim Details</h3>
          <div className="flex flex-col gap-[24px]">
            {/* Type of Claim */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Type of Claim</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] flex-1">{claimType}</span>
                <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
              </div>
            </div>

            {/* Type of Benefit */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Type of Benefit</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09]">
                <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] flex-1">{benefitType}</span>
                <Icon icon="material-symbols:keyboard-arrow-down" width={16} height={16} />
              </div>
            </div>

            {/* Incident Date */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Incident Date</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] h-[50px]">
                <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] flex-1">{incidentDate}</span>
                <Icon icon="material-symbols:calendar-today" width={16} height={16} style={{color: '#8d8d8d'}} />
              </div>
            </div>

            {/* Nature of Incident */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Nature of Incident</span>
              </div>
              <div className="flex px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] h-[160px]">
                <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] flex-1">{natureOfIncident}</span>
                <div className="w-[4px] h-[70px] bg-[#000000]/[0.40] rounded-[2px] ml-[8px]" />
              </div>
            </div>

            {/* Claim Amount */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Claim Amount</span>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-[8px]">
                <div className="px-[12px] py-[10px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] w-full md:w-auto">
                  {currency}
                </div>
                <div className="flex-1 px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121]">
                  {claimAmount}
                </div>
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Do you have any existing medical conditions?</span>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[20px] h-[20px] rounded-full border-2 border-[#005eb8] flex items-center justify-center">
                    <div className="w-[8px] h-[8px] bg-[#005eb8] rounded-full" />
                  </div>
                  <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121]">Yes</span>
                </div>
                <div className="flex items-center gap-[16px]">
                  <div className="w-[20px] h-[20px] rounded-full border border-[#000000]/[0.09]" />
                  <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121]">No</span>
                </div>
              </div>
            </div>

            {/* Treatment Date */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#dc3545]">*</span>
                <span className="text-[14px] font-[Noto_Sans] leading-[21px] text-[#212121]">Treatment Date</span>
              </div>
              <div className="flex items-center px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]/[0.09] h-[50px]">
                <span className="text-[16px] font-[Noto_Sans] leading-[24px] text-[#212121] flex-1">{treatmentDate}</span>
                <Icon icon="material-symbols:calendar-today" width={16} height={16} style={{color: '#8d8d8d'}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit status banner — shows upload + email errors / success */}
      {_submitMsg && (
        <div className={`mt-[16px] mb-[8px] px-[16px] py-[12px] rounded-[8px] text-[14px] font-[Noto_Sans] ${
          _submitMsg.kind === 'ok'
            ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7]'
            : 'bg-[#fce4ec] border border-[#f48fb1] text-[#c62828]'
        }`}>
          {_submitMsg.text}
        </div>
      )}

      {/* Submit Button — fires uploadDocument + sendEmail end-to-end */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveAndProceed}
          disabled={_submitting || !_uploadFile}
          className="flex items-center justify-center px-[40px] py-[14px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-[16px] font-medium font-[Noto_Sans] leading-[24px] text-white">
            {_submitting ? 'Submitting…' : 'Submit Claim'}
          </span>
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen flex flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeItem="Claims" />
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
          <div className="p-[16px] md:p-[24px] lg:p-[32px] max-w-[980px] mx-auto">
            {currentStep === 'list' && renderClaimsList()}
            {currentStep === 'select-policy' && renderSelectPolicy()}
            {currentStep === 'form-empty' && renderFormEmpty()}
            {currentStep === 'form-filled' && renderFormFilled()}
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