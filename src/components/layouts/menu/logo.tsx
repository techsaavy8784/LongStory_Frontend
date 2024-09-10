import Image from "next/image";
import Link from "next/link";

export default function Logo({ small }: { small: boolean }) {
  return (
    <Link href={"/"}>
      <Image
        src={`/assets/images/logo.svg`}
        alt="logo"
        width={small ? 64 : 125.11}
        height={small ? 72 : 128}
      />
    </Link>
  );
}
