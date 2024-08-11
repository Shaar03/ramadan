import { hourglass } from "ldrs";

hourglass.register();

const loader = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <l-hourglass
        size="80"
        bg-opacity="0.1"
        speed="1.75"
        color="orange"
      ></l-hourglass>
    </div>
  );
};

export default loader;
