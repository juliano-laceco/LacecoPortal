function TimeSheetFooter({ weekDays, calculateTotalHours, calculateTotalWeekHours }) {
    return (
        <div className="flex bg-gray-100 font-bold bg-gray-300 mob:flex-col tablet:flex-col w-full">
            <div className="p-4 border-t desk:min-w-44 desk:max-w-44 lap:min-w-36 lap:max-w-36 mob:hidden tablet:hidden">Total (hrs)</div>
            <div className="p-4 border-t desk:min-w-44 desk:max-w-44 lap:min-w-36 lap:max-w-36 mob:hidden tablet:hidden"></div>
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
