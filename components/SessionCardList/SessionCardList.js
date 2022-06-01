import React from "react";
import SessionCard from "../SessionCard/SessionCard";

export default function SessionCardList({ sessionlist }) {
  return (
    <div>
      {sessionlist.map((s) => (
        <SessionCard
          key={s.id}
          name={s.name}
          thematic={s.thematic}
          number={s.number}
        ></SessionCard>
      ))}
    </div>
  );
}
