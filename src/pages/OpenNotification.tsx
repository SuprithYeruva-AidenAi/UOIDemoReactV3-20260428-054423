import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';

export default function OpenNotification() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__",
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__",
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__"
  ];

  const rewardCards = [
    {
      image: "https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__",
      logo: "https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__",
      title: "10% off KITH by Casa Products",
      description: "Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy the offer."
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__",
      logo: "https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__",
      title: "10% off Cat & the Fiddle Cakes",
      description: "Enter promo code UOICATFIDDLE10 at checkout on www.catandthefiddle.com to enjoy the offer."
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__",
      logo: "https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__",
      title: "$5 Credit Reward for HEYMAAX NOW User Sign Up",
      description: "Enter promo code UOIHEYMAAX during registration to enjoy $5 credit."
    }
  ];

  const notifications = [
    {
      title: "Policy Cancellation Successful",
      message: "UniHome - PNF320104124A23 policy has been cancelled. S$XX.XX will be refunded to your ****9111 ending 4123 within 14 working days.",
      date: "14 Feb 2026",
      category: "Policy",
      unread: true
    },
    {
      title: "Scheduled Maintenance",
      message: "Corporate insurance will be unavailable due to scheduled maintenance on 14 March, 9pm to 6pm.",
      date: "03 Feb 2026",
      category: "System",
      unread: false
    },
    {
      title: "Password Expiring",
      message: "Your password will expire in 7 days. Update now to avoid any issues.",
      date: "03 Jan 2026",
      category: "System",
      unread: false
    },
    {
      title: "Update of Privacy Policy",
      message: "Our Privacy Policy has been updated.",
      date: "03 Jan 2026",
      category: "System",
      unread: false
    },
    {
      title: "Scheduled Maintenance",
      message: "Corporate insurance will be unavailable due to scheduled maintenance on 14 March, 9pm to 6pm.",
      date: "03 Jan 2026",
      category: "System",
      unread: false
    }
  ];

  const handleCloseNotifications = () => {
    navigate('/dashboard');
  };

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read
  };

  const handleHelpClick = () => {
    navigate('/faq');
  };

  return (
    <div className="h-screen flex flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeItem="Dashboard" />
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
              <Icon icon="carbon:help" width={24} height={24} style={{color: '#6e6e6e'}} />
            </button>
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#6e6e6e'}} />
            <div className="w-[1px] h-[32px] bg-[#000000]/[0.09] rounded-full" />
            <div className="w-[56px] h-[32px] bg-[#b3d1ff] rounded-[16px] flex items-center justify-center">
              <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#005eb8'}} />
            </div>
          </div>

          {/* Mobile Notification Icon */}
          <button className="md:hidden">
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07] relative">
          <div className="flex flex-col items-center py-[24px] md:py-[48px] px-[16px] md:px-[32px] pb-[100px] gap-[24px] md:gap-[28px] w-full">
            <div className="flex flex-col gap-[24px] md:gap-[32px] w-full max-w-[980px]">
              {/* Greeting Section */}
              <div className="flex flex-col gap-[24px] w-full">
                <div className="flex flex-col justify-center gap-[12px] w-full text-center md:text-left">
                  <h1 className="text-[24px] md:text-[32px] font-bold leading-[28.8px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">Good evening, Chris 👋</h1>
                  <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">Here's an overview of your insurance policies and recent activities</p>
                </div>
                
                {/* Banner Slider */}
                <div className="relative w-full h-[200px] md:h-[270px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                  <img src={slides[currentSlide]} className="w-full h-full object-cover transition-opacity duration-500" alt="Banner" />
                  <div className="absolute bottom-[8px] md:bottom-[12px] left-1/2 transform -translate-x-1/2 flex gap-[4px]">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-[6px] md:w-[8px] h-[6px] md:h-[8px] rounded-full cursor-pointer transition-colors ${
                          index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-[16px] md:gap-[20px] w-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] md:gap-[20px] w-full">
                  <div className="flex flex-col md:flex-row justify-center items-center py-[12px] md:py-[16px] px-[12px] md:px-[16px] gap-[12px] md:gap-[24px] flex-1 bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                    <div className="flex items-center gap-[8px] md:gap-[12px] w-full">
                      <Icon icon="material-symbols:keyboard-arrow-up" width={24} height={24} style={{color: '#6e6e6e'}} />
                      <div className="flex flex-col justify-center gap-[4px] flex-1 text-center md:text-left">
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Submit Claim</span>
                        <span className="hidden md:block text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Prepare documents for claims</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col justify-center py-[16px] px-[16px] gap-[24px] flex-1 bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                    <div className="flex items-center gap-[12px] w-full">
                      <div className="flex items-center justify-center w-[24px] h-[24px] bg-white bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[75px] p-[3px_4px] gap-[5px]" />
                      <div className="flex flex-col justify-center gap-[4px] flex-1">
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Buy Policy</span>
                        <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Explore a wide range of policies</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col justify-center py-[16px] px-[16px] gap-[24px] flex-1 bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                    <div className="flex items-center gap-[12px] w-full">
                      <div className="flex items-center justify-center w-[24px] h-[24px] bg-white bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[75px] p-[3px_4px] gap-[5px]" />
                      <div className="flex flex-col justify-center gap-[4px] flex-1">
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Help & Support</span>
                        <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Learn more about our FAQs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Coverage */}
              <div className="flex flex-col gap-[16px] md:gap-[20px] w-full">
                <div className="flex items-center gap-[16px] md:gap-[28px] w-full">
                  <div className="flex items-center gap-[4px] md:gap-[8px] flex-1">
                    <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Your Coverage</h2>
                    <span className="text-[16px] md:text-[20px] leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">(5)</span>
                  </div>
                  <div className="flex items-center gap-[8px] md:gap-[12px] cursor-pointer">
                    <span className="hidden md:block text-[16px] font-medium leading-[24px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                    <Icon icon="material-symbols:arrow-forward" width={16} height={16} style={{color: '#0d6efd'}} />
                  </div>
                </div>
                
                {/* Coverage Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[20px] w-full">
                  {/* Travel Card */}
                  <div className="flex flex-col overflow-hidden max-h-[260px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px]">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] bg-white border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:flight" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Travel</span>
                      </div>
                      <Icon icon="material-symbols:verified-user" width={70} height={25} style={{color: '#28a745'}} />
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] gap-[12px] md:gap-[16px] bg-white">
                      <div className="flex items-center justify-between p-[8px_12px] bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07] rounded-[8px] border border-[#e0e0e0]">
                        <span className="flex-1 text-[14px] font-medium leading-[21px] bg-gradient-to-r from-[#005eb8] to-[#5c55eb] bg-clip-text text-transparent font-[Noto_Sans]">New trip? Get covered in 2 minutes.</span>
                        <button className="px-[12px] md:px-[16px] py-[6px] md:py-[8px] bg-[#005eb8] text-white text-[12px] md:text-[14px] font-medium leading-[18px] md:leading-[21px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] font-[Noto_Sans]">Buy Now</button>
                      </div>
                      <div className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                        <div className="flex flex-col gap-[4px] flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-[4px] md:gap-[8px]">
                            <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">InsureTravel (Annual Trip)</span>
                            <span className="bg-[#e8f5e9] text-[#2e7d32] text-[10px] md:text-[11px] font-medium px-[6px] md:px-[8px] py-[2px] rounded-full w-fit">In Force</span>
                          </div>
                          <span className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: PNF320104124A23</span>
                        </div>
                        <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                      </div>
                    </div>
                  </div>

                  {/* Motor Card */}
                  <div className="flex flex-col overflow-hidden h-[260px] max-h-[260px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px]">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] bg-white border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:directions-car" width={24} height={24} style={{color: '#6e6e6e'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Motor</span>
                      </div>
                      <div className="flex items-center justify-center py-[4px] px-[8px] gap-[4px] bg-[#f5f5f5] rounded-[24px]">
                        <span className="text-[10px] md:text-[12px] font-medium leading-[14px] md:leading-[16.8px] text-center text-[#8d8d8d] font-[Noto_Sans]">NOT COVERED</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] bg-white">
                      <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Protect your car from $X/year with your pre-filled details. Get quote here.</span>
                    </div>
                  </div>

                  {/* Helper Card */}
                  <div className="flex flex-col overflow-hidden max-h-[260px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px]">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] bg-white border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Helper</span>
                      </div>
                      <Icon icon="material-symbols:verified-user" width={70} height={25} style={{color: '#28a745'}} />
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] gap-[12px] bg-white">
                      <div className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                        <div className="flex flex-col gap-[4px] flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-[4px] md:gap-[8px]">
                            <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">UniHelper</span>
                            <span className="bg-[#e8f5e9] text-[#2e7d32] text-[10px] md:text-[11px] font-medium px-[6px] md:px-[8px] py-[2px] rounded-full w-fit">In Force</span>
                          </div>
                          <span className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: PNF320104124A23</span>
                        </div>
                        <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#6e6e6e'}} />
                      </div>
                    </div>
                  </div>

                  {/* Home Card */}
                  <div className="flex flex-col overflow-hidden max-h-[260px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px]">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] bg-white border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:home" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Home</span>
                      </div>
                      <Icon icon="material-symbols:verified-user" width={70} height={25} style={{color: '#28a745'}} />
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] gap-[12px] bg-white">
                      <div className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                        <div className="flex flex-col gap-[4px] flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-[4px] md:gap-[8px]">
                            <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">UniHome</span>
                            <span className="bg-[#fff8e1] text-[#e65100] text-[10px] md:text-[11px] font-medium px-[6px] md:px-[8px] py-[2px] rounded-full w-fit">Renewal Due</span>
                          </div>
                          <span className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: PNF320104124A23</span>
                        </div>
                        <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#6e6e6e'}} />
                      </div>
                    </div>
                  </div>

                  {/* Hospitalisation Protection Card */}
                  <div className="flex flex-col overflow-hidden h-[260px] max-h-[260px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px]">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] bg-white border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:local-hospital" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Hospitalisation Protection</span>
                      </div>
                      <div className="flex items-center justify-center py-[4px] px-[8px] gap-[4px] bg-[#f5f5f5] rounded-[24px]">
                        <span className="text-[10px] md:text-[12px] font-medium leading-[14px] md:leading-[16.8px] text-center text-[#8d8d8d] font-[Noto_Sans]">NOT COVERED</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] bg-white">
                      <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Cover day-to-day expenses when hospitalised from $X/year. Get quote here.</span>
                    </div>
                  </div>

                  {/* Personal Accident Card */}
                  <div className="flex flex-col overflow-hidden max-h-[260px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px]">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] bg-white border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Personal Accident</span>
                      </div>
                      <div className="flex items-center justify-center py-[4px] px-[8px] gap-[4px] bg-[#f5f5f5] rounded-[24px]">
                        <span className="text-[10px] md:text-[12px] font-medium leading-[14px] md:leading-[16.8px] text-center text-[#8d8d8d] font-[Noto_Sans]">NOT COVERED</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] bg-white">
                      <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Get medical coverage for accidents from $X/year with your pre-filled details. Get quote here.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards */}
              <div className="flex flex-col gap-[16px] md:gap-[20px] w-full">
                <div className="flex items-center gap-[16px] md:gap-[28px] w-full">
                  <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Rewards</h2>
                  <div className="flex items-center gap-[8px] md:gap-[12px] cursor-pointer">
                    <span className="hidden md:block text-[16px] font-medium leading-[24px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                    <Icon icon="material-symbols:arrow-forward" width={16} height={16} style={{color: '#0d6efd'}} />
                  </div>
                </div>
                
                {/* Rewards Cards */}
                <div className="flex items-center gap-[16px] md:gap-[20px] overflow-x-auto scrollbar-hide w-full">
                  <div className="relative shrink-0 w-[240px] md:w-[313px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px] overflow-hidden">
                    <img src={rewardCards[0].image} className="w-full h-[135px] md:h-[176px] object-cover" alt="Reward" />
                    <div className="flex flex-col justify-between p-[12px] md:p-[16px] gap-[12px] md:gap-[24px] bg-white">
                      <div className="flex flex-col justify-center gap-[8px] md:gap-[12px] w-full">
                        <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{rewardCards[0].title}</h3>
                        <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">{rewardCards[0].description}</p>
                      </div>
                      <button className="flex items-center justify-center py-[10px] md:py-[12px] px-[16px] gap-[10px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity w-auto self-start">
                        <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-white font-[Noto_Sans]">Shop Now</span>
                      </button>
                    </div>
                    <img src={rewardCards[0].logo} className="absolute top-[8px] left-[8px] w-[36px] md:w-[52px] h-[36px] md:h-[52px] rounded-full object-cover" alt="Brand Logo" />
                  </div>
                  <div className="hidden md:block shrink-0">
                    <Icon icon="material-symbols:chevron-right" width={40} height={40} style={{color: '#6e6e6e'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Panel */}
          <div className="absolute top-[24px] md:top-[50px] right-[16px] md:right-[100px] w-[320px] md:w-[400px] max-h-[600px] bg-white rounded-[24px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] z-50">
            {/* Header */}
            <div className="flex flex-col justify-center py-[16px] md:py-[24px] px-[16px] md:px-[24px] gap-[16px] w-full bg-white rounded-tl-[12px] rounded-tr-[12px] shadow-[inset_0px_-1px_0px_rgba(0,0,0,0.09)]">
              <div className="flex items-center gap-[16px] w-full">
                <h2 className="text-[18px] md:text-[20px] font-bold leading-[21.6px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Notifications</h2>
                <button onClick={handleCloseNotifications} className="ml-auto p-[4px] rounded-[4px] hover:bg-[#f0f0f0] transition-colors">
                  <Icon icon="material-symbols:close" width={24} height={24} style={{color: '#6e6e6e'}} />
                </button>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-[12px] w-full">
                <div className="flex items-center gap-[8px] overflow-x-auto">
                  <button 
                    onClick={() => setNotificationFilter('all')}
                    className={`flex items-center justify-center py-[4px] px-[16px] md:px-[20px] gap-[10px] rounded-[24px] border border-[#000000]/[0.09] transition-colors shrink-0 ${
                      notificationFilter === 'all' ? 'bg-white text-[#6e6e6e]' : 'bg-[#f9f9f9] text-[#6e6e6e]'
                    }`}
                  >
                    <span className="text-[14px] font-medium leading-[21px] font-[Noto_Sans]">All</span>
                  </button>
                  <button 
                    onClick={() => setNotificationFilter('unread')}
                    className={`flex items-center justify-center py-[4px] px-[16px] md:px-[20px] gap-[10px] rounded-[24px] border border-[#000000]/[0.09] transition-colors shrink-0 ${
                      notificationFilter === 'unread' ? 'bg-[#f9f9f9] text-[#005eb8]' : 'bg-white text-[#6e6e6e]'
                    }`}
                  >
                    <span className="text-[14px] font-medium leading-[21px] font-[Noto_Sans]">Unread (1)</span>
                  </button>
                </div>
                <button onClick={handleMarkAllAsRead} className="flex flex-col justify-center items-center gap-[8px] rounded-[12px] shrink-0">
                  <span className="text-[14px] font-medium leading-[21px] text-center text-[#005eb8] font-[Noto_Sans]">Mark all as read</span>
                </button>
              </div>
            </div>
            
            {/* Notifications List */}
            <div className="flex flex-col overflow-y-auto max-h-[400px] rounded-bl-[12px] rounded-br-[12px]">
              {notifications.map((notification, index) => (
                <div key={index} className="flex flex-col py-[12px] md:py-[16px] px-[16px] md:px-[24px] gap-[12px] md:gap-[16px] w-full bg-white shadow-[inset_0px_-1px_0px_rgba(0,0,0,0.09)] last:shadow-none">
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex items-center gap-[8px] w-full">
                      <h3 className="text-[14px] font-bold leading-[21px] text-[#212121] font-[Noto_Sans] flex-1">{notification.title}</h3>
                      {notification.unread && <div className="w-[8px] h-[8px] bg-[#dc3545] rounded-full shrink-0" />}
                    </div>
                    <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">{notification.message}</p>
                    <div className="flex items-center gap-[8px] w-full">
                      <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">{notification.date}</span>
                      <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">•</span>
                      <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">{notification.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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