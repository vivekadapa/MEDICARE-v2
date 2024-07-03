import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
import ContactUs from "./ContactUs";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element  ">
          <Outlet />
        </section>
      )}
      <ContactUs />
    </>
  );
};
export default HomeLayout;
