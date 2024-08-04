import { useEffect, useState } from "react";

type Credentials = {
  username: string;
  password: string;
  semester: string;
};

const ScheduleFetcher = ({ username, password, semester }: Credentials) => {
  console.log(username, password, semester);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  const scheduleUrl = `/api/student/schedule/studentSchedule/${semester}`;
  const generalUrl = `/api/common/commonServies/changeLanguage/0`;

  useEffect(() => {
    setSchedule([]);
    setError(null);

    const base64Credentials = btoa(`${username}:${password}`);
    const headers = {
      Authorization: `Basic ${base64Credentials}`,
      "Cache-Control": "no-cache",
      Connection: "close",
    };

    // Fetch general data with credentials
    fetch(generalUrl, {
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((generalData) => {
        console.log("General data:", generalData);
      })
      .catch((error) => {
        console.error("Error Logging in:", error);
        setError(error.message);
      });

    // Fetch schedule data with credentials
    fetch(scheduleUrl, {
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((scheduleData) => {
        console.log("Schedule data:", scheduleData);
        setSchedule(scheduleData);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
        setError(error.message);
      });
  }, [username, password, semester]);

  return { schedule, error };
};

export default ScheduleFetcher;
