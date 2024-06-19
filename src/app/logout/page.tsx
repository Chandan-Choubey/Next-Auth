"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      const res = await axios.get("/api/users/logout");
      console.log(res.data);
      router.push("/login");
    };
    logout();
  }, []);
  return <div>Logout</div>;
};

export default page;
