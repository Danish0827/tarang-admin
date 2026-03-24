"use client"

import React, { useState, useEffect } from "react"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import Link from "next/link"
import toast from "react-hot-toast"

const ImageFormFields = ({ singleImage, type }: any) => {

    const [imageInfo, setImageInfo] = useState({
        width: 0,
        height: 0,
        size: "",
        type: ""
    })

    // get file size + type
    useEffect(() => {
        const getImageInfo = async () => {
            try {
                const res = await fetch(singleImage.url)
                const blob = await res.blob()

                const sizeKB = blob.size / 1024
                const sizeMB = sizeKB / 1024

                const formattedSize =
                    sizeMB >= 1
                        ? sizeMB.toFixed(2) + " MB"
                        : sizeKB.toFixed(2) + " KB"

                setImageInfo(prev => ({
                    ...prev,
                    size: formattedSize,
                    type: blob.type
                }))
            } catch (err) {
                console.log(err)
            }
        }

        if (singleImage?.url) getImageInfo()
    }, [singleImage])

    const copyUrl = (e: any) => {
        e.preventDefault();
        navigator.clipboard.writeText(singleImage.url)
        toast.success("URL copied!");
    }

    return (
        <div className="grid md:grid-cols-2 gap-x-10">

            {/* IMAGE */}
            <div className="flex h-full items-center">
                <img
                    className="w-full object-contain rounded-4xl"
                    src={singleImage.url}
                    alt={singleImage.alt_text}
                    onLoad={(e) => {
                        const img = e.target as HTMLImageElement
                        setImageInfo(prev => ({
                            ...prev,
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        }))
                    }}
                />
            </div>

            {/* FORM */}
            <div>
                {/* MEDIA INFO */}
                <div className={`${type === 'view' ? 'select-none' : ''} my-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-sm`}>

                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                        Media Information
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                            <p className="text-neutral-500 text-xs mb-1">Dimensions</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {imageInfo.width} × {imageInfo.height}px
                            </p>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                            <p className="text-neutral-500 text-xs mb-1">File Size</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {imageInfo.size}
                            </p>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl col-span-2">
                            <p className="text-neutral-500 text-xs mb-1">File Type</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {imageInfo.type}
                            </p>
                        </div>

                    </div>
                    <div className="mt-5">
                        <div className="mb-5">
                            <Label className="text-sm font-semibold mb-2 block">
                                Image Title
                            </Label>
                            <Input
                                disabled={type === 'view'}
                                type="text"
                                defaultValue={singleImage?.title || ""}
                                name="title"

                            />
                        </div>

                        <div className="mb-5">
                            <Label className="text-sm font-semibold mb-2 block">
                                Image Alt
                            </Label>
                            <Input
                                disabled={type === 'view'}
                                type="text"
                                defaultValue={singleImage?.alt_text || ""}
                                name="alt_text"
                            />
                        </div>

                        <div className="mb-5">
                            <Label className="text-sm font-semibold mb-2 block">
                                Image URL
                            </Label>

                            <Textarea
                                disabled={type === 'view'}
                                className="h-20"
                                value={singleImage?.url || ""}
                                readOnly
                            />

                        </div>

                    </div>
                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3 mt-5">

                        <button
                            onClick={copyUrl}
                            className="flex-1 cursor-pointer h-10 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition"
                        >
                            Copy URL
                        </button>

                        <Link
                            href={singleImage.url}
                            target="_blank"
                            className="flex-1 h-10 flex items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-600 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                        >
                            Open Image
                        </Link>

                    </div>

                </div>


            </div>


        </div>
    )
}

export default ImageFormFields