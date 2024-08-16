import Image from "next/image";
import timer from "../public/timer.png";
const loading = () => {
  return (
    <div className="flex flex-col min-h-[100vh] justify-center items-center">
      <Image src={timer} alt="loading" className=" w-12 h-12 animate-spin " />
    </div>
  );
};
export default loading;
