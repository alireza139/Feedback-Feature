import "@/styles/globals.css"
import Header from "@/components/Header";
export default function App({ Component, pageProps }) {
  return (
    <div className="bg-blue-50 min-h-screen" dir="rtl">
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}