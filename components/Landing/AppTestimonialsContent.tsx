import Image from "next/image";

export default function AppTestimonialsContent() {
  return (
    <section className="flex flex-col items-center mt-28">
      <div className="flex justify-center mb-10 lg:mb-20 border-pink-500 w-[80%] sm:w-[60%] md:w-[65%] lg:w-[55%] xl:w-[40%] border-b-2 pb-2">
        <h1 className="font-raleway text-2xl sm:text-3xl md:text-4xl pb-3 text-center hover:scale-105 transition-transform duration-200 ease-in-out inline-block mx-auto dark:text-dark-200">
          See what others think of us
        </h1>
      </div>

      <div className="w-[80%] lg:w-[95%] xl:w-[80%] mt-5 flex flex-wrap lg:flex-nowrap lg:gap-5">
        <div className="shadow-xl w-full p-7 flex flex-col rounded-2xl mb-10 hover:translate-y-[-15px] transition-all dark:bg-dark-600">
          <div className="flex">
            <div>
              <Image
                src="/imgs/testimonila-avatar-1.webp"
                width={48}
                height={48}
                className="h-12 rounded-md"
                alt="Lana's avatar"
              />
            </div>
            <div className="ml-4">
              <h1 className="font-bold font-montserrat dark:text-white">
                Lana
              </h1>
              <p className="font-montserrat font-bold text-sm text-dark-300 dark:text-dark-200">
                @lanadkfhdi
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-raleway text-[14px] dark:text-dark-100">
              &#34;Big shoutout to
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              for helping me land my dream job at Google! I never thought I’d be
              able to break into software engineering, but the mentors at
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              made all the difference. Their approach to teaching was practical,
              empowering, and always tailored to my needs. I&#39;m forever
              grateful for the confidence they instilled in me. If you&#39;re
              looking to level up your career&#44; this is the place to be!"
            </p>
          </div>

          <div className="mt-3">
            <h1 className="text-sm font-bold text-dark-300 font-montserrat dark:text-dark-200">
              23rd May 2022 on twitter
            </h1>
          </div>
        </div>

        <div className="shadow-xl w-full p-7 flex flex-col rounded-2xl mb-10 hover:translate-y-[-15px] transition-all dark:bg-dark-600">
          <div className="flex">
            <div>
              <Image
                src="/imgs/testimonila-avatar-2.jpg"
                width={48}
                height={48}
                className="h-12 rounded-md"
                alt="Nicholas Nash's avatar"
              />
            </div>
            <div className="ml-4">
              <h1 className="font-bold font-montserrat dark:text-white">
                Nicholas Nash
              </h1>
              <p className="font-montserrat font-bold text-sm text-dark-300 dark:text-dark-200">
                @nicholasnash
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-raleway text-[14px] dark:text-dark-100">
              &#34;I&#39;ve had an amazing experience with the tutors at
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              . They are not only experts in their field but also genuinely
              passionate about helping their students succeed. Each session was
              packed with valuable insights, and the supportive environment made
              learning enjoyable.{" "}
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              truly invests in your success&#44; and I couldn&#39;t be more
              thankful!
            </p>
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-bold text-dark-300 font-montserrat dark:text-dark-200">
              22nd Dec 2021 on twitter
            </h1>
          </div>
        </div>

        <div className="shadow-xl w-full p-7 flex flex-col rounded-2xl mb-10 hover:translate-y-[-15px] transition-all dark:bg-dark-600">
          <div className="flex">
            <div>
              <Image
                src="/imgs/testimonila-avatar-3.jpg"
                width={48}
                height={48}
                className="h-12 rounded-md"
                alt="Lana's avatar"
              />
            </div>
            <div className="ml-4">
              <h1 className="font-bold font-montserrat dark:text-white">
                Lana
              </h1>
              <p className="font-montserrat font-bold text-sm text-dark-300 dark:text-dark-200">
                @lanadkfhdi
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-raleway text-[14px] dark:text-dark-100">
              &#34;I can&#39;t recommend
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              enough for anyone looking for personalized tutoring. As a parent,
              I was worried about finding the right mentor for my son, but{" "}
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              made the process so much easier. Their 1-on-1 mentoring sessions
              have been a game-changer&#44; and my son is now excelling in his
              studies. Thank you for being there when we needed you the
              most!&#34;
            </p>
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-bold text-dark-300 font-montserrat dark:text-dark-200">
              23rd May 2022 on twitter
            </h1>
          </div>
        </div>
      </div>

      <div className="w-[80%] lg:w-[90%] xl:w-[80%]">
        <div className="shadow-xl w-full p-7 flex flex-col rounded-2xl lg:mt-10 mb-10 hover:translate-y-[-15px] transition-all dark:bg-dark-600">
          <div className="flex">
            <div className="">
              <Image
                src="/imgs/testimonila-avatar-4.webp"
                width={48}
                height={48}
                className="h-12 rounded-md"
                alt="Alfred Taylor's avatar"
              />
            </div>
            <div className="ml-4">
              <h1 className="font-bold font-montserrat dark:text-white">
                Alfred Taylor
              </h1>
              <p className="font-montserrat font-bold text-sm text-dark-300 dark:text-dark-200">
                @itsalfred
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-raleway text-[14px] dark:text-dark-100">
              &#34;Just wanted to thank
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              for the incredible learning experience. I’ve always struggled with
              certain subjects, but the tutors at{" "}
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>{" "}
              broke things down in a way that made sense. The personalized
              attention and encouragement I received was unmatched. I feel more
              confident in my abilities now than ever before. I’m so glad I
              chose{" "}
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              for my education!&#34;
            </p>
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-bold text-dark-300 font-montserrat dark:text-dark-200">
              2nd May 2022 on facebook
            </h1>
          </div>
        </div>
        <div className="shadow-xl w-full p-7 flex flex-col rounded-2xl mt-10 hover:translate-y-[-15px] transition-all dark:bg-dark-600">
          <div className="flex">
            <div className="">
              <Image
                src="/imgs/testimonila-avatar-5.webp"
                width={48}
                height={48}
                className="h-12 rounded-md"
                alt="Jessica's avatar"
              />
            </div>
            <div className="ml-4">
              <h1 className="font-bold font-montserrat dark:text-white">
                Jessica
              </h1>
              <p className="font-montserrat font-bold text-sm text-dark-300 dark:text-dark-200">
                @jessiknows
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-raleway text-[14px] dark:text-dark-100">
              &#34:I can&#39;t thank
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                @poster
              </span>
              enough for the amazing guidance I received throughout my learning
              journey. The tutors are patient&#44; understanding&#44; and truly
              dedicated to helping their students succeed. They break down
              complex topics in an easy-to-understand way&#44; and I never felt
              overwhelmed. If you&#39;re serious about improving&#44; this is
              the place to be!&#39;
            </p>
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-bold text-dark-300 font-montserrat dark:text-dark-200">
              5th July 2022 on instagram
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
