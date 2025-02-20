import {
  ClerkProvider
} from '@clerk/nextjs'

import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { PostHogProvider } from './_providers/posthog-provider';

export const metadata: Metadata = {
  title: "T3 Drive",
  description: "Google Drive but worse, powered by the infamous T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
