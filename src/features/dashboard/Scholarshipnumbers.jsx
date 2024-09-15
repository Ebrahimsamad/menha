import React from 'react';

export default function Scholarshipnumbers() {
  return (
    <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-snug font-brush text-[#8A690F] mb-6 sm:mb-10">
        Menha's impact on society
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-4xl sm:text-6xl text-red-600 font-bold">1364</h3>
          <p className="mt-2 sm:mt-4 text-gray-600 max-w-xs">
            Menha Scholars have taken over one thousand hours out of their
            intense academic schedules to volunteer for organisations .
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="text-4xl sm:text-6xl text-red-600 font-bold">160+</h3>
          <p className="mt-2 sm:mt-4 text-gray-600 max-w-xs">
            Menha brings together leaders from 160+ countries and
            territories, creating networks, friendships, and shared memories and
            missions that span the world.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <h3 className="text-4xl sm:text-6xl text-red-600 font-bold">20</h3>
          <p className="mt-2 sm:mt-4 text-gray-600 max-w-xs">
            Menha's over 60,000-strong alumni network includes 20 current or
            former heads of state or government. Menha Alumni excel in a
            variety of fields outside of politics too.
          </p>
        </div>
      </div>
    </div>
  );
}
