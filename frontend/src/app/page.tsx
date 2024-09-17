import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import HeroSection from "@/components/base/HeroSection";
import UserReviews from "@/components/base/UserReviews";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/base/Navbar";

export default async function Home() {
  const session: CustomSession| null = await getServerSession(authOptions)
  return (
    <div>
      <Navbar user ={session?.user} />
      <HeroSection/>

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}
