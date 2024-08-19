function DevelopmentSection({ weekDays }) {
    return (
        <div className="flex bg-gray-50">
            <div className="p-4 border-b min-w-44 max-w-44">Development</div>
            <div className="p-4 border min-w-44 max-w-44">
                <select className="w-full border border-gray-300 rounded p-2">
                    <option>Proposals</option>
                    <option>Training/Coaching</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            {weekDays.map((day, i) => (
                <div className="text-center p-4 flex-1 border" key={i}>
                    <input
                        className="arrowless-input text-center w-full border-0 focus:border focus:border-pric focus:ring-0"
                        type="number"
                        min="0"
                        max="24"
                        data-date={day.fullDate}
                    />
                </div>
            ))}
            <div className="text-center p-4 border-b flex-1 font-bold min-w-32 max-w-32">0</div>
        </div>
    );
}

export default DevelopmentSection;
