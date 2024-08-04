"use client";

import { useState, useEffect } from "react";
import { getBalance, getAccount } from "@wagmi/core";
import { config } from "../../../utils/config";

import { useWriteContract, useReadContract } from "wagmi";
import { abi } from "../../../utils/dragonabi";
import { parseEther, parseUnits, formatEther } from "viem";

import { submitUserEntry, findUserByWalletAddress } from "../../../hooks";

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";
import Link from "next/link";

export default function BuyTicket({ onClose }) {
  const [balance, setBalance] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [ticketNumber, setTicketNumber] = useState([]);
  const [totalTicket, setTotalTicket] = useState(0);

  const account = getAccount(config);

  const contract = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "commonSid",
  });

  const { status, data: hash, writeContract } = useWriteContract();
  const { data: user } = findUserByWalletAddress(account.address);

  const { mutate: submitEntry } = submitUserEntry();
  useEffect(() => {
    getBalance(config, {
      address: account.address,
    }).then((res) => {
      console.log("res", res);
      setBalance(res);
    });
  }, []);

  const handleSubmitTicket = () => {
    if (totalTicket === 0) {
      alert("Please select number");
      return;
    }
    if (totalTicket > balance) {
      alert("You don't have enough balance");
      return;
    }
    const filterSelectedNumbers = selectedNumbers.filter(
      (item) => item !== undefined
    );
    const filterTicketNumber = ticketNumber.filter(
      (item) => item !== undefined
    );

    writeContract({
      address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
      abi,
      functionName: "buyMultipleTicket",
      args: [
        // user.data.user.referral_address,
        "0xf14f2dEc1cdEae83B3900D5362536C21E9C501ce",
        filterSelectedNumbers,
        filterTicketNumber,
      ],
      value: parseEther("0.0001") * BigInt(totalTicket),
    });
  };

  useEffect(() => {
    console.log("UPDATE USER ENTRY", status);
    if (status === "success") {
      handleBuyTicket();
    }
  }, [status]);

  const updateTicketEntry = (number, ticket) => {
    //push number into setTicketNumber array
    console.log("number", number, "ticket", ticket);
    let newSelectedNumbers = [...selectedNumbers];
    newSelectedNumbers[number] = number;
    setSelectedNumbers(newSelectedNumbers);

    let newTicketNumber = [...ticketNumber];
    newTicketNumber[number] = Number(ticket);
    setTicketNumber(newTicketNumber);
    //sum up total ticket number from selectedNumbers array
    let total = 0;
    newTicketNumber
      .filter((item) => item !== undefined)
      .map((item) => {
        if (item) {
          total += item;
        }
      });
    setTotalTicket(total);
  };

  const handleBuyTicket = () => {
    if (totalTicket === 0) {
      alert("Please select number");
      return;
    }

    if (totalTicket > balance) {
      alert("You don't have enough balance");
      return;
    }

    const filterSelectedNumbers = selectedNumbers.filter(
      (item) => item !== undefined
    );
    const filterTicketNumber = ticketNumber.filter(
      (item) => item !== undefined
    );
    submitEntry({
      sessionId: contract.data.toString(),
      userId: user.data.user.id,
      selected_number: filterSelectedNumbers.toLocaleString(),
      total_ticket: filterTicketNumber.toLocaleString(),
      referral_address: user.data.user.referral_address,
      total_amount: Number(
        formatEther(parseEther("0.0001") * BigInt(totalTicket))
      ),
      type: "normal",
    });
  };
  return (
    <>
      <ModalHeader className="flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row items-center">
          <h1 className="mr-10">HOURLY</h1>
          <div className="flex flex-row items-center">
            <Image alt="img" src="/images/lottery/eth-icon.png" width={40} />
            <div className="ml-3">
              <p className="text-tiny text-white/60 uppercase font-bold">
                PRIZE POOL (ETH)
              </p>
              <h1 className="text-3xl font-bold text-[#FF8B37]">18.788</h1>
              <p className="text-tiny text-white/60 uppercase font-bold">
                $67,888.90
              </p>
            </div>
          </div>
        </div>
        <h4 className="text-white font-medium text-2xl bg-[#130F2F] p-4 rounded-lg">
          00h 00m
        </h4>
      </ModalHeader>
      <ModalBody>
        <p>
          AVAILABLE AMOUNT : {balance.formatted} {balance.symbol}
        </p>

        <div>
          <p>Select your number</p>
          {/* <div className="grid grid-cols-6 gap-4">
            {[...Array(10).keys()].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center w-[50px] h-[50px] rounded-full  hover:bg-[#FF8B37] cursor-pointer justify-center"
                style={{
                  backgroundColor:
                    selectedNumbers === i ? "#FF8B37" : "#130F2F",
                }}
                onClick={() => handleSelectNumber(i)}
              >
                <p className="text-white">{i}</p>
              </div>
            ))}
          </div> */}

          {/* //create 2 column grid with number 0-9 in left column and input type number in right column for each number */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(10).keys()].map((i) => (
              <div key={i} className="flex flex-row items-center">
                <div
                  className="flex flex-col items-center w-[50px] h-[50px] rounded-full  hover:bg-[#FF8B37] cursor-pointer justify-center"
                  style={{
                    backgroundColor:
                      selectedNumbers === i ? "#FF8B37" : "#130F2F",
                  }}
                  onClick={() => handleSelectNumber(i)}
                >
                  <p className="text-white">{i}</p>
                </div>
                <input
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  className="w-1/2 p-2 rounded-lg"
                  max={10}
                  min={1}
                  //onchange setSelectedNumbers with index i and value of input number
                  onChange={(e) => {
                    updateTicketEntry(i + 1, e.target.value);
                  }}
                  value={ticketNumber[i + 1]}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* <p>Select your entry tickets</p>
        <input
          type="number"
          className="w-full p-2 rounded-lg"
          max={10}
          min={1}
          onChange={(e) => setTicketNumber(e.target.value)}
          value={ticketNumber}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        /> */}
        <div>
          {status === "loading" && <div>Processing...</div>}
          {status === "error" && <div>No opened session yet, </div>}
          {hash && (
            <div>
              Transaction Hash:
              <Link
                href={`https://sepolia.basescan.org/tx/${hash}`}
                target="_blank"
              >
                {hash}
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-between items-center mt-10">
          <h1 className="font-bold text-xl uppercase font-jost">
            Total amount to pay
          </h1>
          <p className="px-10 py-3 bg-[#EF9655] font-bold rounded-3xl">
            {formatEther(parseEther("0.0001") * BigInt(totalTicket))}
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="bg-black" variant="solid" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={() => handleSubmitTicket()}>
          ENTER NOW!
        </Button>
      </ModalFooter>
    </>
  );
}
