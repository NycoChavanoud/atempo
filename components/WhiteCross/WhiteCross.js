import style from "./WhiteCross.module.css";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

export default function WhiteCross() {
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
          onClick={() => Router.back()}
          className={style.cross}
          src="/images/X.png"
          alt="croix fermante blanche"
        />
      </Link>
    </div>
  );
}
