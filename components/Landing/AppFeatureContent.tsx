const FEATURE_DATA = [
  {
    title: "Express Your Thoughts with Ease",
    text: "Share your ideas, experiences, and expertise with the world through beautifully crafted blog posts. Our intuitive editor makes writing effortless.",
    image: "/imgs/featureImage1.webp",
  },
  {
    title: "Engage and Grow Your Audience",
    text: "Connect with like-minded readers and fellow writers. Build a community around your content with interactive comments and social sharing features.",
    image: "/imgs/featureImage2.webp",
  },
  {
    title: "Customize and Personalize Your Space",
    text: "Make your blog truly yours with stunning themes, custom layouts, and rich media support. Stand out with a unique and personalized blogging experience.",
    image: "/imgs/featureImage3.webp",
  },
];

export default function AppPostingContent() {
  return (
    <section className="flex flex-col px-5 mt-28 min-h-[40vh] sm:min-h-[60vh]">
      {/* Container for the text */}
      <div className="flex flex-col justify-between items-center text-center h-full">
        <div className="mb-3 border-pink-500 w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]  border-b-2 pb-2">
          <h1 className="font-raleway text-2xl sm:text-3xl md:text-4xl    pb-3 text-center hover:scale-105 transition-transform duration-200 ease-in-out inline-block mx-auto dark:text-dark-200">
            We will make you fall in posting posts
          </h1>
        </div>

        {/* Posts section (will stay at bottom on small screens) */}
        <div className="flex flex-col items-center px-5 sm:px-16 py-5 w-full mt-10">
          <div className="flex max-xl:flex-col gap-20 justify-between xl:mt-10">
            {FEATURE_DATA.map((f, index) => {
              return (
                <div key={index} className="flex flex-col items-center mb-22">
                  <div className="mt-3 flex justify-center rounded-blob-2 bg-gradient-to-r from-purple-500 to-pink-500 w-48 h-48 mb-3">
                    <img
                      src={f.image}
                      className="hover:scale-105 transition-transform duration-200 ease-in-out"
                      width="300px"
                      height="300px"
                      alt={`Feature image ${index + 1}`}
                    />
                  </div>
                  <div className="mt-4 mb-4">
                    <h1 className="text-xl sm:text-2xl md:text-2xl xl:text-xl font-semibold font-raleway text-pink-600">
                      {f.title}
                    </h1>
                  </div>
                  <div>
                    <p className="font-raleway sm:text-xl xl:text-lg text-gray-500">
                      {f.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
