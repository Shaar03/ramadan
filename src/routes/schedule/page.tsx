import { useLocation } from "react-router-dom";
import Schedule from "@/components/schedule/Schedule";
import ScheduleFetcher from "@/utils/ScheduleFetcher";
import Error from "@/components/error/Error";

type Credentials = {
  id: string;
  password: string;
};

const SchedulePage = () => {
  const location = useLocation();
  const { id, password }: Credentials = location.state || {};
  const semester = 20241;
  const langId = 0;

  const { schedule, error } = ScheduleFetcher({
    id,
    password,
    semester,
    langId,
  });

  return (
    <>
      {error && <Error message={error} />}
      {schedule && <Schedule />}
      {!schedule && !error && <div>Loading...</div>}
    </>
  );
};

export default SchedulePage;
