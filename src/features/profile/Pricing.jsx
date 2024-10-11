import React, { useContext, useState } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import RepeatParagrah from "../../ui/RepeatPara";
import { buyPortfolio, freePlan } from "../../services/Portfolio";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

export default function Pricing() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState("");
  const pricingPlans = [
    {
      title: "1 Month",
      price: "5",
      features: [
        "Access All Scholarships",
        "Get Similarity Percentages for Each Match",
      ],
      buttonLabel: "Apply Now",
      color: "bg-[#003a65]",
      icon: "🎓",
    },
    {
      title: "3 Month",
      price: "10",
      features: [
        "Access All Scholarships",
        "Get Similarity Percentages for Each Match",
        "Get Email Notifications with Similarity Percentages",
      ],
      buttonLabel: "Apply Now",
      color: "bg-[#003a65]",
      icon: "🎯",
    },
    {
      title: "6 Month",
      price: "15",
      originalPrice: "20",
      features: [
        "Access All Scholarships",
        "Get Similarity Percentages for Each Match",
        "Get Email Notifications with Similarity Percentages",
      ],
      buttonLabel: "Apply Now",
      color: "bg-[#003a65]",
      icon: "🚀",
      specialOffer: "Spical Offer",
    },
  ];
  if (!user.isGetFreePlan) {
    pricingPlans[0].price = "0";
    pricingPlans[0].originalPrice = "5";
    pricingPlans[0].buttonLabel = "Get Free Plan";
    pricingPlans[0].specialOffer = "Free";
    pricingPlans[0].features.push("One Month Free");
  }
  const handelApplyButton = async (title, planData) => {
    setLoading(title);
    try {
      const massage = await buyPortfolio(planData.date, planData.price);
      location.href = massage.url;
    } catch (error) {
      console.log(error.massage);
    } finally {
      setLoading("");
    }
  };
  const handelGetFreePlan = async (title) => {
    setLoading(title);
    try {
      const res = freePlan();
      toast.promise(res, {
        loading: "Buying...",
        success: "PBuy Free Plan successfully!",
        error: (error) => error.message,
      });
      const message = await res;
      localStorage.setItem("user", JSON.stringify(message.newUser));
      setUser(message.newUser);
      navigate("/portfolio/form1");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading("");
    }
  };
  return (
    <div className="flex flex-col items-center py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-gray-50 to-gray-200">
      <RepeatParagrah>
        <h2 className="text-4xl  lg:text-5xl  mb-6 sm:mb-8 lg:mb-10 ">
          Scholarship Plans
        </h2>
      </RepeatParagrah>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="max-w-xs flex flex-col h-full justify-between rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out bg-white mx-auto relative"
          >
            {plan.specialOffer && (
              <div className="absolute top-2 right-2 bg-[#B92A3B] text-white text-md font-bold px-2 py-1 rounded-full">
                {plan.specialOffer}
              </div>
            )}

            <div
              className={`p-4 sm:p-6 text-center rounded-t-xl ${plan.color} text-white`}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3">
                {plan.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                {plan.title} Plan
              </h3>
              <p className="text-base sm:text-lg font-semibold mt-2">
                ${plan.price}
                {plan.originalPrice && (
                  <span className="text-sm sm:text-base font-normal line-through text-red-300 ml-2 relative">
                    ${plan.originalPrice}
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-red-400 transform -translate-y-2"></span>
                  </span>
                )}
              </p>
            </div>
            <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
              <ul className="mb-4 space-y-1 sm:space-y-2">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-gray-600 text-sm sm:text-base flex items-center"
                  >
                    <span className="mr-2 text-red-900">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto text-center">
                {loading === plan.title ? (
                  <PrimaryButton>
                    <div className="flex items-center">
                      <Spinner color="blue-900" />
                      <span className="ms-2">Buying ...</span>
                    </div>
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    onClick={() => {
                      if (
                        plan.title === "1 Month" &&
                        user.isGetFreePlan == false
                      )
                        handelGetFreePlan(plan.title);
                      else {
                        handelApplyButton(plan.title, {
                          date: plan.title,
                          price: plan.price,
                        });
                      }
                    }}
                  >
                    {plan.buttonLabel}
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
