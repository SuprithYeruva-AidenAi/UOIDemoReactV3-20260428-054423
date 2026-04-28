import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'material-symbols:home' },
    { path: '/policies', label: 'Policies', icon: 'material-symbols:policy' },
    { path: '/claims', label: 'Claims', icon: 'material-symbols:description' },
    { path: '/rewards', label: 'Rewards', icon: 'material-symbols:star' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleHelpClick = () => {
    navigate('/faq');
  };

  return (
    <aside className={`h-full shrink-0 flex flex-col bg-white border-r border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-y-auto ${sidebarOpen ? 'w-[240px]' : 'w-[72px]'}`}>
      {/* Header */}
      <div className="flex flex-col gap-[24px] p-[24px_16px]">
        <div className="flex flex-col gap-[10px] w-full">
          <img 
            src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" 
            className="w-[100px] h-[51px]" 
            alt="Logo" 
          />
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col gap-[12px] w-full">
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer transition-colors ${
                isActive(item.path)
                  ? 'bg-white bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10]'
                  : 'hover:bg-[#f9fafb]'
              }`}
            >
              <Icon 
                icon={item.icon} 
                width={24} 
                height={24} 
                style={{color: isActive(item.path) ? '#005eb8' : '#6b7280'}} 
              />
              {sidebarOpen && (
                <span className={`text-[16px] font-medium leading-[24px] font-[Noto_Sans] ${
                  isActive(item.path) ? 'text-[#005eb8]' : 'text-[#212121]'
                }`}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Collapse Button */}
      <div className="flex justify-end items-center gap-[12px] px-[12px] py-[12px] mt-auto">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-[8px] rounded-[8px] hover:bg-[#f0f0f0] transition-colors"
        >
          <Icon 
            icon="octicon:sidebar-collapse-24" 
            width={24} 
            height={24} 
            style={{color: '#6b7280'}} 
          />
        </button>
      </div>
    </aside>
  );
}