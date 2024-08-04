"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";

import { useReadContract } from "wagmi";
import { abi } from "../../utils/dragonabi";

export default function SupremeResults() {
  const { data: supremeSid } = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "supremeSid",
  });

  const { data: supremeSessionInfo } = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "supremeSessionInfo",
    args: [Number(supremeSid) - 1],
  });

  const { data: supremeTicketInfo } = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "supremeTicketInfo",
    args: [Number(supremeSid) - 1, supremeSessionInfo && supremeSessionInfo[0]],
  });

  return (
    <div className="bg-[#0D131E] border-1 border-[#202630] rounded-lg p-10 flex flex-col justify-start items-center">
      <div className="w-full flex flex-row justify-between items-center">
        <h1>Supreme Dragon Round #00{supremeSid && Number(supremeSid) - 1}</h1>
      </div>

      <div className=" w-[30rem] h-[30rem] border-[#FF8B37] border-[40px] rounded-full flex flex-col justify-center items-center bg-[#25324C]">
        {supremeTicketInfo && supremeTicketInfo === null ? (
          <h1>No draw yet</h1>
        ) : (
          <>
            <Image
              alt="img"
              src="/images/rewards/profile-pic.png"
              width={50}
              height={50}
              className="mb-3"
            />
            <p>Winner Address</p>
            {/* only show the first 4 digit and last 4 digit with supremeTicketInfo data */}
            <h1>{`${supremeTicketInfo && supremeTicketInfo[0].slice(0, 6)}....${
              supremeTicketInfo && supremeTicketInfo[0].slice(-4)
            }`}</h1>

            <Button className="mt-5">Claim</Button>
          </>
        )}
      </div>
    </div>
  );
}
