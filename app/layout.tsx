import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haris Daniel Noh - Software Engineer",
  description: "Full-Stack Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "black" }}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            html, body {
              margin: 0;
              padding: 0;
              background-color: black !important;
              overflow: hidden;
            }
            .main-content {
              display: none;
            }
            body.splash-complete .main-content {
              display: block;
            }
            body.splash-complete {
              overflow: auto;
            }
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "black", margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
