import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { DotLoader } from "react-spinners";

export default function SuccessPage() {
  const { search } = useLocation();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);

  const isBuyPortfolio = queryParams.get("isBuyPortfolio");
  const expBuyPortfolio = queryParams.get("expBuyPortfolio");

  const expDate = expBuyPortfolio ? new Date(expBuyPortfolio) : null;

  const formattedExpDate =
    expDate && !isNaN(expDate.getTime())
      ? expDate.toISOString()
      : "Invalid Date";
  user.isBuyPortfolio = !!isBuyPortfolio;
  user.expBuyPortfolio = formattedExpDate;
  setUser(user);
  setTimeout(() => {
    navigate("/portfolio/form1");
  }, 3000);
  localStorage.setItem("user", JSON.stringify(user));
  return (
    <div className="w-100 h-[60vh] text-3xl flex items-center justify-center">
      <DotLoader color="#B92A3B" size={80} />
    </div>
  );
}
