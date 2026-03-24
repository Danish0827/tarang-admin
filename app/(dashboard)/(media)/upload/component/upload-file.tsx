'use client'
import { UploadDropzone } from '@/lib/uploadthing';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Eye } from 'lucide-react';

const UploadFile = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileKey, setFileKey] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    return (
        <div className="mb-5 space-y-5">
            <UploadDropzone
                className="h-60 dark:border-slate-500 cursor-pointer"
                endpoint="imageUploader"
                onUploadBegin={() => {
                    setIsUploading(true);
                }}
                onClientUploadComplete={(res) => {
                    setImageUrl(res[0].ufsUrl);
                    setFileKey(res[0].key);
                    setIsUploading(false);
                }}
                onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                    setIsUploading(false);
                }}
            />

            {/* Processing Loader */}
            {isUploading && (
                <div className="flex items-center justify-center gap-2 text-blue-600">
                    <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                </div>
            )}
            <div className='flex justify-center'>
                {/* Uploaded Image */}
                {imageUrl && (
                    <div className='mx-auto'>
                        <div className="relative w-60 h-60">
                            <div className="absolute bg-black/90 rounded-2xl z-50">
                                <img
                                    src={imageUrl || "/assets/images/logo.png"}
                                    alt="Uploaded"
                                    className="h-60 w-60 rounded-lg object-cover"
                                />

                                <button
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${fileKey}`, {
                                            method: "DELETE",
                                            headers: { "Content-Type": "application/json" }
                                        });

                                        setImageUrl(null);
                                        setFileKey(null);
                                    }}
                                    className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-sm rounded cursor-pointer duration-500 hover:scale-105"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        <Button className={cn(`w-auto mt-6 flex justify-center mx-auto h-11`)} asChild>
                            <Link href="/allmedia">
                                <Eye className="w-5 h-5" />
                                All Media
                            </Link>
                        </Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default UploadFile