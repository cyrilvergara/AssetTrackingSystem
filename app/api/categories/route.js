import Category from "@models/Category";
import { connectToDB } from "@mongodb";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch all categories from the database
    const categories = await Category.find({});

    return new Response(JSON.stringify({ success: true, data: categories }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch categories" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const {name, description } = body;

    const category = new Category({
      name,
      description
    });

    // Save the new category to the database
    await category.save();

    return new Response(JSON.stringify({ message: "Category created successfully" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new category", { status: 500 })
  }
};

export const PUT = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { _id, name, description } = body;

    // Find the category by _id and update it
    const category = await Category.findOneAndUpdate({ _id }, { name, description }, { new: true });

    if (!category) {
      return new Response(JSON.stringify({ success: false, error: "Category not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, data: category }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to update category" }), { status: 500 });
  }
};