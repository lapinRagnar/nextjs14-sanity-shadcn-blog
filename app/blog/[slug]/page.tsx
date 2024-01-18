
const BlogDetails = ({params}: {params: {slug: string}}) => {
  return (
    <div>
      <h1>le slug est = {params.slug}</h1>
    </div>
  )
}

export default BlogDetails