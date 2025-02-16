import Header from "@/components/Header";
import Footer from "@/components/UI/Footer";
import MainContent from "@/components/UI/MainContent";
import Sidebar from "@/components/UI/Sidebar";

const Create: React.FC = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <h1>Create</h1>
      </MainContent>
      <Footer />
    </>
  );
};

export default Create;
