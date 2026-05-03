import { COMPANY } from "@/lib/constants";
import { absoluteUrl } from "@/lib/metadata";

/** Organization + Website structured data for sitewide crawl signals. */
export function OrganizationJsonLd() {
  const base = absoluteUrl("/");
  const orgId = `${base}#organization`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": orgId,
        name: COMPANY.name,
        legalName: COMPANY.name,
        url: base,
        telephone: COMPANY.phoneTel,
        email: COMPANY.email,
        slogan: COMPANY.tagline,
        areaServed: { "@type": "Country", name: "United States" },
        sameAs: [COMPANY.socialFacebook, COMPANY.socialInstagram],
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.addressLine,
          addressLocality: "Nine Mile Falls",
          addressRegion: "WA",
          postalCode: "99026",
          addressCountry: "US",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "19:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}#website`,
        url: base,
        name: COMPANY.name,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
