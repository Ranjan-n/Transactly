import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BalanceCard } from "../components/BalanceCard";
import { Users } from "../components/Users";
import axios from "axios";
export function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      });
  });

  return (
    <>
      <AppBar></AppBar>
      <BalanceCard value={balance}></BalanceCard>
      <Users></Users>
    </>
  );
}
