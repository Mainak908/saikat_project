"use client";

import { fetcher } from "@/app/_helpers/helperFunc";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation"; // For dynamic refresh
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  fn: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, fn }) => {
  const [loading, setLoading] = useState(false); // State for loading spinner
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      // API call to delete post
      const response = await fetcher("/deletePost", "DELETE", { id });
      if (response.success === "true") {
        // router.refresh(); // giving stale data
        fn();
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      variant={"destructive"}
      className="min-h-9 min-w-[100px]"
    >
      {loading ? <Loader2 className="animate-spin" /> : <Trash />}
      Delete
    </Button>
  );
};

export default DeleteButton;
