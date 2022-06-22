import Link from "next/link";
import React, { useEffect, useState } from "react";
import getClientData from "../../model/client";

export default function ClientCard({ id }) {
  const [clientData, setClientData] = useState();
  console.log(setClientData);

  useEffect(() => {
    getClientData(id).then((data) => setClientData(data));
  }, [id, clientData]);
  if (clientData) {
    return (
      <Link href={`/clients/${id}`}>
        <a></a>
      </Link>
    );
  }
}
