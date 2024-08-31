import React, { useState } from "react";

import DataTable from "../../components/DataTable/DataTable";
import TableUserRow from "../../components/TableUserRow/TableUserRow";
import AddNewUserForm from "../../components/AddNewUserForm/AddNewUserForm";
import useGetUsers from "../../hooks/useGetUsers";

export default function Users() {
  const { data: users } = useGetUsers();

  const [flag, setFlag] = useState(false);

  return (
    <>
      <AddNewUserForm />

      <div className="w-[700px] lg:w-full overflow-auto">
        <DataTable>
          <thead>
            <tr>
              <th>نام</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>شماره تلفن</th>
              <th>نقش</th>
              <th>اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <TableUserRow
                {...user}
                key={user.id}
                flag={flag}
                setFlag={setFlag}
              />
            ))}
          </tbody>
        </DataTable>
      </div>
    </>
  );
}
