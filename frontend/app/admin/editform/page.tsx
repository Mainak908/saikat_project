"use client";
import Spinner from "@/app/_components/loading";
import { fetcher } from "@/app/_helpers/helperFunc";
import { useContextHook } from "@/app/ContextCode";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
interface Section {
  subtitle: string;
  content: string;
  id: string;
}
interface FormData {
  title: string;
}
const Page = () => {
  const router = useSearchParams();
  const id = router.get("id");
  const userDetails = useContextHook();
  const [sections, setSections] = useState<Section[]>([
    { subtitle: "", content: "", id: "" },
  ]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
  });
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userDetails?.user || userDetails.user.role !== "admin")
      redirect("/admin/signin");
  }, [userDetails?.user]);

  const { data, isLoading } = useSWR("editform", () =>
    fetcher(`/fetchPostBySlug?id=${id}`, "GET")
  );

  useEffect(() => {
    if (data) {
      const { title, sections } = data;
      setFormData({ title });
      setSections(sections);
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  if (!id) {
    return;
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetcher("/updatepost", "POST", {
        postId: id,
        data: sections,
      });
      setLoading(false);
      if (response.success === "true") toast("Post updated successfully");
    } catch (error) {
      console.log(error);
      toast("Error occurred while saving.");
    }
  };

  const handleSectionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [name]: value } : section
    );
    setSections(updatedSections);
  };
  return (
    <>
      <Link href={"/admin/dashboard"} className=" ">
        <ChevronLeft className="text-xl ml-4 mt-4" />
      </Link>
      <div className="max-w-2xl mx-auto p-5 flex-col">
        <h1 className="text-2xl font-bold mb-5">Admin Data Entry Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Article Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded border-x-2 border-y-2"
              required
            />
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <label className="block font-semibold">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={section.subtitle}
                onChange={(e) => handleSectionChange(index, e)}
                className="w-full p-2 border rounded border-x-2 border-y-2"
                required
              />
              <label className="block font-semibold">Content</label>
              <textarea
                name="content"
                value={section.content}
                onChange={(e) => handleSectionChange(index, e)}
                rows={6}
                className="w-full p-2 border rounded border-x-2 border-y-2"
                required
              ></textarea>
            </div>
          ))}

          <Button type="submit" className="" disabled={Loading}>
            {Loading && <Loader2 className="animate-spin" />}
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

const EditFormPage = () => (
  <Suspense fallback={<Spinner />}>
    <Page />
  </Suspense>
);
export default EditFormPage;
