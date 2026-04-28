import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';

export default function Rewards() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filters = ['All', 'Dining', 'Lifestyle', 'Service', 'Travel'];

  const rewardCards = [
    {
      id: 1,
      image: 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__',
      logo: 'https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__',
      title: '10% off KITH by Casa Products',
      description: 'Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy the offer.',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      image: 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__',
      logo: 'https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__',
      title: '10% off Cat & the Fiddle Cakes',
      description: 'Enter promo code UOICATFIDDLE10 at checkout on www.catandthefiddle to enjoy the offer.',
      buttonText: 'Shop Now'
    },
    {
      id: 3,
      image: 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__',
      logo: 'https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__',
      title: '$5 Credit Reward for HEYMAX New User Sign Up',
      description: 'Enter promo code UOIHEYMAX5 during registration to enjoy $5 credit.',
      buttonText: 'Sign Up'
    },
    {
      id: 4,
      image: 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__',
      logo: 'https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__',
      title: '10% off Mr. Bucket Chocolaterie (min S$50 spend)',
      description: 'Enter promo code UOIMRBUCKET10 at checkout on www.mrbucket.sg to enjoy.',
      buttonText: 'Shop Now'
    },
    {
      id: 5,
      image: 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__',
      title: 'Complimentary Wellness Talk by Health Collective',
      description: 'Enjoy a complimentary wellness talk (worth $80), limited slots available for UOI customers.',
      buttonText: 'View Now'
    }
  ];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCardAction = (buttonText: string) => {
    // Simulate action - could navigate to external sites or show success message
    alert(`${buttonText} clicked!`);
  };

  const handleHelpClick = () => {
    navigate('/faq');
  };

  return (
    <div className="h-screen flex flex-row overflow-hidden font-[Noto_Sans]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeItem="Rewards" />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
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
          <div className="flex flex-col items-center px-[16px] md:px-[32px] py-[24px] md:py-[48px] gap-[24px] md:gap-[28px]">
            <div className="w-full max-w-[980px] flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[24px] md:gap-[32px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-[4px]">
                  <span className="text-[12px] font-[Noto_Sans] leading-[16.8px] text-[#212121]">Dashboard</span>
                  <Icon icon="material-symbols:chevron-right" width={10} height={17} style={{color: '#212121'}} />
                  <span className="text-[12px] font-bold font-[Noto_Sans] leading-[16.8px] text-[#005eb8]">Rewards</span>
                </div>

                <div className="flex flex-col gap-[24px] md:gap-[32px]">
                  {/* Page Title */}
                  <div className="flex items-center gap-[12px] w-full">
                    <div className="flex-1 flex flex-col gap-[12px]">
                      <h1 className="text-[24px] md:text-[32px] font-bold leading-[28.8px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">Rewards</h1>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex gap-[8px] md:gap-[12px] lg:gap-[16px] flex-wrap">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => handleFilterClick(filter)}
                        className={`flex items-center justify-center px-[16px] md:px-[20px] py-[6px] md:py-[8px] rounded-[24px] text-[12px] md:text-[14px] font-medium leading-[18px] md:leading-[21px] font-[Noto_Sans] transition-all cursor-pointer hover:opacity-90 ${
                          activeFilter === filter
                            ? 'bg-[#005eb8] text-white'
                            : 'bg-white text-[#6e6e6e] border border-[#000000]/[0.09]'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* Rewards Grid */}
                  {activeFilter === 'All' ? (
                    <div className="flex flex-col gap-[16px] md:gap-[20px]">
                      {/* First Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[20px] items-stretch">
                        {rewardCards.slice(0, 3).map((card) => (
                          <div key={card.id} className="h-full flex flex-col shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px] overflow-hidden bg-white">
                            <div className="relative">
                              <img src={card.image} className="w-full h-[140px] md:h-[176px] object-cover" alt={card.title} />
                              {card.logo && (
                                <img src={card.logo} className="absolute top-[8px] left-[8px] w-[36px] md:w-[52px] h-[36px] md:h-[52px] rounded-full object-cover" alt="Brand Logo" />
                              )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between p-[12px] md:p-[16px] gap-[16px] md:gap-[24px]">
                              <div className="flex flex-col justify-center gap-[8px] md:gap-[12px]">
                                <h3 className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">{card.title}</h3>
                                <p className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">{card.description}</p>
                              </div>
                              <button
                                onClick={() => handleCardAction(card.buttonText)}
                                className="flex items-center justify-center px-[12px] md:px-[16px] py-[10px] md:py-[12px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity w-auto self-start"
                              >
                                <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-white font-[Noto_Sans]">{card.buttonText}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Second Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] items-stretch">
                        {rewardCards.slice(3).map((card) => (
                          <div key={card.id} className="h-full flex flex-col shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px] overflow-hidden bg-white">
                            <div className="relative">
                              <img src={card.image} className="w-full h-[140px] md:h-[176px] object-cover" alt={card.title} />
                              {card.logo && (
                                <img src={card.logo} className="absolute top-[8px] left-[8px] w-[36px] md:w-[52px] h-[36px] md:h-[52px] rounded-full object-cover" alt="Brand Logo" />
                              )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between p-[12px] md:p-[16px] gap-[16px] md:gap-[24px]">
                              <div className="flex flex-col justify-center gap-[8px] md:gap-[12px]">
                                <h3 className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">{card.title}</h3>
                                <p className="text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">{card.description}</p>
                              </div>
                              <button
                                onClick={() => handleCardAction(card.buttonText)}
                                className="flex items-center justify-center px-[12px] md:px-[16px] py-[10px] md:py-[12px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity w-auto self-start"
                              >
                                <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-white font-[Noto_Sans]">{card.buttonText}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-[40px] md:py-[60px]">
                      <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Coming soon!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 flex items-center justify-between px-[16px] md:px-[24px] py-[16px] bg-[#005eb8] h-[53px]">
          <span className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
          <span className="hidden md:block text-[14px] leading-[21px] text-white font-[Noto_Sans] text-right">All Rights Reserved.</span>
        </footer>
      </div>
    </div>
  );
}