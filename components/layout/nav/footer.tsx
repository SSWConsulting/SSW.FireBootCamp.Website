"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLayout } from "../layout-context";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings || {};

  return (
    <footer className="bg-fbc-dark px-16 py-20">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="flex-1 max-w-[560px] flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="font-oswald font-bold text-[84px] uppercase tracking-tight leading-none text-white">
                {footer?.headline || 'Start your developer journey today'}
              </h2>
              <p className="text-lg leading-relaxed text-white">
                {footer?.description || "We're independent and Oceanic-based. We run webinars, live events, in-house and online courses."}
              </p>
            </div>

            <div className="flex gap-4">
              <Button asChild className="bg-fbc-red hover:bg-fbc-red-dark text-white px-6 py-2.5 rounded-md text-lg font-medium">
                <Link href={footer?.primaryCtaLink || '/apply'}>{footer?.primaryCtaLabel || 'Apply now'}</Link>
              </Button>
              <Button asChild variant="ghost" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-md text-lg font-medium">
                <Link href={footer?.secondaryCtaLink || '#'}>{footer?.secondaryCtaLabel || 'Go to SSW Events'}</Link>
              </Button>
            </div>
          </div>

          <div className="flex gap-8 max-w-[400px]">
            {footer?.linkColumns?.map((column, colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col">
                {column?.links?.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link?.href || '#'}
                    className={`py-2 text-white hover:text-white/80 ${link?.isHeading ? 'font-semibold text-base' : 'text-base'}`}
                  >
                    {link?.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="home">
              {header?.logo ? (
                <Image src={header.logo} alt={header.name || 'FireBootCamp'} width={336} height={64} className="h-16 w-auto" />
              ) : (
                <span className="text-white font-bold text-2xl">{header?.name || 'FireBootCamp'}</span>
              )}
            </Link>
          </div>

          <div className="h-px bg-white/20" />

          <div className="flex items-center justify-between">
            <p className="text-white text-base">
              © {new Date().getFullYear()} SSW FireBootCamp. All rights reserved.
            </p>

            <div className="flex gap-3">
              {footer?.social?.map((link, index) => (
                <Link
                  key={index}
                  href={link?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <SocialIcon name={link?.platform || ''} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case 'facebook':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    default:
      return null;
  }
};
