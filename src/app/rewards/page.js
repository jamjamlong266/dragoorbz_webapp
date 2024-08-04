"use client";

import React from "react";
import Link from "next/link";
import { Button, Image } from "@nextui-org/react";
import { useAccount } from "wagmi";

export default function Rewards() {
  const { address } = useAccount();

  const copylink = () => {
    let link = `${process.env.NEXT_PUBLIC_BASE_URL}/?r=${address}`;
    navigator.clipboard.writeText(link);

    alert("Copied to clipboard");
  };
  return (
    <div>
      <section className="my-14 rounded-2xl overflow-hidden">
        <div className="p-5 min-h-80  shadow-none w-full relative bg-[url(/images/rewards/banner-bg.png)] bg-cover bg-center ">
          <div className=" z-10 top-1 flex-col !items-start justify-center h-full bg-slate-600/60 md:bg-transparent p-5">
            <h1 className="text-5xl font-bold">REFER & EARN!</h1>
            <p>Earn drago points!</p>
            <div>
              <Button
                variant="bordered"
                className="border-[#FF8B37] rounded-full"
              >
                connet wallet
              </Button>
              <Button
                variant="bordered"
                className="border-[#FF8B37] rounded-full"
              >
                social media
              </Button>
            </div>
            <p className="text-sm mt-10 text-white max-w-[40vw] md:max-w-[20vw]">
              Referral can be tracked through contract directly transfer to to
              them/ do by claims (more economical)
            </p>
          </div>
          <Image
            alt="img"
            removeWrapper
            className="z-0 w-auto h-full object-cover"
            src=""
          />
        </div>
      </section>

      <section>
        <h1>Your Points</h1>
        <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-between">
          <div className="flex flex-row justify-center items-center">
            <Image
              alt="img"
              src="/images/rewards/profile-pic.png"
              width={100}
              height={100}
            />
            <div className="ml-4">
              <h1 className="text-5xl font-bold  ">
                888
                <span className="text-sm ml-2">PTS</span>
              </h1>
              <hr className=" bg-[#29C9FC] w-[50px] h-2 border-none rounded-full" />
            </div>
          </div>

          <div className="md:w-[40vw] 1xl:w-[30vw] bg-gradient-to-r from-[rgba(20,29,48,1)] to-[rgba(20,29,48,.1)] p-5 rounded-xl mt-10 md:mt-0 grid grid-cols-3 gap-4">
            <div className="flex flex-col justify-between items-start">
              <div>
                <p className="text-sm">DRAW PTS</p>
                <hr className=" bg-[#29C9FC] w-[20px] h-1 border-none rounded-full" />
              </div>

              <div>
                <p className="text-sm">DRAW PTS</p>
                <hr className=" bg-[#29C9FC] w-[20px] h-1 border-none rounded-full" />
              </div>
            </div>

            <div>
              <p className="text-sm">DRAW PTS</p>
              <hr className=" bg-[#29C9FC] w-[20px] h-1 border-none rounded-full" />
            </div>

            <div className="flex flex-col">
              <Link href="/leaderboard">
                <Button
                  variant="bordered"
                  className="border-[#FF8B37] rounded-full"
                >
                  CLAIMS
                </Button>
              </Link>

              <Link href="/leaderboard">
                <Button
                  variant="bordered"
                  className="border-[#FF8B37] rounded-full mt-2"
                >
                  RANK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1>DAILY QUESTS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="">
            <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-start my-5 items-center ">
              <Image
                alt="img"
                src="/images/rewards/profile-icon.png"
                width={50}
                height={50}
                className="mr-10"
              />

              <div className="mt-5 md:mt-0 ml-10">
                <h3 className="font-bold">Profile Setup</h3>
                <p className="text-tiny">
                  Earn Points for setting up your profile!
                </p>
                <hr className="bg-[#29C9FC] w-[50px] h-2 border-none rounded-full" />
              </div>
            </div>

            <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-start my-5 items-center">
              <Image
                alt="img"
                src="/images/rewards/profile-icon.png"
                width={50}
                height={50}
                className="mr-10"
              />

              <div className="mt-5 md:mt-0 ml-10">
                <h3 className="font-bold">Profile Setup</h3>
                <p className="text-tiny">
                  Earn Points for setting up your profile!
                </p>
                <hr className=" bg-[#29C9FC] w-[50px] h-2 border-none rounded-full" />
              </div>
            </div>

            <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-start my-5 items-center">
              <Image
                alt="img"
                src="/images/rewards/profile-icon.png"
                width={50}
                height={50}
                className="mr-10"
              />

              <div className="mt-5 md:mt-0 ml-10">
                <h3 className="font-bold">Profile Setup</h3>
                <p className="text-tiny">
                  Earn Points for setting up your profile!
                </p>
                <hr className=" bg-[#29C9FC] w-[50px] h-2 border-none rounded-full" />
              </div>
            </div>
          </div>

          <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-center items-center my-5">
            <h1>TBC</h1>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-between my-5 items-center ">
        <h1 className="text-[#29C9FC] font-bold text-4xl">
          INVITE & <br />
          EARN MORE!
        </h1>

        <div className="bg-[#FFFFFF] rounded-xl sm:p-10 p-5 flex sm:flex-row flex-col justify-between items-center">
          <h2 className="text-[#555362] font-bold text-[2vw]">
            {process.env.NEXT_PUBLIC_BASE_URL}/?r={address}
          </h2>

          <p
            className="text-black cursor-pointer text-[1em] bg-[gold] rounded-xl p-2 mt-2 text-center"
            onClick={() => copylink()}
          >
            {/* {process.env.NEXT_PUBLIC_BASE_URL}/?r={address} */}
            Share my referral link
          </p>
        </div>
      </section>
    </div>
  );
}
