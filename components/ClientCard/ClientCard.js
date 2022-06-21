import Link from "next/link";
import React, { useEffect, useState } from "react";
import getClientData from "../../model/client";

export default function ClientCard({ clientId }) {
  const [clientData, setClientData] = useState();
  console.log(setClientData);

  useEffect(() => {
    getClientData(clientId).then((data) => setClientData(data));
  }, [clientId, clientData]);
  if (clientData) {
    return (
      <Link href={`/clients/${clientId}`}>
        <a></a>
      </Link>
    );
  }
}
