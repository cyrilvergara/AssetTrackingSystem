// api/hello/route.js

export async function GET(request) {
  const data = { message: 'Hello from the server!' };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
