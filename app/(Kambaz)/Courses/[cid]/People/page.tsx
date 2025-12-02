"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page";
import * as client from "../../../Courses/client";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const data = await client.findUsersForCourse(cid.toString());
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
