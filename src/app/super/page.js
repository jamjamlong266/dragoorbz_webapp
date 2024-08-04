"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";

import { useReadContract } from "wagmi";
import { abi } from "../../utils/dragonabi";

export default function SuperResult() {
  const { data: superSid } = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "superSid",
  });

  const { data: superSessionInfo } = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "superSessionInfo",
    args: [Number(superSid) - 1],
  });

  const { data: superTicketInfo } = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "superTicketInfo",
    args: [Number(superSid) - 1, superSessionInfo && superSessionInfo[0]],
  });

  return (
    <div className="grid grid-1 md:grid-cols-3 gap-4">
      <div className="bg-[#0D131E] border-1 border-[#202630] rounded-lg p-5 flex flex-col justify-start items-center col-span-2">
        <div className="w-full flex flex-row justify-between items-center">
          <h1>Super Dragon Round #00{superSid && Number(superSid) - 1}</h1>
        </div>

        <div className=" md:w-[30rem] md:h-[30rem] w-[20rem] h-[20rem] border-[#FF8B37] border-[40px] rounded-full flex flex-col justify-center items-center bg-[#25324C]">
          <Image
            alt="img"
            src="/images/rewards/profile-pic.png"
            width={50}
            height={50}
            className="mb-3"
          />
          <p>Winner Address</p>
          {/* only show the first 4 digit and last 4 digit with superTicketInfo data */}
          <h1>{`${superTicketInfo && superTicketInfo[0].slice(0, 6)}....${
            superTicketInfo && superTicketInfo[0].slice(-4)
          }`}</h1>

          {}
          <Button className="mt-5">Claim</Button>
        </div>
      </div>

      <div className="col-span-1 bg-[#0D131E] border-1 border-[#202630] rounded-lg p-5 flex">
        <h1>
          <h1>Super Dragon Round #00{superSid && Number(superSid) - 1}</h1>

          <div>
            <div className="flex flex-row items-center mt-2">
              <img src="/images/lottery/eth-icon.png" className="w-10" />
              <p className=" font-jost font-bold text-xl ml-2">0.13 ETH</p>
            </div>
            <p className=" font-jost">Prize Pool</p>
          </div>
        </h1>
      </div>
    </div>
  );
}
