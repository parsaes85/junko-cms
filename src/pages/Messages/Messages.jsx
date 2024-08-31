import React, { useEffect, useState } from "react";

import DataTable from "../../components/DataTable/DataTable";
import TableMessageRow from "../../components/TableMessageRow/TableMessageRow";

export default function Messages() {
  const mainUrl = "http://localhost:8000/api";

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = () => {
    fetch(`${mainUrl}/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        console.log(data);
      });
  };

  return (
    <div className="w-[700px] lg:w-full mt-10 overflow-auto">
      <DataTable>
        <thead>
          <tr>
            <th>نام</th>
            <th>ایمیل</th>
            <th>شماره تلفن</th>
            <th>محتوا</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <TableMessageRow key={message.id} {...message} />
          ))}
        </tbody>
      </DataTable>
    </div>
  );
}
