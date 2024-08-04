"use clinet";

import {
  ThirdwebProvider,
  // ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";
import React from "react";
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
import Image from "next/image";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "../../utils/config";
import { Account } from "../account/account";
import { WalletOptions } from "../wallet/wallet";

import UserEntries from "./component/UserEntries";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const menuItems = ["lottery", "rewards", "profile"];
  const { isConnected } = useAccount();

  return (
    <header className="flex flex-row justify-start items-center p-5 bg-transparent text-white h-20 w-full border-b-1 border-[#29C9FC] shadow-lg">
      <Navbar onMenuOpenChange={setIsMenuOpen} className="sm:hidden">
        <NavbarContent className="bg-transparent">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="sm:hidden">
            <Link href="/" size="lg">
              <Image
                alt="img"
                src="/images/icons/logo.png"
                width={40}
                height={40}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarMenu className="pt-10 uppercase">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full text-white my-2" href={item} size="lg">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {isConnected ? <Account /> : <WalletOptions />}

      <img
        src="/images/header/notification-icon.svg"
        alt="logo"
        className="hidden sm:block"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} animation="fadeInUp">
        {isConnected ? (
          <UserEntries />
        ) : (
          <ModalContent>
            <ModalBody className="bg-[#25324C] p-5">
              <p>Please Connect Wallet</p>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </header>
  );
}
