"use client";
import { ComboboxDemo } from "@/app/_components/cbox";
import { fetcher } from "@/app/_helpers/helperFunc";
import { useContextHook } from "@/app/ContextCode";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface FormDataa {
  title: string;
  stock: string;
}

export interface Section {
  subtitle: string;
  content: string;
}

const AdminForm: React.FC = () => {
  const userDetails = useContextHook();
  const [validstate, setvalidstate] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;

  useEffect(() => {
    if (!userDetails?.user) {
      redirect("/admin/signin");
    } else if (userDetails.user.role === "admin") {
      setvalidstate(true);
    }
  }, [userDetails]);

  const [formDataa, setFormDataa] = useState<FormDataa>({
    title: "",
    stock: "",
  });
  const [value, setValue] = React.useState("");

  const [sections, setSections] = useState<Section[]>([
    { subtitle: "", content: "" },
  ]);
  const [Loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataa({ ...formDataa, [name]: value });
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

  const addSection = () => {
    setSections([...sections, { subtitle: "", content: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !image ||
      formDataa.title === "" ||
      formDataa.stock === "" ||
      sections.some(
        (section) =>
          section.subtitle === "" || section.content === "" || value === ""
      )
    ) {
      toast("Please fillup the form first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);

    setLoading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dddm02rvi/image/upload`,
        formData
      );

      const response = await fetcher("/createarticle", "POST", {
        title: formDataa.title,
        sections,
        image: res.data.secure_url,
        stock: formDataa.stock,
        tags: value,
      });

      setLoading(false);
      if (response.message === "success") {
        toast("Article saved successfully!");
      } else {
        toast("Failed to save article.");
      }
    } catch (error) {
      console.log(error);
      toast("Error occurred while saving.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    validstate && (
      <div className="max-w-2xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">Admin Data Entry Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Article Title</label>
            <input
              type="text"
              name="title"
              value={formDataa.title}
              onChange={handleChange}
              className="w-full p-2 border rounded border-x-2 border-y-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Stocks</label>
            <input
              type="text"
              name="stock"
              value={formDataa.stock}
              placeholder="Separate with comma"
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
          <div>
            <label className="block font-semibold">Upload Image</label>
            <input
              type="file"
              accept="*image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded border-x-2 border-y-2"
            />
          </div>
          <ComboboxDemo value={value} setValue={setValue} />
          <Button type="button" onClick={addSection} className="mr-4 ml-4">
            Add More
          </Button>

          <Button type="submit" className="" disabled={Loading}>
            {Loading && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </form>
      </div>
    )
  );
};

export default AdminForm;
