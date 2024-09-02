import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      className="bg-[url(https://dashboi-one.vercel.app/images/home/hero-bg.png)] bg-cover bg-no-repeat relative "
      id="home"
    >
      <div className="bg-gradient-to-b from-primary/30 to-[#fff] dark:from-primary/20 dark:to-[#0F172A]">
        <div className="container">
          <div className=" relative z-10 h-screen flex items-center">
            <div className="w-full">
              <div>
                <h1 className="max-w-[600px] mx-auto text-xl md:text-2xl xl:text-4xl xl:leading-[52px] font-semibold  text-pink-700 text-center">
                  <span className="text-primary">TrexoPro</span> - Tailwind,
                  React Next Admin Dashboard Template
                </h1>
              </div>
              <div>
                <p className="text-base leading-7 md:text-lg md:leading-8 text-default-700 text-center mt-5 max-w-[800px] mx-auto">
                  TrexoPro is a developer-friendly, ready-to-use admin template
                  designed for building attractive, scalable, and
                  high-performing web applications, powered by the cutting-edge
                  technologies of Next.js and Tailwind CSS.
                </p>
              </div>
              <div className="flex mt-9 justify-center gap-4 lg:gap-8">
                <Button asChild size="xl">
                  <Link href="/login">Go to Login Page </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
