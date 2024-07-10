import Asset from "@models/Asset";
import { connectToDB } from "@mongodb";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch all assets from the database
    const assets = await Asset.find({}).populate('categories branches');

    return new Response(JSON.stringify({ success: true, data: assets }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch assets" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { name, issuedDate, returnDate, categories, branches } = body;

    const asset = new Asset({
      name,
      issuedDate,
      returnDate,
      categories,
      branches
    });

    // Save the new asset to the database
    await asset.save();

    return new Response(JSON.stringify({ message: "Asset created successfully" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new asset", { status: 500 })
  }
};

export const PUT = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { _id, name, issuedDate, returnDate, categories, branches } = body;

    // Find the asset by _id and update it
    const asset = await Asset.findOneAndUpdate({ _id }, { name, issuedDate, returnDate, categories, branches }, { new: true });

    if (!asset) {
      return new Response(JSON.stringify({ success: false, error: "Asset not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, data: asset }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to update asset" }), { status: 500 });
  }
};