import bbcLogo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-2 px-5 flex justify-center m-auto shadow-md">
      <img src={bbcLogo} alt="BizzBuzz Creations Logo" width={150} />
    </nav>
  )
}

export default Navbar