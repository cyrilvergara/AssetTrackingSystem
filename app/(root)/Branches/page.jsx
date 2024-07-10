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

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchDescription, setNewBranchDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBranchId, setCurrentBranchId] = useState(null);

  useEffect(() => {
    fetch("/api/branches")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBranches(data.data);
        } else {
          console.error("Failed to fetch branches:", data.error);
        }
      })
      .catch((error) => console.error("Failed to fetch branches:", error));
  }, []);

  const addBranch = () => {
    const newBranch = {
      name: newBranchName,
      description: newBranchDescription,
    };

    if (!newBranchName || !newBranchDescription) {
      alert("Both name and description are required");
      return;
    }

    fetch("/api/branches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBranch),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Branch created successfully") {
          setBranches([...branches, newBranch]);
          setNewBranchName("");
          setNewBranchDescription("");
          setIsDialogOpen(false);
        } else {
          console.error("Failed to add branch:", data.error);
        }
      })
      .catch((error) => console.error("Failed to add branch:", error));
    setIsEditing(false);
  };

  const editBranch = (branch) => {
    setNewBranchName(branch.name);
    setNewBranchDescription(branch.description);
    setCurrentBranchId(branch._id); // Set currentBranchId to the id of the branch being edited
    setIsDialogOpen(true);
    setIsEditing(true);
  };

  const saveBranch = () => {
    const updatedBranch = {
      _id: currentBranchId,
      name: newBranchName,
      description: newBranchDescription
    };

    if (!newBranchName || !newBranchDescription) {
      alert("Both name and description are required");
      return;
    }
  
    fetch('/api/branches', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBranch)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setBranches(branches.map(branch => branch._id === currentBranchId ? data.data : branch));
        setNewBranchName("");
        setNewBranchDescription("");
        setIsDialogOpen(false);
        setIsEditing(false);
      } else {
        console.error("Failed to update branch:", data.error);
      }
    })
    .catch(error => console.error("Failed to update branch:", error));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Branches</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">Add Branch</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Branch</DialogTitle>
              <DialogDescription>
                Enter the name and description of the new branch.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newBranchDescription}
                  onChange={(e) => setNewBranchDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={isEditing ? saveBranch : addBranch}>
                {isEditing ? "Save Branch" : "Add Branch"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.length > 0 ? (
            branches.map((branch, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{branch.name}</div>
                </TableCell>
                <TableCell>{branch.description}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => editBranch(branch)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                You have no Branches
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
    </main>
  );
}