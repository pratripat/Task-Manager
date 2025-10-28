import "./globals.css";

export const metadata = {
  title: "Task Space",
  description: "Organizing all your work hasn't been easier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
