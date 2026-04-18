export const metadata = {
  title: 'Your Guide to Primary Aldosteronism',
  description: 'A patient-friendly guide to understanding and managing primary aldosteronism, based on the 2025 Endocrine Society Guidelines.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
