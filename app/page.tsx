import AppHeroContent from "@/components/Landing/AppHeroContent";
import AppPostingContent from "@/components/Landing/AppFeatureContent";
import AppTestimonialsContent from "@/components/Landing/AppTestimonialsContent";
import AppAcomplishmentContent from "@/components/Landing/AppAcomplishmentContent";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <AppHeroContent />
      <AppPostingContent />
      <AppTestimonialsContent />
      <AppAcomplishmentContent />
    </>
  );
}
