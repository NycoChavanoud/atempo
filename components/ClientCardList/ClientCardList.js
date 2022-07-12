import style from "./ClientCardList.module.css";
import ClientCard from "../ClientCard/ClientCard";

export default function ClientCardList({ clientList }) {
  return (
    <div className={style.center}>
      <div className={style.list}>
        {clientList.map((c) => (
          <ClientCard key={c.id} id={c.id} />
        ))}
      </div>
    </div>
  );
}
