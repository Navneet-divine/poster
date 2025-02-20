import { FaHome } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Navbar from "../Navbar";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

const Footer: React.FC = () => {
  return (
    <>
      <div className="fixed md:hidden bg-white px-4 flex justify-between items-center w-full bottom-0 border h-16 border-dark-100 border-l-0 border-r-0 border-b-0 dark:border-dark-400 dark:bg-dark-600">
        <Navbar
          icon={<FaHome className="text-xl " />}
          name="Home"
          link="/dashboard"
        />
        <Navbar
          icon={<MdPeople className="text-xl " />}
          name="People"
          link="/people"
        />
        <Navbar
          icon={<RiImageAddLine className="text-xl " />}
          name="Create"
          link="/create"
        />
        <Navbar
          icon={<IoBookmarkOutline className="text-xl " />}
          name="Saved"
          link="/saved"
        />
        <Navbar
          icon={<CgProfile className="text-xl" />}
          name="Profile"
          link="/profile"
        />
      </div>
    </>
  );
};

export default Footer;
