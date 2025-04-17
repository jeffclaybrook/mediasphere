import { notFound } from "next/navigation"
import { shows } from "@/data/data"
import Navbar from "@/components/channel/navbar"
import Slides from "../(components)/slides"
import Tabs from "../(components)/tabs"
import VideoDetails from "../(components)/video-details"
import VideoPlayer from "../(components)/video-player"

export default async function Show({ params }: { params: Promise<{ id: string }>}) {
 const { id } = await params
 const show = shows.find((show) => show.id === id)

 if (!show) return notFound()

 return (
  <>
   <Navbar />
   <main className="px-4">
    <section className="pb-8">
     <div className="grid lg:grid-cols-12 gap-4">
      <div className="flex flex-col lg:col-span-7 gap-4 mb-4">
       <VideoPlayer
        src={show.video}
        chapters={show.chapters}
        captions={show.captions}
       />
       <VideoDetails
        title={show.title}
        description={show.description}
        tags={show.tags}
       />
      </div>
      <Slides
       slides={show.slides}
       alt={show.title}
      />
     </div>
     <Tabs />
    </section>
   </main>
  </>
 )
}