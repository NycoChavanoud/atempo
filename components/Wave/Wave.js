import style from "./Wave.module.css";
import Image from "next/image";

export default function Wave() {
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
    </div>
  );
}
