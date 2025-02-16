import Header from "@/components/Header";
import Footer from "@/components/UI/Footer";
import MainContent from "@/components/UI/MainContent";
import Sidebar from "@/components/UI/Sidebar";

const People: React.FC = () => {
  return (
    <>
      <Header />
      <Sidebar/>
      <MainContent>
        
        <h1>People</h1>
      </MainContent>
      <Footer />
    </>
  );
};

export default People;
