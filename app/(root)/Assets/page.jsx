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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetIssuedDate, setNewAssetIssuedDate] = useState("");
  const [newAssetReturnDate, setNewAssetReturnDate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAssetId, setCurrentAssetId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    fetch("/api/assets")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAssets(data.data);
        } else {
          console.error("Failed to fetch assets:", data.error);
        }
      })
      .catch((error) => console.error("Failed to fetch assets:", error));
  }, []);

  const addAsset = () => {
    const newAsset = {
      name: newAssetName,
      issuedDate: newAssetIssuedDate,
      returnDate: newAssetReturnDate,
    };

    if (!newAssetName || !newAssetIssuedDate || !newAssetReturnDate) {
      alert("Asset name, issued date and return date are required");
      return;
    }

    fetch("/api/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAsset),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Asset created successfully") {
          setAssets([...assets, newAsset]);
          setNewAssetName("");
          setNewAssetIssuedDate("");
          setNewAssetReturnDate("");
          setIsDialogOpen(false);
        } else {
          console.error("Failed to add asset:", data.error);
        }
      })
      .catch((error) => console.error("Failed to add asset:", error));
    setIsEditing(false);
  };

  const editAsset = (asset) => {
    setNewAssetName(asset.name);
    setNewAssetIssuedDate(asset.issuedDate);
    setNewAssetReturnDate(asset.returnDate);
    setCurrentAssetId(asset._id); // Set currentAssetId to the id of the asset being edited
    setIsDialogOpen(true);
    setIsEditing(true);
  };

  const saveAsset = () => {
    const updatedAsset = {
      _id: currentAssetId,
      name: newAssetName,
      issuedDate: newAssetIssuedDate,
      returnDate: newAssetReturnDate,
    };

    if (!newAssetName || !newAssetIssuedDate || !newAssetReturnDate) {
      alert("Asset name, issued date and return date are required");
      return;
    }

    fetch("/api/assets", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAsset),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAssets(
            assets.map((asset) =>
              asset._id === currentAssetId ? data.data : asset
            )
          );
          setNewAssetName("");
          setNewAssetIssuedDate("");
          setNewAssetReturnDate("");
          setIsDialogOpen(false);
          setIsEditing(false);
        } else {
          console.error("Failed to update asset:", data.error);
        }
      })
      .catch((error) => console.error("Failed to update asset:", error));
  };
  // Fetch categories and branches on component mount
  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.data));

    fetch("/api/branches")
      .then((response) => response.json())
      .then((data) => setBranches(data.data));
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Assets</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">Add Asset</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Asset</DialogTitle>
              <DialogDescription>
                Enter the name, issued date and return date of the new asset.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issuedDate" className="text-right">
                  Issued Date
                </Label>
                <Input
                  id="issuedDate"
                  value={newAssetIssuedDate}
                  onChange={(e) => setNewAssetIssuedDate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="returnDate" className="text-right">
                  Return Date
                </Label>
                <Input
                  id="returnDate"
                  value={newAssetReturnDate}
                  onChange={(e) => setNewAssetReturnDate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categories:</Label>
                <Select
                  defaultValue={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="branch">Branches:</Label>
                <Select
                  defaultValue={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  required
                >
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={isEditing ? saveAsset : addAsset}>
                {isEditing ? "Save Changes" : "Add Asset"}
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Issued Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset._id}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.issuedDate}</TableCell>
              <TableCell>{asset.returnDate}</TableCell>
              <TableCell>
                <Button onClick={() => editAsset(asset)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
