import Navbar from "@/components/landing/Navbar";
import Link from "next/link";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <>

      <div className="min-h-screen w-full relative figtree">
        {/* Crimson Depth */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #072607 100%)",
          }}
        />

        <div className="relative">
          {/* Navbar */}
          <Navbar />

          {/* hero section */}

          <div className="flex justify-center mt-20">
            <div className="w-fit ">
              <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                <span
                  className={cn(
                    "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                  )}
                  style={{
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                    WebkitClipPath: "padding-box",
                  }}
                />
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <AnimatedGradientText className="text-sm font-medium">
                  v0.1 is Live!
                </AnimatedGradientText>
                <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>

          <div className="hero-text mt-5">
            <p className="text-center text-white text-8xl leading-none pt-sans-bold">We make web traffic <br /> clear and simple</p>
          </div>





        </div>




      </div>




    </>
  );
}


