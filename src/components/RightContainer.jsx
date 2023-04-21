import Calendar from "./Calendar";

function RightContainer() {
  return (
    <div
      className="hidden xl:block fixed right-0 top-0 w-80 h-full bg-neutral-800"
    >
      <Calendar
        date={new Date}
      />
    </div>
  );
}

export default RightContainer;
