import style from "./WhiteBurger.module.css";
import Image from "next/image";
import Link from "next/link";

export default function WhiteBurger() {
  return (
    <div className={style.bg}>
      <Image
        layout="responsive"
        quality={100}
        height={6}
        width={15}
        src="/images/header.png"
        alt="vagues violettes"
      />

      <Link href="/menu">
        <img
          className={style.whiteBurger}
          src="/images/grey_burger.svg"
          alt="menu burger blanc"
        />
      </Link>
    </div>
  );
}
