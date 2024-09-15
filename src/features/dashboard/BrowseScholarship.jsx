import RepeatParagrah from "../../ui/RepeatParagrah";
import { useNavigate } from 'react-router-dom';

function BrowseScholarship() {
  const navigate = useNavigate(); 
  const handleNavigate = () => {
    navigate('/scholarship');
  };

  return (
    <section className="bg-[#003A65] py-12 min-h-[400px] flex items-center justify-center mx-auto max-w-700">
      <div className="container px-4 text-center">
        <RepeatParagrah>
          <h2 className="text-3xl sm:text-5xl md:text-7xl mb-6 text-center mx-auto max-w-full">
          Men7a scholarships are open!
          </h2>
        </RepeatParagrah>

        <p className="text-white mb-6 text-base sm:text-lg md:text-xl mx-auto max-w-2xl leading-relaxed">
          We provide fully funded scholarships so that you can outpace your peers and return home
          with the skills, knowledge, and network required to influence the change you want to see.
        </p>

        <div className="flex justify-center mb-6 mt-4">
          <button
            onClick={handleNavigate}
            className="inline-block px-6 py-3 bg-white text-[#003a65] font-bold rounded-full shadow-lg transition hover:bg-[#b92a3b] hover:text-white"
            aria-label="Apply"
          >
            BROWSE SCHOLARSHIP
          </button>
        </div>
      </div>
    </section>
  );
}

export default BrowseScholarship;
