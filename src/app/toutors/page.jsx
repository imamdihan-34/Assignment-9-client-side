

import AvailableTutors from "../components/AvailableTutors";
export const metadata = {
  title: "Tutors | MediQueue",
};
export default function TutorsPage() {
  return (
    <div>
      <AvailableTutors showAll={true} />
    </div>
  );
 
}