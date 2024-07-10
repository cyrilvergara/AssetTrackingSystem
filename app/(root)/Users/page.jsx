"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            List of Users
          </h3>
          <p className="text-sm text-muted-foreground">
            here are the list of users added.
          </p>
          {users.map(user => (
            <div key={user._id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
          {/* <Button className="mt-4">Add Users</Button> */}
        </div>
      </div>
    </main>
  );
}