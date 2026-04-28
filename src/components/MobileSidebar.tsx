import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'material-symbols:home' },
    { path: '/policies', label: 'Policies', icon: 'material-symbols:policy' },
    { path: '/claims', label: 'Claims', icon: 'material-symbols:description' },
    { path: '/rewards', label: 'Rewards', icon: 'material-symbols:star' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#000000]/50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="absolute left-0 top-0 w-[260px] h-full bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[#000000]/[0.09]">
          <div className="flex items-center gap-[12px]">
            <button onClick={onClose}>
              <Icon icon="material-symbols:close" width={24} height={24} style={{color: '#212121'}} />
            </button>
            <img 
              src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" 
              className="w-[59px] h-[30px]" 
              alt="Logo" 
            />
          </div>
          <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col p-[16px_12px_24px_12px] gap-[24px]">
          <div className="flex flex-col gap-[16px]">
            {navItems.map((item) => (
              <div
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-[16px] px-[16px] py-[10px] rounded-[8px] cursor-pointer transition-colors ${
                  isActive(item.path)
                    ? 'bg-gradient-to-b from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10]'
                    : 'bg-white hover:bg-[#f9fafb]'
                }`}
              >
                <Icon 
                  icon={item.icon} 
                  width={28} 
                  height={28} 
                  style={{color: isActive(item.path) ? '#005eb8' : '#212121'}} 
                />
                <span className={`text-[16px] font-medium leading-[24px] font-[Noto_Sans] ${
                  isActive(item.path) ? 'text-[#005eb8]' : 'text-[#212121]'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Profile Section */}
          <div className="flex flex-col gap-[24px] px-[16px]">
            <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] cursor-pointer">Manage Account</span>
            <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] cursor-pointer">Help & Support</span>
            <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans] cursor-pointer">Privacy Policy</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-[12px] px-[16px] py-[8px] border-t border-[#000000]/[0.09]">
          <div className="flex items-center gap-[12px] flex-1">
            <div className="flex items-center justify-center w-[32px] h-[32px] bg-[#b3d1ff] rounded-[16px]">
              <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">CW</span>
            </div>
            <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Chris Wong</span>
          </div>
          <Icon icon="material-symbols:logout" width={24} height={24} style={{color: '#212121'}} />
        </div>
      </div>
    </div>
  );
}