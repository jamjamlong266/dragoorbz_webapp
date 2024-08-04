"use client";

import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi } from "../../utils/dragonabi";
import TopPlayer from "./components/TopPlayer";
import { WagmiProvider, useAccount } from "wagmi";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import BuyTicket from "./components/buyticket";
import TicketHistory from "./components/TicketHistory";
import Link from "next/link";

export default function Lottery() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isConnected } = useAccount();

  const { data: sessionId } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "commonSid",
  });

  const { data: totalBetAmonunt, isSuccess } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    functionName: "getTotalBetAmount",
    args: [sessionId && sessionId.toString() - 1],
  });

  const openTicketModal = () => {
    if (isConnected) {
      onOpen();
    } else {
      alert("Please connect your wallet to buy a ticket");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div>
      <Modal
        size="4xl"
        backdrop="blur"
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="bg-[#25324C]"
      >
        <ModalContent>
          {(onClose) => <BuyTicket onClose={onClose} />}
        </ModalContent>
      </Modal>
      <section className="my-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="bg-transparent shadow-none self-center">
            <Image
              alt="img"
              removeWrapper
              className="z-0 w-full h-auto object-cover"
              src="/images/lottery/lottery-round.png"
            />
          </Card>

          <div>
            <div className="flex flex-row justify-between items-center mb-5">
              <h1 className="text-3xl font-bold">DRAGO DRAW</h1>
              <Button className=" uppercase font-orbitron text-tiny px-5">
                connect
                <br />
                wallet
              </Button>
            </div>
            <Card className="col-span-12 sm:col-span-4 h-[200px] bg-gradient-to-b to-[rgba(41,201,252,0.5)] from-[rgba(41,201,252,0.1)]">
              <CardHeader className="absolute z-10 top-10 flex-row w-full justify-between h-full items-start">
                <h1 className="text-3xl font-bold">HOURLY</h1>
                <h4 className="text-white font-medium text-2xl bg-[#130F2F] p-4 rounded-lg">
                  00h 00m
                </h4>
              </CardHeader>
              <Image
                alt="img"
                removeWrapper
                className="z-0 w-full h-auto object-bottom translate-y-20"
                src="/images/lottery/entry-bg.png"
              />

              <CardFooter className="absolute bottom-0 z-10 flex justify-center items-center">
                <Button
                  radius="full"
                  size="sm"
                  className="bg-transparent text-4xl font-bold text-[#29C9FC]"
                  onPress={() => openTicketModal()}
                >
                  ENTER NOW!
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-10 col-span-12 sm:col-span-4 min-h-[300px] bg-[#25324C]">
              <CardHeader className="text-center w-full text-3xl flex flex-row justify-between items-center  px-5">
                <Image alt="img" src="/images/lottery/eth-icon.png" />
                <div className="flex flex-col items-start justify-start text-left">
                  <p className="text-tiny">PRIZE POOL (ETH)</p>
                  <h2 className="text-[#29C9FC] font-bold text-4xl">19.788</h2>
                  <p className="text-tiny">$67,888.90</p>
                </div>
                <div className="text-left">
                  <p className="text-tiny">_</p>
                  <h3 className="font-bold text-2xl">888</h3>
                  <p className="text-tiny">LOTTERIES BOUGHT</p>
                </div>
              </CardHeader>

              <TopPlayer />
            </Card>
          </div>
        </div>
      </section>

      <section className="border-1 border-[#F4E795] rounded-2xl bg-[#25324C] flex flex-col lg:flex-row p-5 justify-between items-center bg-[url(/images/lottery/ice&fire.png)] bg-cover bg-no-repeat">
        <div className="">
          <h1 className=" font-orbitron text-[#29C9FC] text-2xl translate-x-10 font-bold">
            CURRENT ROUND BET
            <br /> WEIGHTAGE
          </h1>
        </div>
        <div>
          <ul className="lg:flex lg:flex-row grid grid-cols-2 gap-5">
            {isSuccess &&
              totalBetAmonunt.slice(0, 10).map((item, index) => (
                <li
                  className="bg-[#0D0B22] rounded-xl flex flex-col text-center justify-center items-center mx-2"
                  key={index}
                >
                  <h1 className="py-4 px-6">{index}</h1>
                  <div className="bg-[#FBCC34] w-full rounded-b-xl py-1">
                    <p className="text-[#0D0B22]">
                      {(Number(item) / totalBetAmonunt.slice(-1)).toFixed(2) *
                        100 || 0}
                      %
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <h1 className="text-4xl font-bold mb-5">BIGGER WINS!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="bg-transparent shadow-none self-center">
            <CardHeader className="absolute z-10 top-1 flex-row w-full justify-between items-start h-full pt-10 px-10">
              <div className="mr-10">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  PRIZE POOL (ETH)
                </p>
                <h1 className="text-2xl md:text-5xl font-bold text-[#FF8B37]">
                  18.788
                </h1>
                <p className="text-tiny text-white/60 uppercase font-bold">
                  $67,888.90
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium  text-center text-1xl bg-[#130F2F] p-3 rounded-lg">
                  00h 00m
                </h4>
                <h1 className="text-xl md:text-3xl font-bold text-[#FF8B37] text-center">
                  SUPER DRAGON POOL
                </h1>

                <Link href="/super">
                  <Button>CHECK OUT MORE!</Button>
                </Link>
              </div>
            </CardHeader>

            <Image
              alt="img"
              removeWrapper
              className="z-0 w-full h-auto object-cover"
              src="/images/lottery/mega-card.png"
            />
          </Card>

          <Card className="bg-transparent shadow-none self-center">
            <CardHeader className="absolute z-10 top-1 flex-row w-full justify-between items-start h-full pt-10 px-10">
              <div className="mr-10">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  PRIZE POOL (ETH)
                </p>
                <h1 className="text-2xl md:text-5xl font-bold text-[#FFD130]">
                  18.788
                </h1>
                <p className="text-tiny text-white/60 uppercase font-bold">
                  $67,888.90
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium  text-center text-1xl bg-[#130F2F] p-3 rounded-lg">
                  00h 00m
                </h4>
                <h1 className="text-xl md:text-3xl font-bold text-[#FFD130] text-center">
                  SUPREME DRAGON POOL
                </h1>

                <Link href="/supreme">
                  <Button>CHECK OUT MORE!</Button>
                </Link>
              </div>
            </CardHeader>

            <Image
              alt="img"
              removeWrapper
              className="z-0 w-full h-auto object-cover"
              src="/images/lottery/million-card.png"
            />
          </Card>
        </div>
      </section>

      <TicketHistory />
    </div>
  );
}
