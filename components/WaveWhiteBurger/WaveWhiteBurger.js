import style from "./WaveWhiteBurger.module.css";
import Image from "next/image";
import Link from "next/link";

export default function WaveWhiteBurger() {
  return (
    <div className={style.bg}>
      <Image
        layout="responsive"
        priority
        quality={100}
        height={6}
        width={15}
        src="/images/header.jpg"
        alt="vagues violettes"
      />
      <Link href="/menu">
        <a className={style.whiteBurger}>
          <Image
            layout="responsive"
            quality={100}
            height={25}
            width={30}
            src="/images/grey_burger.svg"
            alt="menu burger blanc"
          />
        </a>
      </Link>
    </div>
  );
}
