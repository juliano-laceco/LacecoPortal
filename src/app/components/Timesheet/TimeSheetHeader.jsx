function TimeSheetHeader({ weekDays }) {
    return (
        <div className="timesheet-table-header border-b flex font-semibold bg-gray-300 mob:hidden tablet:hidden bg-red-500 text-white">
            <div className="p-2  flex justify-center items-center desk:min-w-44 desk:max-w-44 lap:min-w-36 lap:max-w-36">Project</div>
            <div className="p-2  flex justify-center items-center desk:min-w-44 desk:max-w-44 lap:min-w-36 lap:max-w-36">Phase</div>
            {weekDays.map((day, i) => (
                <div key={i} className="text-center p-2 flex justify-center items-center flex-1">
                    {day.dayOfWeek}
                </div>
            ))}
            <div className="text-center p-2 border-b flex justify-center items-center desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28">Total (hrs)</div>
        </div>
    );
}

export default TimeSheetHeader;
