"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQRCode } from "next-qrcode";
import { useAccount } from "wagmi";

import { Spinner } from "@nextui-org/react";

import { getUserReferral } from "../../../hooks";

export default function Referral() {
  const { address } = useAccount();
  const { Canvas } = useQRCode();

  const copylink = () => {
    let link = `${process.env.NEXT_PUBLIC_BASE_URL}/?r=${address}`;
    navigator.clipboard.writeText(link);

    alert("Copied to clipboard");
  };

  const { data: referralData, status } = getUserReferral(address);

  return (
    <div className="bg-[#141D30] md:p-10 p-5 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col xl:flex-row justify-start items-start bg-[#485060] rounded-xl p-5 xl">
          <div>
            <Canvas
              text={`${process.env.NEXT_PUBLIC_BASE_URL}/?r=${address}`}
              options={{
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 4,
                width: 200,
                borderRadius: 30,
              }}
            />
          </div>

          <div className="xl:ml-10">
            <h1 className="text-md">MY REFERRAL LINK</h1>
            <hr className=" bg-[#29C9FC] w-[50px] h-1 border-none rounded-full " />
            <p
              className="text-black cursor-pointer text-[1em] bg-[gold] rounded-xl p-2 mt-2 text-center"
              onClick={() => copylink()}
            >
              {/* {process.env.NEXT_PUBLIC_BASE_URL}/?r={address} */}
              Share my referral link
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center bg-gradient-to-r from-[#191D2C_0] to-[#2C2E38] rounded-xl p-5 border-1 border-[#29C9FC]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">
              {status === "loading" ? (
                <Spinner />
              ) : status === "error" ? (
                <p>Error</p>
              ) : (
                referralData && referralData.data.total
              )}
            </h1>
            <hr className=" bg-[#29C9FC] w-full h-[2px] border-none rounded-full my-4" />
            <p className="text-tiny">Total Referrals</p>
          </div>
          <div className="ml-10">
            <p className="text-tiny">
              Invite more friends to <br />
              unlock additional Dragon Points!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
