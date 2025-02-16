interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <>
      <main className="absolute right-0 md:pl-[18rem] pt-[5rem] w-full h-full ">
        {children}
      </main>
    </>
  );
};

export default MainContent;
