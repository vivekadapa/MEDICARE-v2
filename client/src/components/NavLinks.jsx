import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "/consultdoctor", text: "Consult Doctors" },
  { id: 3, url: "/buymedicines", text: "MediStore" },
  { id: 4, url: "/display-hospitals", text: "Hospitals" },
  { id: 5, url: "/display-announcements", text: "Announcements" },
  { id: 6, url: "/about-us", text: "About" },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === "checkout" || url === "orders") && !user) return null;
        return (
          <li key={id} className="hover:bg-teal-200 rounded-xl">
            <NavLink className="capitalize mx-2" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
