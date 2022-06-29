import style from "./GreyBurger.module.css";
import Image from "next/image";
import Link from "next/link";

export default function GreyBurger() {
  return (
    <div className={style.bg}>
      <div className={style.greyBurger}>
        <Link href="/menu">
          <a>
            <Image
              layout="responsive"
              quality={100}
              height={25}
              width={30}
              src="/images/grey_burger.svg"
              alt="menu burger gris"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
