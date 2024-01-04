import React, { useEffect, useState } from "react";
import { MdUnarchive } from "react-icons/md";
import CallItem from "../components/CallItem.jsx";
import "./Inbox.css";
import { handleAllUnarchive, handleGetCalls } from "../services/CallApi.js";
export default function Archived() {
  const [calls, setCalls] = useState([]);
  useEffect(() => {
    getArchivedCalls();
  }, []);

  const getArchivedCalls = () => {
    handleGetCalls()
      .then((allcalls) => {
        let temp = [...allcalls];
        temp.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          // Compare dates in descending order
          return dateB - dateA;
        });
        return temp;
      })
      .then((temp) => {
        setCalls(temp);
      })
      .catch((error) => console.log(error));
  };

  const handleUnrchiveAll = () => {
    handleAllUnarchive()
      .then(() => getArchivedCalls())
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div>
        <div className="archive_container" onClick={handleUnrchiveAll}>
          <MdUnarchive className="icon" />
          <span>Unarchive all calls</span>
        </div>
        {calls &&
          calls.length > 0 &&
          calls.map((call) => {
            if (call.call_type && call.direction && call.is_archived) {
              return (
                <CallItem
                  key={call.id}
                  call={call}
                  getCalls={getArchivedCalls}
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
