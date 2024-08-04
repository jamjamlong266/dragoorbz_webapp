"use client";

import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
import { useAccount } from "wagmi";

const users = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "Emily Collins",
    role: "Marketing Manager",
    status: "Active",
  },
  {
    key: "6",
    name: "Brian Kim",
    role: "Product Manager",
    status: "Active",
  },
  {
    key: "7",
    name: "Laura Thompson",
    role: "UX Designer",
    status: "Active",
  },
  {
    key: "8",
    name: "Michael Stevens",
    role: "Data Analyst",
    status: "Paused",
  },
  {
    key: "9",
    name: "Sophia Nguyen",
    role: "Quality Assurance",
    status: "Active",
  },
  {
    key: "10",
    name: "James Wilson",
    role: "Front-end Developer",
    status: "Vacation",
  },
  {
    key: "11",
    name: "Ava Johnson",
    role: "Back-end Developer",
    status: "Active",
  },
  {
    key: "12",
    name: "Isabella Smith",
    role: "Graphic Designer",
    status: "Active",
  },
  {
    key: "13",
    name: "Oliver Brown",
    role: "Content Writer",
    status: "Paused",
  },
  {
    key: "14",
    name: "Lucas Jones",
    role: "Project Manager",
    status: "Active",
  },
  {
    key: "15",
    name: "Grace Davis",
    role: "HR Manager",
    status: "Active",
  },
  {
    key: "16",
    name: "Elijah Garcia",
    role: "Network Administrator",
    status: "Active",
  },
  {
    key: "17",
    name: "Emma Martinez",
    role: "Accountant",
    status: "Vacation",
  },
  {
    key: "18",
    name: "Benjamin Lee",
    role: "Operations Manager",
    status: "Active",
  },
  {
    key: "19",
    name: "Mia Hernandez",
    role: "Sales Manager",
    status: "Paused",
  },
  {
    key: "20",
    name: "Daniel Lewis",
    role: "DevOps Engineer",
    status: "Active",
  },
  {
    key: "21",
    name: "Amelia Clark",
    role: "Social Media Specialist",
    status: "Active",
  },
  {
    key: "22",
    name: "Jackson Walker",
    role: "Customer Support",
    status: "Active",
  },
  {
    key: "23",
    name: "Henry Hall",
    role: "Security Analyst",
    status: "Active",
  },
  {
    key: "24",
    name: "Charlotte Young",
    role: "PR Specialist",
    status: "Paused",
  },
  {
    key: "25",
    name: "Liam King",
    role: "Mobile App Developer",
    status: "Active",
  },
];

export default function Leaderboard() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const { address } = useAccount();

  const pages = Math.ceil(users.length / rowsPerPage);

  const copylink = () => {
    let link = `${process.env.NEXT_PUBLIC_BASE_URL}/?r=${address}`;
    navigator.clipboard.writeText(link);

    alert("Copied to clipboard");
  };
  return (
    <div className="h-auto">
      <section>
        <h1 className="text-3xl text-center font-bold">LEADERBOARD</h1>
        <p className="sm:px-40 text-center p-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </section>

      <section>
        <h1 className="font-bold mb-5">LEADERBOARD: TOP POINTS EARNERS</h1>
        <div className="bg-gradient-to-r from-[rgba(255,139,55,0.8)] from-10% via-30% via-[rgba(255,139,55,0.3)] to-[rgba(255,139,55,0.1)] rounded-xl border-1 border-[#29C9FC]">
          <Table
            aria-label=""
            className="bg-transparent py-10"
            removeWrapper
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader className="bg-yellow">
              <TableColumn className="bg-yellow">NAME</TableColumn>
              <TableColumn className="bg-yellow">PROFILE</TableColumn>
              <TableColumn className="bg-yellow">ROLE</TableColumn>
              <TableColumn className="bg-yellow">STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1" className="border-b-1 border-white">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>PROFILE</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2" className="border-b-1 border-white">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>PROFILE</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3" className="border-b-1 border-white">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>PROFILE</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mt-20 w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-between my-5 items-center ">
        <h1 className="text-[#29C9FC] font-bold text-3xl">
          INVITE & <br />
          EARN MORE!
        </h1>

        <div className="bg-[#FFFFFF] rounded-xl sm:p-10 p-5 flex sm:flex-row flex-col justify-between items-center w-full">
          <h2 className="text-[#555362] font-bold text-[2vw]">
            {process.env.NEXT_PUBLIC_BASE_URL}/?r={address}
          </h2>

          <p
            className="text-black cursor-pointer text-[1em] bg-[gold] rounded-xl p-2 mt-2 text-center"
            onClick={() => copylink()}
          >
            {/* {process.env.NEXT_PUBLIC_BASE_URL}/?r={address} */}
            Share my referral link
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h1 className="text-3xl font-bold mb-5">Your Points</h1>
        <div className="w-full bg-[#25324C] border-1 border-white/15 rounded-lg p-10 flex flex-col md:flex-row justify-between">
          <div className="flex flex-row justify-center items-center">
            <Image
              alt="img"
              src="/images/rewards/profile-pic.png"
              width={100}
              height={100}
            />
            <div className="ml-4">
              <h1 className="text-5xl font-bold  ">
                888
                <span className="text-sm ml-2">PTS</span>
              </h1>
              <hr className=" bg-[#29C9FC] w-[50px] h-2 border-none rounded-full" />
            </div>
          </div>

          <div className="md:w-[40vw] 1xl:w-[30vw] bg-gradient-to-r from-[rgba(20,29,48,1)] to-[rgba(20,29,48,.1)] p-5 rounded-xl mt-10 md:mt-0 grid grid-cols-3 gap-4">
            <div className="flex flex-col justify-between items-start">
              <div>
                <p className="text-sm">DRAW PTS</p>
                <hr className=" bg-[#29C9FC] w-[20px] h-1 border-none rounded-full" />
              </div>

              <div>
                <p className="text-sm">DRAW PTS</p>
                <hr className=" bg-[#29C9FC] w-[20px] h-1 border-none rounded-full" />
              </div>
            </div>

            <div>
              <p className="text-sm">DRAW PTS</p>
              <hr className=" bg-[#29C9FC] w-[20px] h-1 border-none rounded-full" />
            </div>

            <div className="flex flex-col">
              <Button
                variant="bordered"
                className="border-[#FF8B37] rounded-full"
              >
                connet wallet
              </Button>
              <Button
                variant="bordered"
                className="border-[#FF8B37] rounded-full mt-2"
              >
                social media
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
