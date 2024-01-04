import React, { useEffect, useState } from "react";
import { MdArchive } from "react-icons/md";
import "./Inbox.css";
import CallItem from "../components/CallItem.jsx";
import { handleGetCalls, handleSignleArchive } from "../services/CallApi.js";
export default function Inbox() {
  const [calls, setCalls] = useState({});
  useEffect(() => {
    getInboxCalls();
  }, []);

  const getInboxCalls = () => {
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

  const handleArchiveAll = () => {
    let temp = [...calls];
    let arr = temp.map((call) => {
      return handleSignleArchive(call.id).catch((error) => console.log(error));
    });
    Promise.all(arr).then(() => setCalls({}));
  };
  return (
    <div className="inbox_container">
      <div className="archive_container" onClick={handleArchiveAll}>
        <MdArchive className="icon" />
        <span>Archive all calls</span>
      </div>
      {calls.length &&
        calls.map((call) => {
          if (call.direction === "inbound" && call.is_archived === false) {
            return (
              <CallItem key={call.id} call={call} getCalls={getInboxCalls} />
            );
          }
        })}
    </div>
  );
}
