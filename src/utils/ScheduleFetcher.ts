import { useEffect, useState } from "react";

type Credentials = {
  username: string;
  password: string;
  semester: number;
  langId: number;
};

const ScheduleFetcher = ({
  username,
  password,
  semester,
  langId,
}: Credentials) => {
  console.log(username, password, semester);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);

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
        username,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setSchedule(data))
      .catch((error) => setError(error.message));
  }, [username, password, semester, langId, scheduleURL]);

  return { schedule, error };
};

export default ScheduleFetcher;
