"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post("/api/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  );
};

export default Page;
