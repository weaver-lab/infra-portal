export function getBffResponse(result: object) {
  const response = new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
