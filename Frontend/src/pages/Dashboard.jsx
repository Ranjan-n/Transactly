import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BalanceCard } from "../components/BalanceCard";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

export function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [isAuthorized, setAuthorization] = useState(false);
  const [user, setUser] = useState("U");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    setLoadingUser(true);

    axios
      .get("http://localhost:3000/api/v1/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.authenticated) {
          setAuthorization(true);
          setUser(response.data.name);
        } else {
          navigate("/signup");
        }
      })
      .catch(() => {
        navigate("/signup");
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (isAuthorized) {
      setLoadingBalance(true);

      axios
        .get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setBalance(response.data.balance);
        })
        .finally(() => {
          setLoadingBalance(false);
        });
    }
  }, [isAuthorized]);

  if (loadingUser || loadingBalance) {
    return <Loader />;
  }

  return (
    <div className="lg:flex lg:justify-center">
      <div className=" lg:w-3/4">
        <AppBar letter={user[0].toUpperCase()} />
        <BalanceCard value={balance} />
        <Users />
      </div>
    </div>
  );
}
