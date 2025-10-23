// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Task Space",
  description: "Organizing all your work hasn't been easier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={
        `${geistSans.variable} ${geistMono.variable} antialiased`
      }> */}
      <body>
        {children}
      </body>
    </html>
  );
}
