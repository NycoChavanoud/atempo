import style from "./WhiteBurger.module.css";
import Image from "next/image";
import Link from "next/link";

export default function WhiteBurger() {
  return (
    <div className={style.bg}>
      <div className={style.whiteBurger}>
        <Link href="/menu">
          <a>
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
    </div>
  );
}
