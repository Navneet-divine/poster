import type { Metadata } from "next";
import "@mantine/core/styles.layer.css";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import LoadingWrapper from "./loading-wrapper";

export const metadata: Metadata = {
  title: "Poster | Landing",
  description: "post landing page",
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Raleway:wght@400;700&family=Merriweather:wght@400;700&family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark:bg-dark-700">
        <ThemeProvider attribute="class">
          <MantineProvider>
            <LoadingWrapper>{children}</LoadingWrapper>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
