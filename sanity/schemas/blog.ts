export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre du blog'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'slog du blog',
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Image du blog',
    }, 
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Pesite description'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Contenu du blog',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
}