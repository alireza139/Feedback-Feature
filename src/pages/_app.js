import "@/styles/globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-blue-50 min-h-screen" dir="rtl">
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}