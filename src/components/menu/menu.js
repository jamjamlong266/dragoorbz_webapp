import { Button, ButtonGroup } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const ROUTES = [
  { name: "home", path: "/" },
  { name: "lottery", path: "/lottery" },
  { name: "marketplace", path: "/", disabled: true },
  { name: "promotion", path: "/", disabled: true },
  { name: "rewards", path: "/rewards" },
  { name: "profile", path: "/profile" },
];

export default function Menu() {
  const routeItems = ROUTES.map((route) => (
    <Link href={route.path} key={route.name} className="mb-4">
      <li className="flex flex-col items-center mb-5">
        <Image
          alt="img"
          src={
            route.disabled
              ? `/images/icons/${route.name}_inactive_icon.png`
              : `/images/icons/${route.name}_icon.png`
          }
          width={20}
          height={20}
          quality={100}
          style={{
            opacity: route.disabled ? 0.5 : 1,
          }}
          className="m-0"
        />
        <Button
          variant="light"
          className="uppercase text-[9px] hover:bg-transparent m-0"
        >
          {route.name}
        </Button>
      </li>
    </Link>
  ));

  return (
    <div className="hidden md:flex flex-col w-20 items-center  bg-[#1F1B41] h-auto min-h-screen py-10 fixed">
      <Image alt="img" src="/images/icons/logo.png" width={50} height={50} />
      <nav className="flex flex-col items-center mt-20">
        <ul>{routeItems}</ul>
      </nav>
    </div>
  );
}
