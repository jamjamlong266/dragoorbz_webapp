"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { getBalance, getAccount } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { config } from "../../../utils/config";
import { abi } from "../../../utils/dragonabi";

export default function UserEntries() {
  const [totalEntries, setTotalEntries] = useState(0);
  const account = getAccount(config);

  const { data: sessionId } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "commonSid",
  });

  const { data: superSid } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "superSid",
  });

  const { data: supremeSid } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "supremeSid",
  });

  const { data: getUserBetAmount } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "getUserBetAmount",
    args: [account.address, sessionId && sessionId.toString() - 1],
  });

  const { data: userTotalSuperTickets } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "userTotalSuperTicket",
    args: [account.address, superSid && superSid.toString() - 1],
  });

  const { data: userTotalSupremeTickets } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "userTotalSupremeTicket",
    args: [account.address, supremeSid && supremeSid.toString() - 1],
  });

  useEffect(() => {
    const total =
      getUserBetAmount &&
      getUserBetAmount.reduce((a, b) => Number(a) + Number(b), 0);

    setTotalEntries(total);
  }, [getUserBetAmount]);
  return (
    <ModalContent>
      <ModalBody className="bg-[#25324C] p-5">
        <div className="flex flex-row justify-start items-center">
          <img
            src="/images/icons/lottery_inactive_icon.png"
            alt="logo"
            className="w-auto h-10"
          />
          <h1 className="ml-2 font-bold">
            TOTAL <br /> ENTRIES
          </h1>
        </div>

        <div className="rounded-full py-4 px-6 border-1 border-[#29C9FC]">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="font-bold text-1xl">HOURLY DRAGON</h1>
              <h2>DRAW NO: {sessionId.toString() - 1}</h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-4xl font-orbitron">
                {totalEntries}
              </h1>
              <span className="text-tiny bg-white text-black px-3 py-1 rounded-full">
                ENTRIES
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-full py-4 px-6 border-1 border-[#29C9FC]">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="font-bold text-1xl">SUPER DRAGON</h1>
              <h2>DRAW NO: {superSid && superSid.toString() - 1}</h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-4xl font-orbitron">
                {userTotalSuperTickets && userTotalSuperTickets.toString()}
              </h1>
              <span className="text-tiny bg-white text-black px-3 py-1 rounded-full">
                ENTRIES
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-full py-4 px-6 border-1 border-[#29C9FC]">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="font-bold text-1xl">SUPREME DRAGON</h1>
              <h2>DRAW NO: {supremeSid && supremeSid.toString() - 1}</h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-4xl font-orbitron">
                {userTotalSupremeTickets && userTotalSupremeTickets.toString()}
              </h1>
              <span className="text-tiny bg-white text-black px-3 py-1 rounded-full">
                ENTRIES
              </span>
            </div>
          </div>
        </div>
      </ModalBody>
    </ModalContent>
  );
}
