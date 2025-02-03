export default function AppAcomplishmentContent() {
  return (
    <section className="flex flex-col items-center mt-28">
      <div className="flex justify-center mb-10 border-pink-500 w-[80%] sm:w-[60%] md:w-[65%] lg:w-[55%] xl:w-[40%]  border-b-2 pb-2">
        <h1 className="font-raleway text-2xl sm:text-3xl md:text-4xl pb-3 text-center hover:scale-105 transition-transform duration-200 ease-in-out inline-block mx-auto dark:text-dark-200">
          Our accomplishments so far
        </h1>
      </div>
      <div className="lg:w-[90%] xl:w-[85%]">
        <div className="flex flex-col items-center mb-12 mt-10">
          <h1 className="text-3xl font-semibold font-montserrat md:text-5xl dark:text-dark-100">
            Total five star ratings
          </h1>
          <p className="text-4xl mt-7 font-montserrat font-bold bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent md:text-5xl">
            40000+
          </p>
        </div>
        <div className="lg:flex lg:justify-between w-full lg:my-24">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-semibold font-montserrat md:text-5xl dark:text-dark-100">
              Total posts
            </h1>
            <p className="text-4xl mt-7 font-montserrat font-bold bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent md:text-5xl">
              20000+
            </p>
          </div>
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-semibold font-montserrat md:text-5xl dark:text-dark-100">
              Total users
            </h1>
            <p className="text-4xl mt-7 font-montserrat font-bold bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent md:text-5xl">
              50000+
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl font-semibold font-montserrat md:text-5xl dark:text-dark-100">
            Total five star ratings
          </h1>
          <p className="text-4xl mt-7 font-montserrat font-bold bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent md:text-5xl">
            300000+
          </p>
        </div>
      </div>
    </section>
  );
}
