import Header from "@/components/shared/Header/Header";
import Image from "next/image";
import LandingPage from "./components/LandingPage";
import Footer from "@/components/shared/Footer/Footer";

export default function Home() {
  return (
    <section className="bg-[#272142]">
      <LandingPage />
      <Footer />
    </section>
  );
}
