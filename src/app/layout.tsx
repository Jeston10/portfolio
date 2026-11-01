import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/scroll-progress";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fullName = `${profile.firstName} ${profile.lastName}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${fullName} | ${profile.title}`,
    template: `%s | ${fullName}`,
  },
  description: profile.about[0],
  keywords: [
    fullName,
    profile.firstName,
    `${fullName} portfolio`,
    `${profile.firstName} portfolio`,
    profile.title,
    "software engineer",
    "full stack developer",
    "blockchain developer",
  ],
  authors: [{ name: fullName, url: profile.siteUrl }],
  creator: fullName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    siteName: `${fullName} — Portfolio`,
    title: `${fullName} | ${profile.title}`,
    description: profile.about[0],
    images: [{ url: profile.avatar, alt: fullName }],
  },
  twitter: {
    card: "summary",
    title: `${fullName} | ${profile.title}`,
    description: profile.about[0],
    images: [profile.avatar],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "21D0dcWnaR9wpaj_AGdV2wQ7fuP5mO78CtX5uSmZWDk",
  },
};

// Structured data: tells Google this site represents a person named Jeston,
// which strongly helps name searches ("Jeston", "Jeston portfolio").
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  givenName: profile.firstName,
  familyName: profile.lastName,
  jobTitle: profile.title,
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.avatar}`,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressCountry: profile.location,
  },
  sameAs: Object.values(profile.socials),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mono.variable} font-mono antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <ScrollProgress />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
