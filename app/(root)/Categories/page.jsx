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

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories:", data.error);
        }
      })
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  const addCategory = () => {
    const newCategory = {
      name: newCategoryName,
      description: newCategoryDescription,
    };

    if (!newCategoryName || !newCategoryDescription) {
      alert("Both name and description are required");
      return;
    }

    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Category created successfully") {
          setCategories([...categories, newCategory]);
          setNewCategoryName("");
          setNewCategoryDescription("");
          setIsDialogOpen(false);
        } else {
          console.error("Failed to add category:", data.error);
        }
      })
      .catch((error) => console.error("Failed to add category:", error));
    setIsEditing(false);
  };

  const editCategory = (category) => {
    setNewCategoryName(category.name);
    setNewCategoryDescription(category.description);
    setCurrentCategoryId(category._id); // Set currentCategoryId to the id of the category being edited
    setIsDialogOpen(true);
    setIsEditing(true);
  };

  const saveCategory = () => {
    const updatedCategory = {
      _id: currentCategoryId,
      name: newCategoryName,
      description: newCategoryDescription
    };

    if (!newCategoryName || !newCategoryDescription) {
      alert("Both name and description are required");
      return;
    }
  
    fetch('/api/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCategory)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setCategories(categories.map(category => category._id === currentCategoryId ? data.data : category));
        setNewCategoryName("");
        setNewCategoryDescription("");
        setIsDialogOpen(false);
        setIsEditing(false);
      } else {
        console.error("Failed to update category:", data.error);
      }
    })
    .catch(error => console.error("Failed to update category:", error));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">Add Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Enter the name and description of the new category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={isEditing ? saveCategory : addCategory}>
                {isEditing ? "Save Category" : "Add Category"}
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
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{category.name}</div>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => editCategory(category)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                You have no Categories
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
    </main>
  );
}
