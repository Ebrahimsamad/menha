import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../ui/PrimaryButton';
import RepeatParagrah from '../../ui/RepeatPara';

function HeroBrowseScholarship() {
  const navigate = useNavigate();

  const handelAllScholarshipsBtn = () => {
    navigate(`/scholarships`);
  }
  return (
    <div id="Page-Content-All">
      <header className="text-center mb-7 bg-[#003A65] py-10 lg:py-16">
        <RepeatParagrah>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#b92a3b]">
            Browse Scholarships
          </h1>
        </RepeatParagrah>
        <span className="block text-lg md:text-xl lg:text-2xl font-light mt-4 text-white px-4 md:px-8 lg:px-0">
          Check out these popular scholarship categories and find awards for everyone from artists to engineers!
        </span>
        <div className="mt-6 lg:mt-8 mb-3">
          <PrimaryButton onClick={handelAllScholarshipsBtn}>
            View All Scholarships
          </PrimaryButton>
        </div>

        <img
          src="/undraw_book_lover_mkck.svg"
          alt="Scholarship Search"
          className="w-[150px] md:w-[180px] lg:w-[200px] mb-[-90px] md:mb-[-110px] lg:mb-[-130px] mx-auto block  animate-slide-bottom "
        />
      </header>
    </div>
  );
}

export default HeroBrowseScholarship;
