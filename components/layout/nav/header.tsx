"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings?.header;
  const megaMenu = globalSettings?.header?.megaMenu;

  const [menuState, setMenuState] = React.useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);

  const logoScale = header?.logoScale ?? 1;
  const baseLogoHeight = 32;
  const logoHeight = Math.round(baseLogoHeight * logoScale);

  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-[72px] bg-scheme-2-background" />
      
      <header 
        className="bg-scheme-2-background fixed top-0 z-50 w-full"
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        <nav>
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex items-center justify-between h-[72px]">
              {/* Logo - Left aligned */}
              <div className="shrink-0">
                <Link href="/" aria-label="home" className="flex items-center">
                  {header?.logo ? (
                    <img 
                      src={header.logo} 
                      alt={header.name || 'FireBootCamp'} 
                      style={{ height: `${logoHeight}px`, width: 'auto' }}
                    />
                  ) : (
                    <span className="text-scheme-2-text font-bold font-sans text-[20px]">{header?.name || 'FireBootCamp'}</span>
                  )}
                </Link>
              </div>

              {/* Nav items - Centered */}
              <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
                {header?.nav?.map((item, index) => (
                  <React.Fragment key={index}>
                    {item?.hasDropdown ? (
                      <div
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        className="flex items-center gap-1 text-scheme-2-text font-sans text-[18px] leading-[1.5] hover:text-scheme-2-text/80 transition-colors cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-6 h-6 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
                      </div>
                    ) : (
                      <Link
                        href={item?.href || '#'}
                        className="text-scheme-2-text font-sans text-[18px] leading-[1.5] hover:text-scheme-2-text/80 transition-colors"
                      >
                        {item?.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* CTA Button - Right aligned */}
              <div className="flex items-center gap-4 shrink-0">
                <Button asChild className="hidden lg:flex bg-red hover:bg-red-dark text-white">
                  <Link href={header?.ctaLink || '/apply'}>{header?.ctaLabel || 'Apply now'}</Link>
                </Button>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                  className="lg:hidden p-2.5 text-scheme-2-text"
                >
                  {menuState ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {megaMenuOpen && megaMenu && megaMenu.length > 0 && (
            <div className="hidden lg:block bg-scheme-2-background">
              <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8">
                <div className="grid grid-cols-4 gap-8">
                  {megaMenu.map((item, index) => (
                    <Link
                      key={index}
                      href={item?.href || '#'}
                      className="flex gap-3 py-2 group"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                      {item?.icon && (
                        <div className="w-6 h-6 text-scheme-2-text shrink-0">
                          <MegaMenuIcon name={item.icon} />
                        </div>
                      )}
                      <div className="flex flex-col gap-1 text-scheme-2-text">
                        <span className="font-sans text-[18px] font-semibold leading-[1.5] group-hover:text-scheme-2-text/80">{item?.title}</span>
                        <span className="font-sans text-[16px] leading-[1.5] opacity-80">{item?.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-scheme-2-foreground px-4 md:px-8 lg:px-16 py-4">
                <div className="max-w-[1440px] mx-auto flex justify-center items-center gap-2 text-scheme-2-text font-sans text-[18px] leading-[1.5]">
                  <span>{header?.megaMenuBannerText || 'Transform your tech career now'}</span>
                  <Link href={header?.megaMenuBannerLinkUrl || '/apply'} className="underline hover:no-underline">
                    {header?.megaMenuBannerLinkText || 'Start your path'}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>

        {menuState && (
          <div className="lg:hidden bg-scheme-2-background px-6 py-6">
            <ul className="space-y-4">
              {header?.nav?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.href || '#'}
                    className="text-scheme-2-text font-sans text-[18px] leading-[1.5] block py-2"
                    onClick={() => setMenuState(false)}
                  >
                    {item?.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Button asChild className="w-full bg-red hover:bg-red-dark text-white">
                  <Link href={header?.ctaLink || '/apply'}>{header?.ctaLabel || 'Apply now'}</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

const MegaMenuIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'live_tv':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"/>
        </svg>
      );
    case 'developer_mode_tv':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM7.5 13l2.5 2.5L8.5 17l-4-4 4-4 1.5 1.5L7.5 13zm6.5 2.5l2.5-2.5-2.5-2.5L15.5 9l4 4-4 4-1.5-1.5z"/>
        </svg>
      );
    case 'local_fire_department':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 12.9l-2.13 2.09c-.56.56-.87 1.29-.87 2.07C9 18.68 10.35 20 12 20s3-1.32 3-2.94c0-.78-.31-1.52-.87-2.07L12 12.9z"/>
          <path d="M16 6l-.44.55C14.38 8.02 12 7.19 12 5.3V2S4 6 4 13c0 2.92 1.56 5.47 3.89 6.86-.56-.79-.89-1.76-.89-2.8 0-1.32.52-2.56 1.47-3.5L12 10.1l3.53 3.47c.95.93 1.47 2.17 1.47 3.5 0 1.02-.31 1.96-.85 2.75 1.89-1.15 3.29-3.06 3.71-5.3.66-3.55-1.94-6.36-3.86-8.52z"/>
        </svg>
      );
    case 'start':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M14.59 7.41L18.17 11H6v2h12.17l-3.59 3.59L16 18l6-6-6-6-1.41 1.41zM2 6v12h2V6H2z"/>
        </svg>
      );
    default:
      return null;
  }
};
