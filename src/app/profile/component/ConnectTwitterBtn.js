import { connectTwitter } from "../../../hooks";
import Link from "next/link";

export default function ConnectTwitterBtn() {
  return (
    <div className="mt-10">
      <Link
        href="https://api.dragoorbz.com/auth/twitter"
        className="flex flex-row items-center border-1 border-blue-500/50 rounded-lg p-3 cursor-pointer hover:bg-blue-500/10"
      >
        <img src="/images/icons/x_icon.svg" alt="twitter" className="w-5 h-5" />
        <div className="ml-4">
          <span className="text-white">Connect X account</span>
        </div>
      </Link>
    </div>
  );
}
