import { notFound } from "next/navigation"
import { shows } from "@/data/data"
import Navbar from "@/components/channel/navbar"
import Player from "../(components)/player"
import Slides from "../(components)/slides"
import Tabs from "../(components)/tabs"

export default async function ShowPage({ params }: { params: Promise<{ id: string }>}) {
 const { id } = await params
 const show = shows.find((s) => s.id === id)

 if (!show) return notFound()

 return (
  <>
   <Navbar />
   <main className="px-4">
    <section className="pb-8">
     <div className="grid lg:grid-cols-12 gap-4">
      <Player
       src={show.video}
       chapters={show.chapters}
       captions={show.captions}
       title={show.title}
       description={show.description}
       tags={show.tags}
      />
      <Slides
       slides={show.slides}
       alt={show.title}
      />
      <Tabs />
     </div>
    </section>
   </main>
  </>
 )
}