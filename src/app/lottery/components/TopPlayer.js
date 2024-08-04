import { checkStatus, getTopEntries } from "../../../hooks";
import {
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useWriteContract, useReadContract } from "wagmi";
import { abi } from "../../../utils/dragonabi";

export default function TopPlayer() {
  const contract = useReadContract({
    address: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS,
    abi,
    functionName: "commonSid",
  });

  const {
    data: topEntries,
    isLoading: topEntriesLoading,
    isError: topEntriesError,
  } = getTopEntries(contract && contract.data && contract.data.toString());

  return (
    <CardBody className="">
      <h1 className="text-sm">CURRENT ENTRIES</h1>
      <Table aria-label="" className="bg-transparent" removeWrapper>
        <TableHeader className="bg-transparent ">
          <TableColumn className="bg-transparent border-b-1">#</TableColumn>
          <TableColumn className="bg-transparent border-b-1">
            PLAYER ID
          </TableColumn>
          <TableColumn className="bg-transparent border-b-1">
            TOTAL AMOUNT
          </TableColumn>
          <TableColumn className="bg-transparent border-b-1">
            ENTRIES
          </TableColumn>
        </TableHeader>
        <TableBody>
          {/* {topEntriesLoading && <p>Loading top entries...</p>} */}

          {topEntriesLoading && (
            <TableRow className="border-b-1 border-white">
              <TableCell>Loading</TableCell>
              <TableCell>Loading</TableCell>
              <TableCell>Loading</TableCell>
              <TableCell>Loading</TableCell>
            </TableRow>
          )}
          {topEntriesError && (
            <TableRow className="border-b-1 border-white">
              <TableCell>{topEntriesError}</TableCell>
              <TableCell>{topEntriesError}</TableCell>
              <TableCell>{topEntriesError}</TableCell>
              <TableCell>{topEntriesError}</TableCell>
            </TableRow>
          )}

          {topEntries &&
            topEntries.data.result &&
            topEntries.data.result.map((entry, index) => (
              <TableRow key={entry.userId} className="border-b-1 border-white">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.userId}</TableCell>
                <TableCell>
                  {Number(entry._sum.total_amount).toFixed(8)} ETH
                </TableCell>
                <TableCell>{entry._sum.total_ticket}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardBody>
  );
}
