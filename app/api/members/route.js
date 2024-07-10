import Member from "@models/Member";
import { connectToDB } from "@mongodb";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch all members from the database
    const members = await Member.find({});

    return new Response(JSON.stringify({ success: true, data: members }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch members" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { firstName, lastName, position } = body;

    const member = new Member({
      firstName,
      lastName,
      position
    });

    // Save the new member to the database
    await member.save();

    return new Response(JSON.stringify({ message: "Member created successfully" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new member", { status: 500 })
  }
};

export const PUT = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { _id, firstName, lastName, position } = body;

    // Find the member by _id and update it
    const member = await Member.findOneAndUpdate({ _id }, { firstName, lastName, position }, { new: true });

    if (!member) {
      return new Response(JSON.stringify({ success: false, error: "Member not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, data: member }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to update member" }), { status: 500 });
  }
};