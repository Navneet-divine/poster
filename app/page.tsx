import AppMainContent from "@/components/Landing/AppHeroContent";
import AppPostingContent from "@/components/Landing/AppFeatureContent";
import AppTestimonialsContent from "@/components/Landing/AppTestimonialsContent";
import AppAcomplishmentContent from "@/components/Landing/AppAcomplishmentContent";

export default function Home() {
  return (
    <>
      <AppMainContent />
      <AppPostingContent />
      <AppTestimonialsContent />
      <AppAcomplishmentContent />
    </>
  );
}
