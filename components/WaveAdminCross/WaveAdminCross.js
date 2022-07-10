import style from "./WaveAdminCross.module.css";
import Image from "next/image";
import Router from "next/router";

export default function WaveAdminCross() {
  return (
    <div className={style.bg}>
      <Image
        layout="responsive"
        priority
        quality={100}
        height={6}
        width={15}
        src="/images/headerAdmin.png"
        alt="vagues rose"
      />
      <div onClick={() => Router.back()} className={style.cross}>
        <Image
          layout="responsive"
          quality={100}
          height={30}
          width={30}
          src="/images/X.png"
          alt="croix blanche"
        />
      </div>
    </div>
  );
}
