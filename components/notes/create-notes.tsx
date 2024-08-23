"use client";
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { notes } from "@prisma/client";
import RichEditor from "@/components/custom/RichEditor";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComboBox } from "@/components/custom/ComboBox";
import FileUpload from "../custom/FileUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title is required and must be at least 2 characters long",
    }),
    description: z.string(),
    imageUrl: z.string().optional(),
});

interface CreateNoteFormProps {
    notes: {
        id: string;
        title: string;
        description: string;
        imageUrl: string | null;
        createdAt?: Date; // Allow undefined
        updatedAt?: Date; // Allow undefined
    };
}

const CreateNoteForm = ({ notes }: CreateNoteFormProps) => {
    const defaultCreatedAt = notes.createdAt || new Date(); // Default to current date if needed
    const defaultUpdatedAt = notes.updatedAt || new Date();
    const router = useRouter();

    // Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: notes.title, // Refers to notes instead of course
            description: notes.description,
            imageUrl: notes.imageUrl || "",
        },
    });
    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/notes", values);
            router.push(`/instructor/notes`);
            toast.success("New Note Created");
        } catch (err) {
            console.log("Failed to create new Note", err);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="p-10 bg-gray-100">
            <h1 className="text-3xl font-bold border-b-2 border-gray-900 pb-2">
                Set Up the Essentials for Your Course
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-10"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: Web Development for Beginners"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <RichEditor
                                        placeholder="What is this course about?"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>
                                    Couse Banner <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <FileUpload
                                        value={field.value || ""}
                                        onChange={(url) => field.onChange(url)}
                                        endpoint="courseBanner"
                                        page="Edit Course"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Create Note"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateNoteForm;
