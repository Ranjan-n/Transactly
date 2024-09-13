import { AppBar } from "../components/AppBar";
import { BalanceCard } from "../components/BalanceCard";
import { Users } from "../components/Users";
export function Dashboard() {
  return (
    <>
      <AppBar></AppBar>
      <BalanceCard value={1000000}></BalanceCard>
      <Users></Users>
    </>
  );
}
