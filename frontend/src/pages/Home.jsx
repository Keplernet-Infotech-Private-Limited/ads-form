import InfoBBC from "../components/InfoBBC"
import LeadsForm from "../components/LeadsForm"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <>
      <div className="bg-slate-50 h-screen">
        <Navbar />
        <div className="flex md:flex-nowrap flex-wrap justify-center gap-10 container p-2">
          <LeadsForm />
          <InfoBBC />
        </div>
      </div>
    </>
  )
}

export default Home