import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Ing. Informatica</h1>
        </header>
        <main>{children}</main>
        <footer>
        </footer>
      </body>
    </html>
  );
}