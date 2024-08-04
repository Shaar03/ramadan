import gdsc from "@/assets/gdsc.png";

import ScheduleFetcher from "@/utils/ScheduleFetcher";

const Schedule = () => {
  const username = "202111154";
  const password = "2204017236";
  const semester = "20232";

  const { schedule, error } = ScheduleFetcher({ username, password, semester });

  if (error) {
    return <div>{error}</div>;
  }

  if (!schedule || schedule.length === 0) {
    return <div>Loading...</div>;
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const times = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

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
          {times.map((hour) => (
            <p key={hour}>{hour}</p>
          ))}
        </div>
        <div
          className="flex-1 border p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] h-[13.626041667cm]"
          id="sunday"
        >
          <div className="absolute flex items-center justify-center flex-col h-[1.905cm] w-[4.23cm] rounded-[15px] left-[6.693958cm] top-[5.68854167cm] print:h-[1.905cm] print:w-[4.23cm] print:left-[2.96cm] print:top-[5.68854167cm] bg-lime-300">
            <div>SWE 322</div>
            <div>10:00am - 11:10am</div>
          </div>
        </div>
        <div
          className="flex-1 border p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] h-[13.626041667cm]"
          id="monday"
        ></div>
        <div
          className="flex-1 border p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] h-[13.626041667cm]"
          id="tuesday"
        ></div>
        <div
          className="flex-1 border p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] h-[13.626041667cm]"
          id="wednesday"
        ></div>
        <div
          className="flex-1 border p-[0.264583cm] rounded-[5px] border-solid border-[#ccc] h-[13.626041667cm]"
          id="thursday"
        ></div>
      </div>
      {schedule.map((course, index) => (
        <p key={index}>{course["courseCode"]}</p>
      ))}
    </div>
  );
};

export default Schedule;
