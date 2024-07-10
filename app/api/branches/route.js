import Branch from "@models/Branch";
import { connectToDB } from "@mongodb";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch all branches from the database
    const branches = await Branch.find({});

    return new Response(JSON.stringify({ success: true, data: branches }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch branches" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const {name, description } = body;

    const branch = new Branch({
      name,
      description
    });

    // Save the new branch to the database
    await branch.save();

    return new Response(JSON.stringify({ message: "Branch created successfully" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new branch", { status: 500 })
  }
};

export const PUT = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { _id, name, description } = body;

    // Find the branch by _id and update it
    const branch = await Branch.findOneAndUpdate({ _id }, { name, description }, { new: true });

    if (!branch) {
      return new Response(JSON.stringify({ success: false, error: "Branch not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, data: branch }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to update branch" }), { status: 500 });
  }
};