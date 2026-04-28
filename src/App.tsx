import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginWithNricFin from './pages/LoginWithNricFin';
import CreateAccountWithNric11 from './pages/CreateAccountWithNric11';
import Singpass from './pages/Singpass';
import Dashboard from './pages/Dashboard';
import OpenNotification from './pages/OpenNotification';
import Policies from './pages/Policies';
import PolicyDetails from './pages/PolicyDetails';
import Claims from './pages/Claims';
import Rewards from './pages/Rewards';
import FAQ from './pages/FAQ';
import FAQExpanded from './pages/FAQExpanded';
import SingpassDataForFormFilling from './pages/SingpassDataForFormFilling';
import SingpassLogin from './pages/SingpassLogin'
import DashboardNew from './pages/DashboardNew'
import LandingPageNew from './pages/LandingPageNew';

function App() {
  return (
    <div className="font-[Noto_Sans]">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginWithNricFin />} />
          <Route path="/login-with-nric-fin" element={<LoginWithNricFin />} />
          <Route path="/create-account" element={<CreateAccountWithNric11 />} />
          <Route path="/singpass" element={<Singpass />} />
          <Route path="/singpass-login" element={<Singpass />} />
          <Route path="/singpass-data-for-form-filling" element={<Singpass initialStep="consent" />} />
          <Route path="/singpass-consent" element={<Singpass initialStep="consent" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/open-notification" element={<OpenNotification />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/:policyNo" element={<PolicyDetails />} />
          <Route path="/policy-details" element={<PolicyDetails />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/claims/new" element={<Claims />} />
          <Route path="/claims/:claimId" element={<Claims />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/faqexpanded" element={<FAQExpanded />} />
          <Route path="/dashboard-new" element={<Dashboard />} />
          <Route path="/settings" element={<div className="min-h-screen flex items-center justify-center"><p className="text-[20px] text-[#6e6e6e]">Settings coming soon</p></div>} />
          <Route path="/reset-password" element={<div className="min-h-screen flex items-center justify-center"><p className="text-[20px] text-[#6e6e6e]">Reset Password coming soon</p></div>} />
          <Route path="/proposals/new" element={<div className="min-h-screen flex items-center justify-center"><p className="text-[20px] text-[#6e6e6e]">Buy Policy coming soon</p></div>} />
                <Route path="/landing-page-new" element={<LandingPageNew />} />
        <Route path="/singpass-data-for-form-filling" element={<SingpassDataForFormFilling />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
