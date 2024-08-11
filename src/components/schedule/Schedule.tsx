import { useLocation } from "react-router-dom";
import gdsc from "@/assets/gdsc.png";
import ScheduleFetcher from "@/utils/ScheduleFetcher";
import Loader from "@/components/loader/Loader";
import Error from "../error/Error";

type Credentials = {
  id: string;
  password: string;
};

const Schedule = () => {
  const location = useLocation();
  const { id, password }: Credentials = location.state || {};
  const semester = 20241;
  const langId = 0;

  const colorPalette = [
    "#8B4513", // Saddle Brown
    "#6B8E23", // Olive Drab
    "#708090", // Slate Gray
    "#FFD700", // Gold
    "#FF8C00", // Dark Orange
    "#9370DB", // Purple
    "#00CED1", // Dark Turquoise
    "#F0E68C", // Khaki
    "#DA70D6", // Orchid
    "#87CEEB", // Sky Blue
    "#FF69B4", // Hot Pink
    "#8FBC8F", // Dark Sea Green
    "#EE82EE", // Violet
    "#1E90FF", // Dodger Blue
    "#FFB6C1", // Light Pink
    "#7B68EE", // Medium Slate Blue
    "#00FA9A", // Spring Green
    "#ADD8E6", // Light Blue
    "#FF6347", // Tomato
    "#4B0082", // Indigo
  ];

  const colorPool = [...colorPalette];

  const getUniqueColor = () => {
    if (colorPool.length === 0) {
      //TODO: render this properly, no component is showing when there is an error
      <Error message="No more colors available" />;
    }

    const randomIndex = Math.floor(Math.random() * colorPool.length);
    const color = colorPool.splice(randomIndex, 1)[0];

    return color;
  };

  const left = new Map([
    ["U", "6.69"],
    ["M", "10.965"],
    ["T", "15.24"],
    ["W", "19.537"],
    ["TH", "23.81"],
  ]);

  const { schedule, error } = ScheduleFetcher({
    id,
    password,
    semester,
    langId,
  });

  if (error) {
    return <Error message={error} />;
  }

  if (!schedule || schedule.length === 0) {
    return <Loader />;
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const hours = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

  const courseColorMap = new Map();

  const getCourseColor = (courseCode: string) => {
    if (!courseColorMap.has(courseCode)) {
      const color = getUniqueColor();
      courseColorMap.set(courseCode, color);
    }
    return courseColorMap.get(courseCode);
  };

  const getFiveMinuteIntervals = (startTime: string, endTime: string) => {
    const { hour: startHour, minute: startMinute } =
      parseTimeToNumber(startTime);
    const { hour: endHour, minute: endMinute } = parseTimeToNumber(endTime);

    let hourDifference =
      endHour >= startHour ? endHour - startHour : 12 - startHour + endHour;
    let minuteDifference =
      endMinute >= startMinute
        ? endMinute - startMinute
        : startMinute - endMinute;

    if (startMinute > endMinute) {
      hourDifference -= 1;
      minuteDifference = 60 - minuteDifference;
    }

    console.log(hourDifference, minuteDifference);
    console.log(
      `Five minute Interval: ${hourDifference * 12 + minuteDifference / 5}`
    );

    return hourDifference * 12 + minuteDifference / 5;
  };

  const parseTimeToNumber = (time: string) => {
    const [hourString, minuteString] = time.split(" ")[0].split(":");
    const hour = parseInt(hourString);
    const minute = parseInt(minuteString);

    return { hour, minute };
  };

  return (
    <div className="flex flex-col w-full max-w-[23.8125cm] border mx-auto my-0 p-[0.529167cm] rounded-[5px] border-solid border-[#ccc]">
      <div
        className="flex flex-row justify-between mb-[0.264583cm]"
        id="cal-headers"
      >
        <div className="flex-[0.2] border text-center bg-[#f0f0f0] leading-[1.2964583cm] p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] flex items-center">
          <img src={gdsc} alt="Logo" width="30" height="30" />
        </div>
        {days.map((day) => (
          <div
            key={day}
            className="flex-1 border p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] bg-[#f0f0f0] font-[bold] text-center flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-[0.2] border text-center bg-[#f0f0f0] leading-[1.2964583cm] p-[0.264583cm] rounded-[5px] border-solid border-[#ccc]">
          {hours.map((hour) => (
            <p key={hour}>{hour}</p>
          ))}
        </div>

        {days.map((day) => (
          <div
            className="flex-1 border p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] h-[13.626041667cm]"
            key={day}
            id={day}
          ></div>
        ))}
      </div>

      {schedule.map(({ courseCode, timeTable }, courseIndex) => {
        const color = getCourseColor(courseCode);
        return timeTable.map(({ day, room, time }, timeIndex) => {
          const daysArray = day.trim().split(" ");
          return daysArray.map((courseDay, dayIndex) => {
            const leftPosition = left.get(courseDay.trim());
            const [startHour, endHour] = time.trim().split(" - ");
            const startHourIndex = hours.indexOf(
              parseInt(startHour.split(" ")[0])
            );
            console.log(`${courseCode}: `);
            getFiveMinuteIntervals(startHour, endHour);
            const topPosition = startHourIndex >= 0 ? startHourIndex * 2 : 0;

            return (
              <div
                key={`${courseIndex}-${timeIndex}-${dayIndex}`}
                className={`absolute flex items-center justify-between flex-col h-[1.905cm] w-[4.23cm] rounded-[15px] text-xs font-semibold text-white`}
                style={{
                  backgroundColor: color,
                  left: `${leftPosition}cm`,
                  top: `${topPosition}cm`,
                }}
              >
                <p>{startHour}</p>
                <div>
                  <p>{courseCode}</p>
                  <p className="text-center">{room}</p>
                </div>
                <p className="text-center">{endHour}</p>
              </div>
            );
          });
        });
      })}
    </div>
  );
};

export default Schedule;
