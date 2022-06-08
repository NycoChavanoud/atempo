import style from "./Shape.module.css";
import Image from "next/image";

export default function Shape() {
  return (
    <div className={style.shape}>
      <Image
        layout="responsive"
        qua
        height={10}
        width={10}
        src="/images/white_background.png"
        alt="fond blanc"
      />
    </div>
  );
}
