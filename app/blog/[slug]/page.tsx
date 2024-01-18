import { fullBlog } from "@/lib/interface"
import { client, urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import Image from "next/image"

export const revalidate = 0 // revalidate at most 0 hour

async function getData(slug: string) {

  const query = `

    * [_type == 'blog' && slug.current == '${slug}'] {
        smallDescription,
        "currentSlug": slug.current,
        title,
        content,
        titleImage
      } [0]

  `
  const data: fullBlog = await client.fetch(query)
  
  return data

}

const BlogDetails = async ({params}: {params: {slug: string}}) => {

  const data = await getData(params.slug)

  console.log("les données par slug", data)

  
  return (
    <div className="mt-8 flex gap-8">


      <Image 
        src={urlFor(data?.titleImage).url()} 
        alt={data?.title} 
        width={500} 
        height={500} 
        priority
        className="w-full h-full object-cover"
        />


        <div>

          <h1>
            <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">lapinragnar - blog</span>  
            <span 
              className="mt-2 block text-3xl light:text-secondary text-center leading-8 font-extrabold tracking-tight sm:text-4xl
                md:text-gray-400
              ">
              {data?.title}
            </span>
          </h1>

          <div className="mt-8 prose lg:prose-p: dark:prose-invert">
            <PortableText value={data?.content} />
          </div>

        </div>

    </div>
  )
}

export default BlogDetails