import { useLocation } from "react-router-dom";
import Schedule from "@/components/schedule/Schedule";
import ScheduleFetcher from "@/utils/ScheduleFetcher";
import Error from "@/components/error/Error";
import { hourglass } from "ldrs";

hourglass.register();

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
      {!schedule && !error && (
        <l-hourglass
          size="80"
          bg-opacity="0.1"
          speed="1.75"
          color="orange"
        ></l-hourglass>
      )}
    </>
  );
};

export default SchedulePage;
