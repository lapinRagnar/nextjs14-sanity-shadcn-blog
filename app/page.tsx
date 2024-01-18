import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0 // revalidate at most 0 hour

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
    <main className="">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        { data && data.map((post, index) => (
          
          <Card key={index}>

            <CardContent className="p-5">


              <Image 
                src={urlFor(post.titleImage).url()} 
                alt={post.title} 
                width={300} 
                height={300} 
                className="w-full h-full object-cover"  
              />


              <h3 className="text-lg line-clamp-2 my-5 text-gray-100 font-bold">{post.title}</h3>
              <p className="text-sm line-clamp-3 mb-5 text-gray-400">{post.smallDescription}</p>

              <Button asChild className="w-full ">
                <Link href={`/blog/${post.currentSlug}`}>Lire la suite</Link>
              </Button>

            </CardContent>
            
          </Card>
          
        ))}
      </div>
    </main>
  )
}
