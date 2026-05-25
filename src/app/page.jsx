// src/app/page.jsx
import Banner from "./components/Banner";
import AvailableTutors from "./components/AvailableTutors";
import WhyChooseUs from "./components/WhyChooseUs";
import HowItWorks from "./components/Work";

export const metadata = {
  title: "Home | MediQueue",
};
export default function HomePage() {
  return (
    <div>
      <Banner />
      <AvailableTutors />
      <WhyChooseUs />
      <HowItWorks />
    </div>
  );
}
