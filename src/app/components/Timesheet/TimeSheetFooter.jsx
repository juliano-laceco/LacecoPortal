function TimeSheetFooter({ weekDays, calculateTotalHours, calculateTotalWeekHours }) {
    return (
        <div className="flex bg-gray-100 font-bold bg-gray-300 mob:flex-col tablet:flex-col w-full desk:bg-gray-400 lap:bg-gray-400 desk:text-white lap:text-white">
             <div className="p-4 border-t flex justify-center items-center desk:min-w-[22rem] desk:max-w-[22rem] lap:min-w-[18rem] lap:max-w-[18rem] mob:bg-pric tablet:bg-pric mob:justify-start tablet:justify-start mob:text-white tablet:text-white">
                Total Hours
            </div>

            <div className="flex lap:hidden desk:hidden bg-gray-200">
                {weekDays.map((day, i) => {
                    return (
                        <div key={i} className="flex-1 text-center p-2 border border-gray-200 mob:text-sm tablet:text-sm">
                            {day.dayOfWeek}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-1 w-full">
                {weekDays.map((day, i) => (
                    <div key={i} className="text-center p-4 border-t flex-1">
                        {calculateTotalHours(day.fullDate)}
                    </div>
                ))}
            </div>
            <div className="text-center p-4 border-t flex-1 desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28">
                {calculateTotalWeekHours()}
            </div>
        </div>
    );
}

export default TimeSheetFooter;
