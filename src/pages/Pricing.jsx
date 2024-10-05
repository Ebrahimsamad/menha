import React from 'react';
import PrimaryButton from '../ui/PrimaryButton';

const Pricing = () => {
  const pricingPlans = [
    {
      title: '1 Month Plan',
      price: '$0',
      features: ['Access All Scholarships', '1 Certificate', 'Get Similarity Percentages for Each Match'],
      buttonLabel: 'Apply Now',
      color: 'bg-gradient-to-br from-[#002b4c] to-[#005f7c]',
      icon: '🎓',
    },
    {
      title: '3 Month Plan',
      price: '$10',
      features: ['Access All Scholarships', '3 Certificates', 'Get Similarity Percentages for Each Match', 'Get Email Notifications with Similarity Percentages'],
      buttonLabel: 'Apply Now',
      color: 'bg-gradient-to-br from-[#B92A3B] to-[#FF5F6D]',
      icon: '🎯',
    },
    {
      title: '6-Month Plan',
      price: '$15',
      originalPrice: '$20',
      features: ['Access To Scholarships', '6 Certificates', 'Get Similarity Percentages for Each Match'],
      buttonLabel: 'Apply Now',
      color: 'bg-gradient-to-br from-[#002b4c] to-[#005f7c]',
      icon: '🚀',
      specialOffer: true,
    },
  ];

  return (
    <div className="flex flex-col items-center py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-gray-50 to-gray-200">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 lg:mb-10 text-blue-700 tracking-wide">
        Scholarship Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="max-w-xs flex flex-col h-full justify-between rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out bg-white mx-auto relative"
          >
            {plan.specialOffer && (
              <div className="absolute top-2 right-2 bg-[#B92A3B] text-black text-xs font-bold px-2 py-1 rounded-full">
                Special Offer
              </div>
            )}

            <div className={`p-4 sm:p-6 text-center rounded-t-xl ${plan.color} text-white`}>
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3">{plan.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold">{plan.title}</h3>
              <p className="text-base sm:text-lg font-semibold mt-2">
                {plan.price}
                {plan.originalPrice && (
                  <span className="text-sm sm:text-base font-normal line-through text-red-300 ml-2 relative">
                    {plan.originalPrice}
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-red-400 transform -translate-y-2"></span>
                  </span>
                )}
              </p>
              {plan.specialOffer }
            </div>
            <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
              <ul className="mb-4 space-y-1 sm:space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-600 text-sm sm:text-base flex items-center">
                    <span className="mr-2 text-green-500">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto text-center">
                <PrimaryButton>
                  {plan.buttonLabel}
                </PrimaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
