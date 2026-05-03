import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { absoluteUrl, clipMeta } from "@/lib/metadata";
import { DEFAULT_OG_IMAGE } from "@/lib/seo-assets";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const defaultOgDescription = clipMeta(
  `${COMPANY.name} arranges open and enclosed auto transport across the U.S. ${COMPANY.dot}; ${COMPANY.mc}. ${COMPANY.addressLine}, ${COMPANY.cityStateZip}. Phone ${COMPANY.phone}. ${COMPANY.hours}.`,
  160
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} | Nationwide auto transport`,
    template: `%s`,
  },
  description: defaultOgDescription,
  applicationName: COMPANY.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${COMPANY.name} | Nationwide auto transport`,
    description: defaultOgDescription,
    url: absoluteUrl("/"),
    siteName: COMPANY.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Car carrier hauling vehicles on highway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Nationwide auto transport`,
    description: defaultOgDescription,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        <OrganizationJsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
