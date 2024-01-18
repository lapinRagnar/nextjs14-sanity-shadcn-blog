import { Button } from "@/components/ui/button";
import { simpleBlogCard } from "@/lib/interface";
import { client } from "@/lib/sanity";

async function getData() {

  const query = `
  
  *[_type == 'blog'] | order(_createdAt desc) {
    title, 
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }
  
  `
  const data: simpleBlogCard[] = await client.fetch(query)

  return data

}

export default async function Home() {

  const data = await getData()

  console.log("les données", data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div>
        salut
        <Button>test</Button>
      </div>
    </main>
  )
}
