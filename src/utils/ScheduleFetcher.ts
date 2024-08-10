import { useEffect, useState } from "react";

type RequestData = {
  id: string;
  password: string;
  semester: number;
  langId: number;
};

type TimeTable = {
  day: string;
  room: string;
  time: string;
};

type Course = {
  courseCode: string;
  courseDeleted: boolean;
  timeTable: Array<TimeTable>;
};

const ScheduleFetcher = ({ id, password, semester, langId }: RequestData) => {
  console.log(id, password, semester);
  const [schedule, setSchedule] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const scheduleURL = `http://localhost:8080/yu/ramadan/schedule/${semester}?langId=${langId}`;

  useEffect(() => {
    setSchedule([]);
    setError(null);

    fetch(scheduleURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Course[]) => setSchedule(data))
      .catch((error) => setError(error.message));
  }, [id, password, semester, langId, scheduleURL]);

  return { schedule, error };
};

export default ScheduleFetcher;
