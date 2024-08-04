import { useEffect } from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { findOrCreateUserByWalletAddress } from "../../hooks";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "../../services";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  const searchParams = useSearchParams();

  const referral = searchParams.get("r");

  const { mutate } = useMutation({
    mutationFn: ({ username, wallet_address, referral }) => {
      return services.createUser({
        username,
        wallet_address,
        referral: referral,
      });
    },
  });

  useEffect(() => {
    if (!referral) {
      console.log("No referral found");
      //mutation to create user
      mutate({
        username: ensName,
        wallet_address: address,
        referral: process.env.NEXT_PUBLIC_MASTER_WALLET,
      });
    } else {
      console.log("Referral found", referral);
      //mutation to create user
      // TODO: query wallet address from referral to ensure it exists
      mutate({
        username: ensName,
        wallet_address: address,
        referral: referral,
      });
    }
  }, [address]);

  return (
    <div className="flex flex-row justify-around items-center">
      {address && <p>{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>}
      <button
        onClick={() => disconnect()}
        className="bg-[#25324C] p-4 rounded-lg mx-4"
      >
        Disconnect
      </button>
    </div>
  );
}
