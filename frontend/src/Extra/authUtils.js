export const validateToken = async () => {
  const token = localStorage.getItem("auth-token");
  console.log("AU:", token);

  if (!token) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:3001/auth/validateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log(data.isValid);
    return data.isValid;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
