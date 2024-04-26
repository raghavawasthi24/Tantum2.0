import Header from "@/components/shared/Header/Header";
import Image from "next/image";
import LandingPage from "./components/LandngPage";
import Footer from "@/components/shared/Footer/Footer";

export default function Home() {
  return (
    <section className="bg-[#272142]">
      <Header />
      <LandingPage />
      <Footer />
    </section>
  );
}
