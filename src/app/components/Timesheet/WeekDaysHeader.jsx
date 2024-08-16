function WeekDaysHeader({ phase_name, weekDays }) {
    return (
        <div className="date-header flex border-b border-gray-300">
            <div className="flex flex-1 justify-between items-center">
                <p className="text-gray-500 w-[300px] px-4 flex justify-center items-center">{phase_name}</p>
                <div className="week-days flex items-center">
                    {weekDays.map((day, index) => (
                        <div key={index} className="text-center p-2 w-16">
                            <p className="text-gray-600">{day.day}</p>
                            <p className="text-gray-400">{day.dayOfWeek}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeekDaysHeader;
