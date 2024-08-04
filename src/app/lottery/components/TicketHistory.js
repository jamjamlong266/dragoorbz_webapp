"use client";

import React from "react";
import {
  Button,
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

import { getAllTickets } from "../../../hooks";
import Link from "next/link";

export default function TicketHistory() {
  const { data, isLoading, isError } = getAllTickets();
  return (
    <section className="my-14">
      <div className="mb-5 flex flex-row justify-start items-center">
        <h1 className="text-2xl font-bold">LOTTERY HISTORY</h1>
        <div></div>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}

      <Table
        aria-label="ticket history"
        classNames={{
          wrapper: "min-h-[222px], bg-transparent shadow-none",
        }}
        className="bg-[#25324C] shadow-md rounded-3xl py-10 px-5"
      >
        <TableHeader>
          <TableColumn
            key="sessionId"
            className="text-center bg-transparent font-orbitron text-white font-bold border-b-2 border-white/30"
          >
            DRAW NO.
          </TableColumn>
          <TableColumn
            key="result"
            className="text-center bg-transparent font-orbitron text-white font-bold border-b-2 border-white/30"
          >
            DRAW RESULTS
          </TableColumn>
          <TableColumn
            key="total_entries"
            className="text-center bg-transparent font-orbitron text-white font-bold border-b-2 border-white/30"
          >
            TOTAL ENTRIES
          </TableColumn>

          <TableColumn
            key="prize_pool"
            className="text-center bg-transparent font-orbitron text-white font-bold border-b-2 border-white/30"
          >
            PRIZE POOL
          </TableColumn>
          <TableColumn
            key="end_date"
            className="text-center bg-transparent font-orbitron text-white font-bold border-b-2 border-white/30"
          >
            DATE
          </TableColumn>
          <TableColumn
            key="verify"
            className="text-center bg-transparent font-orbitron text-white font-bold border-b-2 border-white/30"
          >
            VERIFY
          </TableColumn>
        </TableHeader>

        {data?.data.message === "No ticket result found" ? (
          <TableBody emptyContent={"no da"} items={[]}>
            {[]}
          </TableBody>
        ) : (
          <TableBody>
            {
              // items.map((user, index) => (
              data &&
                data?.data.res.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-white">
                      {user.ticket_id}
                    </TableCell>
                    <TableCell className="text-center text-white">
                      {user.result}
                    </TableCell>
                    <TableCell className="text-center text-white">
                      {user.total_entries}
                    </TableCell>
                    <TableCell className="text-center text-white">
                      {user.prize_pool}
                    </TableCell>
                    <TableCell className="text-center text-white">
                      {user.end_date}
                    </TableCell>
                    <TableCell className="text-center text-white">
                      <Link href={`/ticket/${user.ticket_id}`}>
                        <Button
                          className="bg-[#FFC107] text-white font-orbitron"
                          size="small"
                          auto
                        >
                          Verify
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        )}
      </Table>
    </section>
  );
}
