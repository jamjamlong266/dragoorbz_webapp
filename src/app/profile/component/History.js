import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Button,
  Image,
} from "@nextui-org/react";

import { getUserEntriesHistory } from "../../../hooks";

import { Account, useAccount } from "wagmi";

export default function History() {
  const { isConnected, address } = useAccount();
  const { data: entriesHistory, status } = getUserEntriesHistory(address);
  return (
    <div className="bg-[#141D30] p-10 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-start items-center mb-10">
        <h1 className="text-xl">LOTTERY HISTORY</h1>
        <div className="grid grid-cols-3 gap-5 sm:ml-10">
          <Button>ALL</Button>
          <Button>WEEKLY</Button>
          <Button>MONTHLY</Button>
        </div>
      </div>

      {isConnected ? (
        status === "loading" ? (
          <Spinner />
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <Table>
            <TableHeader>
              <TableColumn>DRAW</TableColumn>
              <TableColumn>BET AMOUNT</TableColumn>
              <TableColumn>BET NO</TableColumn>
              <TableColumn>TYPE</TableColumn>
            </TableHeader>
            <TableBody>
              {entriesHistory &&
                entriesHistory.data.result.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>No: {entry.sessionId}</TableCell>
                    <TableCell>{entry.total_amount}</TableCell>
                    <TableCell>{entry.selected_number}</TableCell>
                    <TableCell>{entry.type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p>No wallet connected</p>
        </div>
      )}
    </div>
  );
}
