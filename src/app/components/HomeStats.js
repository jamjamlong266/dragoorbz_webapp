"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { getAllUsers, getTotalEntries } from "../../hooks";
import { useReadContract } from "wagmi";
import { abi } from "../../utils/dragonabi";
import { useQuery } from "@tanstack/react-query";

export default function HomeStats() {
  const { data: users, isLoading, isError } = getAllUsers();
  const {
    data: entries,
    isLoading: topEntriesLoading,
    isError: topEntriesError,
  } = getTotalEntries();

  const contract = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "commonSid",
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
      <Card className="shadow-none rounded-2xl overflow-hidden p-5 bg-[#25324C]">
        <CardHeader className="bg-[#25324C] flex flex-col justify-start items-start">
          <p className="text-sm font-bold text-[#FF8B37]">TOTAL PLAYERS</p>
          <hr className="bg-[#29C9FC] w-[8rem] h-1 border-none rounded-full" />
        </CardHeader>
        <CardBody className="bg-[#25324C] flex flex-row items-center">
          <Image
            alt="img"
            className="w-15 h-auto object-cover mr-5"
            src="/images/home/player-icon.png"
          />
          {isLoading && <h1 className="text-4xl font-bold">Loading...</h1>}
          {isError && <h1 className="text-4xl font-bold">Error</h1>}
          {users && <h1 className="text-4xl font-bold">{users.data.total}</h1>}
        </CardBody>
      </Card>

      <Card className="shadow-none rounded-2xl overflow-hidden p-5 bg-[#25324C]">
        <CardHeader className="bg-[#25324C] flex flex-col justify-start items-start">
          <p className="text-sm font-bold text-[#FF8B37]">TOTAL GAME VOLUME</p>
          <hr className="bg-[#29C9FC] w-[8rem] h-1 border-none rounded-full" />
        </CardHeader>
        <CardBody className="bg-[#25324C] flex flex-row items-center">
          <Image
            alt="img"
            className="w-15 h-auto object-cover mr-5"
            src="/images/home/volume-icon.png"
          />
          {topEntriesLoading && (
            <h1 className="text-4xl font-bold">Loading...</h1>
          )}
          {topEntriesError && <h1 className="text-4xl font-bold">Error</h1>}
          {entries && (
            <h1 className="text-4xl font-bold">
              {entries.data.total_amount.toFixed(5)} ETH
            </h1>
          )}
        </CardBody>
      </Card>

      <Card className="shadow-none rounded-2xl overflow-hidden p-5 bg-[#25324C]">
        <CardHeader className="bg-[#25324C] flex flex-col justify-start items-start">
          <p className="text-sm font-bold text-[#FF8B37]">TOTAL DRAWS</p>
          <hr className="bg-[#29C9FC] w-[8rem] h-1 border-none rounded-full" />
        </CardHeader>
        <CardBody className="bg-[#25324C] flex flex-row items-center">
          <Image
            alt="img"
            className="w-15 h-auto object-cover mr-5"
            src="/images/home/draws-icon.png"
          />
          {contract.isLoading ? (
            <h1 className="text-4xl font-bold">Loading...</h1>
          ) : (
            <h1 className="text-4xl font-bold">
              {contract.data.toString() - 1}
            </h1>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
