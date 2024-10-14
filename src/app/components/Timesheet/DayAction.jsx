"use client";

import React, { useContext } from "react";
import { TimeSheetContext } from "./TimeSheetContext";
import Image from "next/image";

function DayAction({
  openModal,
  checkDayAction,
  batchType,
  hasPendingDays,
  hasDaysReset,
  isResetAll,
  hasResettableDays

}) {
  const { weekDays, getStatusForDay } = useContext(TimeSheetContext);

  const handleApprove = (date) => {
    openModal(date, "Confirm Day Approve");
  };

  const handleReject = (date) => {
    openModal(date, "Confirm Day Reject");
  };

  const handleBatchUpdate = (type) => {
    openModal(type, "Batch Action");
  };

  const handleReset = (date) => {
    openModal(date, "Reset Day");
  };

  const handleUndoReset = (date) => {
    openModal(date, "Undo Reset");
  };

  const handleResetAllDays = () => {
    openModal(null, "Confirm Reset All Days"); // You can create a modal for resetting all days
  };

  return (
    <div className="flex font-bold mob:flex-col tablet:flex-col w-full">
      <div className="p-1 border-t flex justify-center items-start desk:min-w-[26rem] desk:max-w-[26rem] lap:min-w-[18rem] lap:max-w-[18rem] mob:bg-pric tablet:bg-pric mob:justify-start tablet:justify-start mob:text-white tablet:text-white mob:p-4 tablet:p-4 desk:invisible lap:invisible">
        Day Action
      </div>
      <div className="flex lap:hidden desk:hidden bg-gray-200">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="flex-1 text-center p-2 border border-gray-200 mob:text-sm tablet:text-sm"
          >
            {day.dayOfWeek}
          </div>
        ))}
      </div>
      <div className="flex flex-1 w-full justify-center">
        {weekDays.map((day, i) => {
          const { status } = getStatusForDay(day.fullDate);
          const { action_status } = checkDayAction(day.fullDate);

          if (status === "Pending") {
            return (
              <div
                key={i}
                className="w-full flex flex-1 flex-col items-center justify-center mb-1 gap-1 p-1"
              >
                <div className="flex items-center">
                  {!batchType &&
                    (action_status === "Rejected" || !action_status) && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleApprove(day.fullDate)}
                      >
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  {!batchType &&
                    (action_status === "Approved" || !action_status) && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleReject(day.fullDate)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    )}
                  {action_status === "Rejected" && !batchType && (
                    <Image
                      height="20"
                      width="20"
                      src="/resources/icons/edit-underlined.svg"
                      className="cursor-pointer"
                      onClick={() => handleReject(day.fullDate)}
                    />
                  )}
                </div>
              </div>
            );
          } else {
            if (status == null) {
              return (
                <div
                  key={i}
                  className="text-center flex-1 flex flex-col justify-start items-center p-1 relative group mob:justify-center tablet:justify-center "
                ></div>
              );
            } else {

              if (!isResetAll) {
                return (
                  <div
                    key={i}
                    className="text-center flex-1 p-1 flex flex-col justify-center items-center mob:justify-center tablet:justify-center min-w-fit"
                  >
                    <button
                      className="bg-gray-300 text-gray-500 py-1 px-2 font-normal  flex-1 border w-[95%]  border-gray-400 text-xs rounded-md"
                      onClick={() => {
                        action_status === "Reset"
                          ? handleUndoReset(day.fullDate)
                          : handleReset(day.fullDate);
                      }}
                    >
                      {action_status === "Reset" ? "Undo" : "Reset"}
                    </button>
                  </div>
                );
              }

            }
          }
        })}
      </div>

      {hasPendingDays ? (
        <div className="text-center text-xs p-1 flex-1 flex items-center justify-center gap-1 desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28">
          {!batchType && (
            <>
              <button
                className="bg-green-400 text-white font-normal p-2 flex items-center justify-center rounded-md hover:bg-green-500 ease duration-300"
                onClick={() => handleBatchUpdate("Approve")}
              >
                <svg
                  className="w-6 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="bg-red-400 text-white font-normal p-2 flex items-center justify-center rounded-md  hover:bg-red-500 ease duration-300"
                onClick={() => handleBatchUpdate("Reject")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>

              </button>
            </>
          )}

          {batchType === "Approve" && (
            <button
              className="bg-red-400 text-white font-normal p-2 flex items-center justify-center rounded-md  hover:bg-red-500 ease duration-300"
              onClick={() => handleBatchUpdate("Reject")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

            </button>
          )}

          {batchType === "Reject" && (
            <button
              className="bg-green-400 text-white font-normal p-2 flex items-center justify-center rounded-md hover:bg-green-500 ease duration-300"
              onClick={() => handleBatchUpdate("Approve")}
            >
              <svg
                className="w-6 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>

            </button>
          )}

          {hasResettableDays && (<button
            className="bg-gray-400 text-white font-normal p-2 flex items-center justify-center rounded-md hover:bg-gray-500 ease duration-300"
            onClick={() => handleResetAllDays()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white" // Adjust the size and color using Tailwind classes
              fill="currentColor"
              viewBox="0 0 1920 1920"
            >
              <path
                d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                fillRule="evenodd"
              />
            </svg>
          </button>
          )}
        </div>
      ) : (
        <div className="text-center flex-1  desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28 flex justify-end">
          {hasResettableDays && (
            <button
              className="bg-gray-400 text-white font-normal p-2 mb-1 mr-1 flex items-center justify-center rounded-md hover:bg-gray-500 ease duration-300"
              onClick={() => handleResetAllDays()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-4 text-white" // Adjust the size and color using Tailwind classes
                fill="currentColor"
                viewBox="0 0 1920 1920"
              >
                <path
                  d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DayAction;
