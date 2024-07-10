"use client"
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomDialog({ isOpen, onOpenChange, title, description, onSubmit, fields = [] }) {
  const [values, setValues] = useState(
    fields.reduce((obj, field) => ({ ...obj, [field.name]: field.initialValue || "" }), {})
  );

  const handleChange = (name) => (e) => {
    setValues((prevValues) => ({ ...prevValues, [name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
    setValues(fields.reduce((obj, field) => ({ ...obj, [field.name]: "" }), {}));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="ml-4">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.name} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.name}
                value={values[field.name]}
                onChange={handleChange(field.name)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}