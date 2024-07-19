import React, { useMemo } from 'react';

const Header = ({ headerDates, numCols, colors }) => {
  const getColorForMonth = (date) => {
    const month = new Date(date).getMonth(); // Get month index (0-11)
    return colors[month];
  };

  const headerCols =  [
    <div
      key="action"
      className="border border-gray-300 flex justify-center w-16 items-center p-1 box-border bg-gray-300 text-gray-700 font-bold"
      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
    >
      Action
    </div>,
    <div key="discipline-header" className="border border-gray-300 p-1 flex justify-center items-center bg-gray-200  text-gray-800 font-semibold w-[130pt]">
      Discipline
    </div>,
    <div key="user-header" className="border border-gray-300 p-1 flex justify-center items-center bg-gray-200 text-gray-800 font-semibold w-[130pt]">
      User
    </div>,
    <div key="grade-header" className="border border-gray-300 p-1 flex justify-center items-center bg-gray-200  text-gray-800 font-semibold w-24">
      Grade
    </div>,
    <div key="bh-header" className="border border-gray-300 p-1 flex justify-center items-center bg-gray-200  text-gray-800 font-semibold w-24">
      Budget Hours
    </div>,
    ...headerDates.map((date, index) => (
      <div
        key={`header-${index}`}
        className="border border-gray-300 flex justify-center items-center px-1 w-12 py-4 box-border font-semibold"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', backgroundColor: getColorForMonth(date) }}
      >
        {date}
      </div>
    ))
  ]

  return (
    <div key="header" className="grid select-none rounded-tr-lg rounded-tl-lg overflow-hidden text-gray-800" style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
      {headerCols}
    </div>
  );
};

export default React.memo(Header);
