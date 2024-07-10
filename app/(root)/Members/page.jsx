"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [newMemberFirstName, setNewMemberFirstName] = useState("");
  const [newMemberLastName, setNewMemberLastName] = useState("");
  const [newMemberPosition, setNewMemberPosition] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState(null);

  useEffect(() => {
    fetch("/api/members")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMembers(data.data);
        } else {
          console.error("Failed to fetch members:", data.error);
        }
      })
      .catch((error) => console.error("Failed to fetch members:", error));
  }, []);

  const addMember = () => {
    const newMember = {
      firstName: newMemberFirstName,
      lastName: newMemberLastName,
      position: newMemberPosition,
    };

    if (!newMemberFirstName || !newMemberLastName || !newMemberPosition) {
      alert("First name, last name and position are required");
      return;
    }

    fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Member created successfully") {
          setMembers([...members, newMember]);
          setNewMemberFirstName("");
          setNewMemberLastName("");
          setNewMemberPosition("");
          setIsDialogOpen(false);
        } else {
          console.error("Failed to add member:", data.error);
        }
      })
      .catch((error) => console.error("Failed to add member:", error));
    setIsEditing(false);
  };

  const editMember = (member) => {
    setNewMemberFirstName(member.firstName);
    setNewMemberLastName(member.lastName);
    setNewMemberPosition(member.position);
    setCurrentMemberId(member._id); // Set currentMemberId to the id of the member being edited
    setIsDialogOpen(true);
    setIsEditing(true);
  };

  const saveMember = () => {
    const updatedMember = {
      _id: currentMemberId,
      firstName: newMemberFirstName,
      lastName: newMemberLastName,
      position: newMemberPosition,
    };
  
    if (!newMemberFirstName || !newMemberLastName || !newMemberPosition) {
      alert("First name, last name and position are required");
      return;
    }
  
    fetch('/api/members', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMember)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setMembers(members.map(member => member._id === currentMemberId ? data.data : member));
        setNewMemberFirstName("");
        setNewMemberLastName("");
        setNewMemberPosition("");
        setIsDialogOpen(false);
        setIsEditing(false);
      } else {
        console.error("Failed to update member:", data.error);
      }
    })
    .catch(error => console.error("Failed to update member:", error));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Members</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">Add Member</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
              <DialogDescription>
                Enter the first name, last name and position of the new member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={newMemberFirstName}
                  onChange={(e) => setNewMemberFirstName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={newMemberLastName}
                  onChange={(e) => setNewMemberLastName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  id="position"
                  value={newMemberPosition}
                  onChange={(e) => setNewMemberPosition(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={isEditing ? saveMember : addMember}>
                {isEditing ? "Save Member" : "Add Member"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((member, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{member.firstName}</div>
                </TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => editMember(member)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You have no Members
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
    </main>
  );
}