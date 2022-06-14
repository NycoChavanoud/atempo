import style from "./WaveWhiteBurger.module.css";
import Image from "next/image";
import Link from "next/link";

export default function WaveWhiteBurger() {
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
        <div className={style.whiteBurger}>
          <Image
            layout="responsive"
            quality={100}
            height={25}
            width={30}
            src="/images/grey_burger.svg"
            alt="menu burger blanc"
          />
        </div>
      </Link>
    </div>
  );
}
