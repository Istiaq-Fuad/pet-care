import ContentBlock from "../components/content-block";
import DashboardHeader from "../components/dashboard-header";
import PetDetails from "../components/pet-details";
import PetList from "../components/pet-list";

function Dashboard() {
  return (
    <div>
      <DashboardHeader />

      <section className="grid grid-rows-[45px_1fr_1fr] grid-cols-1 md:grid-rows-[45px_1fr] md:grid-cols-3 mt-5 min-h-[65vh] gap-4">
        <form className="w-full h-full row-start-1 row-span-1 col-start-1 col-span-1">
          <input
            type="text"
            className="w-full h-full rounded-md bg-white/20 outline-none p-3"
          />
        </form>
        <div className="row-start-2 row-span-1 col-start-1 col-span-1">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className="row-start-3 md:row-start-1 row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
