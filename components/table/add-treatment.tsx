'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import DefaultCardComponent from '@/app/(dashboard)/components/default-card-component'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import toast from 'react-hot-toast'
import { handleTreatmentAction } from '@/app/(dashboard)/(treatment)/addtreatment/actions'
import Tiptap from '@/app/(dashboard)/(components)/Tiptap'
import { Switch } from '../ui/switch'

const AddTreatment = ({ singleData, type }: any) => {

  const isView = type === "view"

  const getInitialData = (d: any = {}) => ({
    breadcrumb: {
      breadtitle: d?.breadcrumb?.breadtitle || "",
      breadimage: d?.breadcrumb?.breadimage || "",
      fileKey: d?.breadcrumb?.fileKey || ""
    },
    intro: {
      introimage: d?.intro?.introimage || "",
      fileKey: d?.intro?.fileKey || "",
      introtitle: d?.intro?.introtitle || "",
      introbtnurl: d?.intro?.introbtnurl || "",
      introcontent: d?.intro?.introcontent || ""
    },
    treatmentDetails:
      Array.isArray(d?.treatmentDetails) && d.treatmentDetails.length > 0
        ? d.treatmentDetails
        : [
          {
            treatmenttitle: "",
            treatmentreverse: false,
            treatmentcontent: "",
            treatmentimage: "",
            fileKey: ""
          }
        ],
    treatmentCards: {
      maintreatmentcardtitle: d?.treatmentCards?.maintreatmentcardtitle || "",
      maintreatmentcardcontent: d?.treatmentCards?.maintreatmentcardcontent || "",
      cards:
        Array.isArray(d?.treatmentCards?.cards) &&
          d.treatmentCards.cards.length > 0
          ? d.treatmentCards.cards
          : [
            {
              treatmentcardtitle: "",
              treatmentcardcontent: "",
              treatmentcardimage: "",
              fileKey: ""
            }
          ]
    },
    cancerCurable: {
      maintitle: d?.cancerCurable?.maintitle || "",
      maindesc: d?.cancerCurable?.maindesc || "",
      items:
        Array.isArray(d?.cancerCurable?.items) &&
          d.cancerCurable.items.length > 0
          ? d.cancerCurable.items
          : [{ title: "", content: "" }],
      mainnote: d?.cancerCurable?.mainnote || ""
    },
    faq: {
      maintitle: d?.faq?.maintitle || "",
      items:
        Array.isArray(d?.faq?.items) && d.faq.items.length > 0
          ? d.faq.items
          : [{ question: "", answer: "" }]
    },
    calltoaction: {
      title: d?.calltoaction?.title || "",
      desc: d?.calltoaction?.desc || "",
      btnname: d?.calltoaction?.btnname || "",
      btnurl: d?.calltoaction?.btnurl || ""
    }
  })

  const [title, setTitle] = useState(singleData?.title || "")
  const [slug, setSlug] = useState(singleData?.slug || "")
  const [data, setData] = useState(getInitialData(singleData?.data))
  const [seo, setSeo] = useState(singleData?.seo || {
    title: "",
    description: "",
    keywords: "",
    canonical: ""
  })

  const [state, formAction] = useActionState(handleTreatmentAction, {
    success: false,
    message: ""
  })

  useEffect(() => {
    if (singleData?.data) {
      setData(getInitialData(singleData.data))
    }
  }, [singleData])

  useEffect(() => {
    if (state?.message) {
      if (state.success) toast.success(state.message)
      else toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction}>
      <Input type="hidden" name="action" value={type === "edit" ? "edit" : "add"} />
      <Input type="hidden" name="id" value={singleData?.id} />
      <Input type="hidden" name="data" value={JSON.stringify(data)} />
      <Input type="hidden" name="seo" value={JSON.stringify(seo)} />
      <Input type="hidden" name="title" value={title} />
      <Input type="hidden" name="slug" value={slug} />

      <DefaultCardComponent title="Page Info">
        <div className="grid md:grid-cols-2 gap-5">
          <Input disabled={isView} placeholder="Title" className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input disabled={isView} placeholder="Slug" className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
      </DefaultCardComponent>

      <Tabs defaultValue="seo">
        <TabsList className="bg-white/60 backdrop-blur-md border border-neutral-200 px-3 py-4 h-20 rounded-2xl flex flex-wrap items-center gap-2 shadow-sm">

  {[
    "seo",
    "breadcrumb",
    "intro",
    "treatment",
    "cards",
    "curable",
    "faq",
    "cta"
  ].map((tab) => (
    <TabsTrigger
      key={tab}
      value={tab}
      className="
        px-6 py-3 text-sm font-semibold rounded-xl
        transition-all duration-200
        hover:bg-primary/10
        data-[state=active]:bg-primary
        data-[state=active]:text-white
        data-[state=active]:shadow-md uppercase
      "
    >
      {tab}
    </TabsTrigger>
  ))}

</TabsList>

        <TabsContent value="seo">
          <DefaultCardComponent title="SEO">
            <div className="grid md:grid-cols-2 gap-4">
              <Textarea disabled={isView} placeholder="Meta Title" className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-20 rounded-lg !shadow-none !ring-0" value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} />
              <Textarea disabled={isView} placeholder="Meta Description" className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-20 rounded-lg !shadow-none !ring-0" value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} />
              <Input disabled={isView} placeholder="Keywords" className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} />
              <Input disabled={isView} placeholder="Canonical URL" className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={seo.canonical} onChange={(e) => setSeo({ ...seo, canonical: e.target.value })} />
            </div>
          </DefaultCardComponent>
        </TabsContent>

        <TabsContent value="breadcrumb">
          <DefaultCardComponent title="Breadcrumb">
            <Input disabled={isView} placeholder="Breadcrumb Title" className="border mb-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={data.breadcrumb.breadtitle} onChange={(e) =>
              setData({ ...data, breadcrumb: { ...data.breadcrumb, breadtitle: e.target.value } })
            } />
            {!isView && !data.breadcrumb.breadimage && (
              <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) =>
                setData({
                  ...data,
                  breadcrumb: {
                    ...data.breadcrumb,
                    breadimage: res[0].ufsUrl,
                    fileKey: res[0].key
                  }
                })
              } />
            )}
            {data.breadcrumb.breadimage &&
              <>
                <div className="mb-0 border-2 border-blue-400 rounded-3xl">
                  <div className="relative h-60 w-full  rounded-3xl">
                    <Image
                      src={data.breadcrumb.breadimage}
                      alt="Uploaded"
                      width={600}
                      height={600}
                      className="h-60 w-full overflow-hidden rounded-3xl object-cover"
                    />
                    {!isView && (
                      <button
                        onClick={async (e) => {
                          e.preventDefault()
                          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${data.breadcrumb.fileKey}`, {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" }
                          });
                          setData((prev: any) => ({
                            ...prev,
                            breadcrumb: {
                              ...prev.breadcrumb,
                              breadimage: "",
                              fileKey: ""
                            }
                          }))
                        }}
                        className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-sm rounded cursor-pointer duration-500 hover:scale-105"
                      >
                        Remove
                      </button>)}
                  </div>
                </div>
              </>

            }
          </DefaultCardComponent>
        </TabsContent>

        <TabsContent value="intro">
          <DefaultCardComponent title="Intro">
            {!isView && !data.intro.introimage && (
              <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) =>
                setData({
                  ...data,
                  intro: {
                    ...data.intro,
                    introimage: res[0].ufsUrl,
                    fileKey: res[0].key
                  }
                })
              } />
            )}
            {/* {data.intro.introimage && <Image src={data.intro.introimage} width={200} height={100} alt="" />} */}
            {data.intro.introimage &&
              <>
                <div className="mb-0 border-2 border-blue-400 rounded-3xl">
                  <div className="relative h-60 w-full  rounded-3xl">
                    <Image
                      src={data.intro.introimage}
                      alt="Uploaded"
                      width={600}
                      height={600}
                      className="h-60 w-full overflow-hidden rounded-3xl object-cover"
                    />
                    {!isView && (
                      <button
                        onClick={async (e) => {
                          e.preventDefault()
                          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${data.intro.fileKey}`, {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" }
                          });
                          setData((prev: any) => ({
                            ...prev,
                            intro: {
                              ...prev.intro,
                              introimage: "",
                              fileKey: ""
                            }
                          }))
                        }}
                        className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-sm rounded cursor-pointer duration-500 hover:scale-105"
                      >
                        Remove
                      </button>)}
                  </div>
                </div>
              </>

            }
            <Input disabled={isView} placeholder="Intro Title" className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={data.intro.introtitle} onChange={(e) =>
              setData({ ...data, intro: { ...data.intro, introtitle: e.target.value } })
            } />
            <Tiptap
              content={data.intro.introcontent || ""}
              onChange={(content: string) =>
                setData({
                  ...data,
                  intro: {
                    ...data.intro,
                    introcontent: content
                  }
                })
              }
            />
            <Input disabled={isView} placeholder="Intro Button URL" className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={data.intro.introbtnurl} onChange={(e) =>
              setData({ ...data, intro: { ...data.intro, introbtnurl: e.target.value } })
            } />
          </DefaultCardComponent>
        </TabsContent>

        <TabsContent value="treatment">
          <DefaultCardComponent title="Treatment">
            {data.treatmentDetails.map((item: any, index: number) => (
              <div key={index} className="border p-4 mb-3 space-y-3 rounded-md">
                <div className="flex items-center gap-5">
                  <label className="text-sm font-medium">Reverse Layout</label>
                  <Switch
                    className="scale-125"
                    checked={item.treatmentreverse || false}
                    onCheckedChange={(value) => {
                      const updated = [...data.treatmentDetails]
                      updated[index].treatmentreverse = value
                      setData({ ...data, treatmentDetails: updated })
                    }}
                  />
                </div>
                {!isView && !item.treatmentimage && (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      const updated = [...data.treatmentDetails]
                      updated[index].treatmentimage = res[0].ufsUrl
                      updated[index].fileKey = res[0].key
                      setData({ ...data, treatmentDetails: updated })
                    }}
                  />
                )}
                {item.treatmentimage &&
                  <>
                    <div className="mb-0 border-2 border-blue-400 rounded-3xl">
                      <div className="relative h-60 w-full  rounded-3xl">
                        <Image
                          src={item.treatmentimage}
                          alt="Uploaded"
                          width={600}
                          height={600}
                          className="h-60 w-full overflow-hidden rounded-3xl object-cover"
                        />
                        {!isView && (
                          <button
                            onClick={async (e) => {
                              e.preventDefault()
                              await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${item.fileKey}`, {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" }
                              });
                              setData((prev: any) => {
                                const updated = [...prev.treatmentDetails]
                                updated[index].treatmentimage = ""
                                updated[index].fileKey = ""

                                return {
                                  ...prev,
                                  treatmentDetails: updated
                                }
                              })
                            }}
                            className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-sm rounded cursor-pointer duration-500 hover:scale-105"
                          >
                            Remove
                          </button>)}
                      </div>
                    </div>
                  </>
                }
                <div>
                  {/* <label className="text-sm font-medium">Title</label> */}
                  <Input
                    disabled={isView}
                    placeholder="Enter title"
                    className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                    value={item.treatmenttitle || ""}
                    onChange={(e) => {
                      const updated = [...data.treatmentDetails]
                      updated[index].treatmenttitle = e.target.value
                      setData({ ...data, treatmentDetails: updated })
                    }}
                  />
                </div>

                {/* Button URL */}


                {/* Content */}
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Tiptap
                    content={item.treatmentcontent || ""}
                    onChange={(content: string) => {
                      setData((prev: any) => {
                        const updated = [...prev.treatmentDetails]
                        updated[index].treatmentcontent = content

                        return {
                          ...prev,
                          treatmentDetails: updated
                        }
                      })
                    }}
                  />
                </div>


                {/* Delete */}
                {!isView && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const updated = data.treatmentDetails.filter((_: any, i: number) => i !== index)
                      setData({ ...data, treatmentDetails: updated })
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))}

            {/* Add */}
            {!isView && (
              <Button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    treatmentDetails: [
                      ...data.treatmentDetails,
                      {
                        treatmenttitle: "",
                        treatmentbtnurl: "",
                        treatmentcontent: "",
                        treatmentimage: "",
                        fileKey: ""
                      }
                    ]
                  })
                }
              >
                + Add Treatment
              </Button>
            )}

          </DefaultCardComponent>
        </TabsContent>

        <TabsContent value="cards">
          <DefaultCardComponent title="Cards">
            <div className="space-y-1">
              {/* <label className="text-sm font-medium">Main Title</label> */}
              <Input
                disabled={isView}
                placeholder="Enter main title"
                className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                value={data.treatmentCards.maintreatmentcardtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    treatmentCards: {
                      ...data.treatmentCards,
                      maintreatmentcardtitle: e.target.value
                    }
                  })
                }
              />
            </div>
            <div className="space-y-1">
              {/* <label className="text-sm font-medium">Main Content</label> */}
              <Textarea
                disabled={isView}
                placeholder="Enter main content"
                className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                value={data.treatmentCards.maintreatmentcardcontent}
                onChange={(e) =>
                  setData({
                    ...data,
                    treatmentCards: {
                      ...data.treatmentCards,
                      maintreatmentcardcontent: e.target.value
                    }
                  })
                }
              />
            </div>

            {/* Cards Repeater */}
            <div className='px-10'>
              {(Array.isArray(data.treatmentCards.cards)
                ? data.treatmentCards.cards
                : []
              ).map((item: any, index: number) => (
                <div key={index} className="border p-4 mb-3 space-y-3 rounded-md">
                  <div className='grid grid-cols-2 gap-5 items-center '>
                    <div>
                      {/* <label className="text-sm font-medium">Card Title</label> */}
                      <Input
                        disabled={isView}
                        placeholder="Enter card title"
                        value={item.treatmentcardtitle || ""}
                        className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                        onChange={(e) => {
                          const updated = [...data.treatmentCards.cards]
                          updated[index].treatmentcardtitle = e.target.value
                          setData({
                            ...data,
                            treatmentCards: {
                              ...data.treatmentCards,
                              cards: updated
                            }
                          })
                        }}
                      />
                      <Textarea
                        disabled={isView}
                        placeholder="Enter card content"
                        className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-24 rounded-lg !shadow-none !ring-0"
                        value={item.treatmentcardcontent || ""}
                        onChange={(e) => {
                          const updated = [...data.treatmentCards.cards]
                          updated[index].treatmentcardcontent = e.target.value
                          setData({
                            ...data,
                            treatmentCards: {
                              ...data.treatmentCards,
                              cards: updated
                            }
                          })
                        }}
                      />
                      {/* Delete (last item safe) */}
                      {!isView && data.treatmentCards.cards.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const updated = data.treatmentCards.cards.filter(
                              (_: any, i: number) => i !== index
                            )
                            setData({
                              ...data,
                              treatmentCards: {
                                ...data.treatmentCards,
                                cards: updated
                              }
                            })
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </div>

                    {/* Image Upload */}
                    {!isView && !item.treatmentcardimage && (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          const updated = [...data.treatmentCards.cards]
                          updated[index].treatmentcardimage = res[0].ufsUrl
                          updated[index].fileKey = res[0].key
                          setData({
                            ...data,
                            treatmentCards: {
                              ...data.treatmentCards,
                              cards: updated
                            }
                          })
                        }}
                      />
                    )}

                    {item.treatmentcardimage &&
                      <>
                        <div className="mb-0 border-2 border-blue-400 rounded-3xl">
                          <div className="relative h-60 w-full  rounded-3xl">
                            <Image
                              src={item.treatmentcardimage}
                              alt="Uploaded"
                              width={600}
                              height={600}
                              className="h-60 w-full overflow-hidden rounded-3xl object-cover"
                            />
                            {!isView && (
                              <button
                                onClick={async (e) => {
                                  e.preventDefault()
                                  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${item.fileKey}`, {
                                    method: "DELETE",
                                    headers: { "Content-Type": "application/json" }
                                  });
                                  setData((prev: any) => {
                                    const updated = [...prev.treatmentCards.cards]
                                    updated[index].treatmentcardimage = ""
                                    updated[index].fileKey = ""

                                    return {
                                      ...prev,
                                      treatmentCards: {
                                        ...prev.treatmentCards,
                                        cards: updated
                                      }
                                    }
                                  })
                                }}
                                className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-sm rounded cursor-pointer duration-500 hover:scale-105"
                              >
                                Remove
                              </button>)}
                          </div>
                        </div>
                      </>
                    }
                  </div>


                </div>
              ))}
              {/* Add Button */}
              {!isView && (
                <Button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      treatmentCards: {
                        ...data.treatmentCards,
                        cards: [
                          ...data.treatmentCards.cards,
                          {
                            treatmentcardtitle: "",
                            treatmentcardcontent: "",
                            treatmentcardimage: "",
                            fileKey: ""
                          }
                        ]
                      }
                    })
                  }
                >
                  + Add Card
                </Button>
              )}
            </div>


          </DefaultCardComponent>
        </TabsContent>

        <TabsContent value="curable">
          <DefaultCardComponent title="Curable">
            {/* Main Title */}
            <div className="space-y-1">
              {/* <label className="text-sm font-medium">Main Title</label> */}
              <Input
                disabled={isView}
                className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                placeholder="Enter main title"
                value={data.cancerCurable.maintitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    cancerCurable: {
                      ...data.cancerCurable,
                      maintitle: e.target.value
                    }
                  })
                }
              />
            </div>


            <div className="my-4">
              <Textarea
                disabled={isView}
                className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                placeholder="Enter main description"
                value={data.cancerCurable.maindesc || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    cancerCurable: {
                      ...data.cancerCurable,
                      maindesc: e.target.value
                    }
                  })
                }
              />
            </div>
            {/* Main Note */}
            <div className="space-y-1 my-4">
              <Textarea
                placeholder="Enter note"
                className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                value={data.cancerCurable.mainnote}
                onChange={(e) =>
                  setData({
                    ...data,
                    cancerCurable: {
                      ...data.cancerCurable,
                      mainnote: e.target.value
                    }
                  })
                }
              />
            </div>

            {/* Repeater Items */}
            <div className='px-10'>
              {(Array.isArray(data.cancerCurable.items)
                ? data.cancerCurable.items
                : []
              ).map((item: any, index: number) => (
                <div key={index} className="border p-4 mb-3 space-y-3 rounded-md">

                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={item.title || ""}
                      onChange={(e) => {
                        const updated = [...data.cancerCurable.items]
                        updated[index].title = e.target.value
                        setData({
                          ...data,
                          cancerCurable: {
                            ...data.cancerCurable,
                            items: updated
                          }
                        })
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <div className="border rounded-md p-2">
                      <Tiptap
                        content={item.content || ""}
                        onChange={(content: string) => {
                          const updated = [...data.cancerCurable.items]
                          updated[index].content = content
                          setData({
                            ...data,
                            cancerCurable: {
                              ...data.cancerCurable,
                              items: updated
                            }
                          })
                        }}
                      />
                    </div>
                  </div>

                  {/* Delete */}
                  {!isView && data.cancerCurable.items.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const updated = data.cancerCurable.items.filter(
                          (_: any, i: number) => i !== index
                        )
                        setData({
                          ...data,
                          cancerCurable: {
                            ...data.cancerCurable,
                            items: updated
                          }
                        })
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              ))}

              {/* Add */}
              {!isView && (
                <Button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      cancerCurable: {
                        ...data.cancerCurable,
                        items: [
                          ...data.cancerCurable.items,
                          { title: "", content: "" }
                        ]
                      }
                    })
                  }
                >
                  + Add Item
                </Button>
              )}
            </div>



          </DefaultCardComponent>
        </TabsContent>

        <TabsContent value="faq">
          <DefaultCardComponent title="FAQ">
            <Input
              disabled={isView}
              placeholder="FAQ Main Title"
              className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
              value={data.faq.maintitle || ""}
              onChange={(e) =>
                setData((prev: any) => ({
                  ...prev,
                  faq: {
                    ...prev.faq,
                    maintitle: e.target.value
                  }
                }))
              }
            />
            <div className='px-10'>
              {(Array.isArray(data.faq.items) ? data.faq.items : []).map(
                (item: any, index: number) => (
                  <div key={index} className="border p-4 mb-3 space-y-3 rounded-md">

                    {/* Question */}
                    <div>
                      <label className="text-sm font-medium">Question</label>
                      <Input
                        disabled={isView}
                        className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0"
                        placeholder="Enter question"
                        value={item.question || ""}
                        onChange={(e) => {
                          const updated = [...data.faq.items]
                          updated[index].question = e.target.value
                          setData({
                            ...data,
                            faq: { ...data.faq, items: updated }
                          })
                        }}
                      />
                    </div>

                    {/* Answer */}
                    <div>
                      <label className="text-sm font-medium">Answer</label>
                      <Textarea
                        disabled={isView}
                        className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-20 rounded-lg !shadow-none !ring-0"
                        placeholder="Enter answer"
                        value={item.answer || ""}
                        onChange={(e) => {
                          const updated = [...data.faq.items]
                          updated[index].answer = e.target.value
                          setData({
                            ...data,
                            faq: { ...data.faq, items: updated }
                          })
                        }}
                      />
                    </div>

                    {/* Delete (last item safe) */}
                    {!isView && data.faq.items.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const updated = data.faq.items.filter(
                            (_: any, i: number) => i !== index
                          )
                          setData({
                            ...data,
                            faq: { ...data.faq, items: updated }
                          })
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                )
              )}
              {!isView && (
                <Button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      faq: {
                        ...data.faq,
                        items: [
                          ...data.faq.items,
                          { question: "", answer: "" }
                        ]
                      }
                    })
                  }
                >
                  + Add FAQ
                </Button>
              )}
            </div>
          </DefaultCardComponent>
        </TabsContent>

        <TabsContent value="cta">
          <DefaultCardComponent title="CTA">
            <Input placeholder="Call Title" disabled={isView} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={data.calltoaction.title} onChange={(e) =>
              setData({ ...data, calltoaction: { ...data.calltoaction, title: e.target.value } })
            } />
            <Textarea placeholder="Call Description" disabled={isView} className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={data.calltoaction.desc} onChange={(e) =>
              setData({ ...data, calltoaction: { ...data.calltoaction, desc: e.target.value } })
            } />
            <Input placeholder="Button Name" disabled={isView} className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={data.calltoaction.btnname} onChange={(e) =>
              setData({ ...data, calltoaction: { ...data.calltoaction, btnname: e.target.value } })
            } />
            <Input placeholder="Button URL" disabled={isView} className="border my-4 border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" value={data.calltoaction.btnurl} onChange={(e) =>
              setData({ ...data, calltoaction: { ...data.calltoaction, btnurl: e.target.value } })
            } />
          </DefaultCardComponent>
        </TabsContent>

      </Tabs>

      {!isView && <Button type="submit">Save Treatment</Button>}
    </form>
  )
}

export default AddTreatment