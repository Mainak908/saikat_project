"use client";
import DeleteButton from "@/app/_components/delete";
import { fetcher } from "@/app/_helpers/helperFunc";
import { useContextHook } from "@/app/ContextCode";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react"; // this page needs pagination TODO:
import useSWR from "swr";

interface iFormData {
  slug: string;
  id: string;
}

const AdminDashboard: React.FC = () => {
  const userDetails = useContextHook();

  useEffect(() => {
    if (!userDetails?.user) redirect("/admin/signin");
  }, [userDetails?.user]);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
      <Link
        href={"/admin/adminform"}
        className="px-4 py-3 bg-slate-700 text-white font-bold rounded-xl"
      >
        Add Post
      </Link>
      <h2 className="text-xl font-bold mb-5 mt-5">Posts</h2>

      <PostData />
    </div>
  );
};

const PostData = () => {
  const { data, mutate } = useSWR<iFormData[]>("dashboard", () =>
    fetcher("/fetchAllPostsSlug", "GET")
  );
  const [posts, setposts] = useState<iFormData[]>();
  useEffect(() => {
    if (data) setposts(data);
  }, [data]);

  return (
    <>
      {posts && posts.length == 0 && (
        <h2 className="text-xl font-bold mb-5 mt-5">No Post Available</h2>
      )}
      {posts &&
        posts.map((post, id) => (
          <div
            key={id}
            className="p-4 border rounded mb-4 flex items-center justify-between"
          >
            <h3 className="font-bold">{post.slug}</h3>
            <div className="flex gap-5">
              <Link
                href={`/admin/editform?id=${post.id}`}
                className="bg-black text-white px-4 py-1 rounded-lg flex items-center gap-2"
              >
                <Pencil />
                Edit
              </Link>

              <DeleteButton id={post.id} fn={mutate} />
            </div>
          </div>
        ))}
    </>
  );
};
export default AdminDashboard;
