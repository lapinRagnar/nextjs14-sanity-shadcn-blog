https://www.youtube.com/watch?v=Lydgf-Hvla4

# configuration du projet
## 1. installer sanity

```bash
npm create sanity@latest -- --template clean --create-project "next14-blog" --dataset production
```

## 2. configurer un schemas
on creer un fichier sanity\schemas\blog.ts avec
> app\sanity\schemas\blog.ts
```ts

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

```

et dans le sanity\schemas\index.ts on importe notre blog schema

> app\sanity\schemas\index.ts
```ts
import blog from "./blog"

export const schemaTypes = [blog]

```

## 3. lancer le sanity studio
```cmd
cd sanity
npm run dev 
```
maintenant on lancer le studio sur : http://localhost:3333/

et on peut creer un blog avec le studio






