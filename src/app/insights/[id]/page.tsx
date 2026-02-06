"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/Icons/Icons";
import { motion } from "framer-motion";

interface Article {
    id: string;
    category: string;
    title: string;
    description: string;
    type: "primary" | "secondary" | string;
    fileUrl: string;
    subtitle: string;
    contentHtml?: string;
}

const NAVBAR_CONFIG = {
    className: "absolute top-0 left-0 right-0 z-10 w-full",
    props: {
        navbar: "secondary" as const,
        showGetInTouch: true,
    },
};

export default function InsightDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [blog, setBlog] = useState<Article | null>(null);
    const [nextBlog, setNextBlog] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);
                // Fetch current blog
                const response = await fetch(`/api/blogs/${id}`);
                if (!response.ok) throw new Error("Blog not found");
                const res = await response.json();
                setBlog(res.data);

                // Fetch all blogs to find the next one
                const allRes = await fetch("/api/blogs");
                const allData = await allRes.json();
                const blogs: Article[] = allData.data;
                const currentIndex = blogs.findIndex((b) => b.id === id);
                if (currentIndex !== -1) {
                    const nextIndex = (currentIndex + 1) % blogs.length;
                    setNextBlog(blogs[nextIndex]);
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlogData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f6f5]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customBrown"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f6f5]">
                <Typography variant="h2">Blog not found</Typography>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen overflow-x-hidden">
            <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}>
                <div className="pt-40 md:pt-72">
                    {/* Back Button and Header */}
                    <div className="container mx-auto px-6 relative mb-16 ">
                        <button
                            onClick={() => router.back()}
                            className="absolute   md:left-0 left-3 -top-14 md:-top-0 p-2 text-customBrown hover:opacity-70 transition-opacity z-10 "
                            aria-label="Go back"
                        >
                            <svg className="w-8 h-8 md:w-11 md:h-11" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="text-center space-y-2 max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-5xl lg:text-7xl font-freightNeoSemibold text-customBrown leading-[1.1] md:mb-6 mb-3">
                                {blog.title}
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl font-FreightNeoProNormal text-[#040707] leading-relaxed max-w-2xl mx-auto">
                                {blog.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="container mx-auto px-6">
                        {/* Hero Image Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative h-[350px] md:h-[600px] lg:h-[70vh] w-full rounded-xl  overflow-hidden mb-20 shadow-2xl shadow-black/5"
                        >
                            <Image
                                src={blog.fileUrl || "/placeholder.svg"}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Content Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="prose prose-lg md:prose-xl lg:prose-2xl mx-auto text-[#04070799] font-FreightNeoProNormal 
                                [&>p]:mb-12 [&_p]:leading-[1.8]
                                [&_h2]:text-3xl md:[_h2]:text-5xl [&_h2]:text-customBrown [&_h2]:font-freightNeoSemibold [&_h2]:mb-10 [&_h2]:mt-24 
                                [&_ul]:list-disc [&_ul]:pl-12 [&_ul]:mb-12 [&_li]:mb-4 
                                [&_strong]:text-customBrown/90 [&_img]:rounded-[32px] [&_img]:my-16 [&_img]:shadow-2xl
                                [&_blockquote]:italic [&_blockquote]:text-3xl md:[_blockquote]:text-4xl [&_blockquote]:text-customBrown/70 [&_blockquote]:border-l-8 [&_blockquote]:border-customBrown/10 [&_blockquote]:pl-10 [&_blockquote]:my-16"
                            dangerouslySetInnerHTML={{ __html: (blog.contentHtml || "").replace("min-height: 100vh;", "") }}
                        />

                        {/* Footer / Next Post Link */}
                    </div>

                    {/* Footer / Next Post Link */}
                    {nextBlog && (
                        <div className="w-full pt-12 px-5 md:px-0 ">
                            <div className="border-t border-[#D1D1D1] py-2 md:px-6 px-3" />
                            <div className="container mx-auto px-6">
                                <button
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        setTimeout(() => router.push(`/insights/${nextBlog.id}`), 300);
                                    }}
                                    className="group w-full flex flex-row justify-between items-center py-4 bg-transparent hover:opacity-70 transition-all duration-300 gap-10"
                                >
                                    <div className="text-left flex-1">
                                        <p className="text-[10px] md:text-[14px] font-medium text-[#8E8E93] uppercase mb-3">UP NEXT</p>
                                        <h3 className="text-xl md:text-3xl font-freightNeoSemibold text-[#333333] leading-tight">
                                            {nextBlog.title}
                                        </h3>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-7 h-7 md:w-6 md:h-6 rounded-full bg-[#EADFD1] flex items-center justify-center transition-transform transform group-hover:scale-105">
                                            <ArrowRightIcon pathFill="#4F3737" rextFill="transparent" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="border-t border-[#D1D1D1] mt-4" />
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}
