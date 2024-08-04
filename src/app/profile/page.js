"use client";

import { useState, useEffect, Suspense } from "react";
import { Button, Image } from "@nextui-org/react";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { useSearchParams } from "next/navigation";
import History from "./component/History";
import Referral from "./component/Referral";

import ConnectTwitterBtn from "./component/ConnectTwitterBtn";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../hooks";
import axios from "axios";

export default function Profile() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("referral");
  const searchParams = useSearchParams();

  const username = searchParams.get("username");
  const pic = searchParams.get("pic");

  const { mutate } = useMutation({
    mutationKey: "updateUserDetails",
    mutationFn: async ({ walletAddress, twitter_handle, twitter_pic }) => {
      return await axios.put(`https://api.dragoorbz.com/users/`, {
        walletAddress,
        twitter_handle,
        twitter_pic,
      });
    },
  });

  const { data, isLoading, isError } = getUserProfile(address);

  useEffect(() => {
    if (username) {
      //call updateUserDetails mutation
      console.log("username", username);
      console.log("pic", pic);
      if (address && username && pic) {
        mutate({
          walletAddress: address,
          twitter_handle: username,
          twitter_pic: pic,
        });
      }
    }
  }, []);

  return (
    <Suspense>
      <div className="w-full h-full min-h-full">
        <section>
          <h1>Your Points</h1>
          <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg md:p-10 p-2 flex flex-col md:flex-row justify-between ">
            <div className="mr-20">
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  {data && data.data && (
                    <Image
                      alt="img"
                      src={
                        data.data.user.twitter_pic ||
                        "/images/rewards/profile-pic.png"
                      }
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <div className="ml-4">
                  <h1 className="text-5xl font-bold  ">LOTTI</h1>
                  <p className="text-tiny">User ID: 01888888</p>
                </div>
              </div>

              {data && data.data && data.data.user.twitter_handle === null && (
                <div className="mt-10">
                  <ConnectTwitterBtn />
                </div>
              )}
            </div>

            <div className="md:w-[40vw] 1xl:w-[30vw] bg-gradient-to-r from-[rgba(20,29,48,1)] to-[rgba(20,29,48,.1)] p-5 rounded-xl mt-10 md:mt-0 flex flex-col sm:flex-row justify-between items-start">
              <div className="flex flex-col justify-between items-start">
                <div>
                  {data && data.data && (
                    <>
                      <label htmlFor="name">Username</label>
                      <input
                        type="text"
                        id="name"
                        disabled
                        value={data.data.user.twitter_handle || ""}
                        className="w-full bg-[#222d43] border-none rounded-lg p-2 mt-2"
                      />
                      <p className="text-tiny">Connect X account to set</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h1>Your Points</h1>
          <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg md:p-10 p-2 flex flex-col md:flex-col justify-between ">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <Image
                  alt="img"
                  src="/images/rewards/profile-pic.png"
                  width={40}
                  height={40}
                />
                <h1>LOTTI</h1>
              </div>

              <div>
                <Button>DFFERS</Button>
                <Button>DFFERS</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-12 my-10">
              <Button className="bg-[#141D30] rounded-full">Account</Button>
              <Button
                className="bg-[#141D30] rounded-full"
                onPress={() => setActiveTab("history")}
              >
                HISTORY
              </Button>
              <Button
                className="bg-[#141D30] rounded-full"
                onPress={() => setActiveTab("referral")}
              >
                REFER & EARN
              </Button>
              <Button className="bg-[#141D30] rounded-full">SETTING</Button>
            </div>

            {
              {
                history: <History />,
                referral: <Referral />,
              }[activeTab]
            }
          </div>
        </section>
      </div>
    </Suspense>
  );
}
