import Afternavbar from "../features/dashboard/Afternavbar";
import BrowseScholarship from "../features/dashboard/BrowseScholarship";
import LatestScholarships from "../features/dashboard/LatestScholarships";
import Scholarshipnumbers from "../features/dashboard/Scholarshipnumbers";
import Search from "../features/dashboard/Search";

function Dashboard() {
  return (<>
    <Afternavbar/>
    <LatestScholarships/>
    <Search/>
    <BrowseScholarship/>
    <Scholarshipnumbers/>
  </>)
}

export default Dashboard;
