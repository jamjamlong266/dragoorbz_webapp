import { ThemeSwitcher } from "../components/ThemeSwitcher";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import HomeStats from "./components/HomeStats";
import Counter from "./components/HomeCounter";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Card>
        <Image
          alt="img"
          removeWrapper
          className="z-0 w-full h-full object-cover"
          src="/images/home/banner.png"
        />
      </Card>
      <section className="my-20">
        <div className="border-solid border-1 border-[#FF8B36] rounded-2xl flex flex-row p-5">
          <span className="bg-[#FF8B36] mx-2 p-2 text-1xl lg:text-5xl text-[#191F37] font-orbitron font-bold rounded-xl flex justify-center items-center">
            $
          </span>
          <Counter />
        </div>
      </section>
      <section className="my-14">
        <div>
          <h1 className="text-4xl font-bold"> DRAGOORBZ</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-2">
          <Card className="shadow-none bg-transparent rounded-2xl overflow-hidden lg:col-span-2">
            <Link href="/lottery">
              <Image
                alt="img"
                removeWrapper
                className="z-0 w-auto h-full object-contain rounded-2xl overflow-hidden"
                src="/images/home/play-card.png"
              />
            </Link>
          </Card>

          <Card className="shadow-none bg-transparent">
            <Image
              alt="img"
              removeWrapper
              className="z-0 w-full h-auto object-fit"
              src="/images/home/million-card.png"
            />
          </Card>
          <Card className="shadow-none bg-transparent">
            <Image
              alt="img"
              removeWrapper
              className="z-0 w-full h-auto object-fit"
              src="/images/home/mega-card.png"
            />
          </Card>
        </div>
      </section>

      <section className="my-14">
        <div className="flex flex-row items-center">
          <Image alt="img" src="/images/home/stats-icon.png" />
          <h1 className="text-2xl font-bold ml-5">PLATFORM STATS</h1>
        </div>
        {/* //TO DO: Add stats component here */}
        <HomeStats />
      </section>

      <section className="my-20">
        <Card className="bg-transparent shadow-none">
          <Image
            alt="img"
            removeWrapper
            className="z-0 w-full h-full object-cover "
            src="/images/home/footer-banner.png"
          />
        </Card>
      </section>
    </main>
  );
}
