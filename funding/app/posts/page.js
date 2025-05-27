"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchPosts } from "@/actions/useraction";

const page = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    let res = await fetchPosts();
    setPosts(res);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => {
        return (
          <div>
            <Link href={`/${post.username}`}>
              <div className=" font-bold text-lg">{post.username}</div>
            </Link>
            <img
              className="h-auto max-w-full rounded-lg"
              src={`/uploads/${post.Post}`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default page;