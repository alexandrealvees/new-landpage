import matter from 'gray-matter';

// Utilizamos import.meta.glob com 'raw' para ler o conteúdo textual dos arquivos .md
const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts() {
  const posts = Object.entries(mdFiles).map(([path, content]) => {
    // O nome do arquivo vira o slug (URL) do post
    const slug = path.split('/').pop().replace('.md', '');
    
    // Extrai o frontmatter (dados) e o content (corpo) do markdown
    const { data, content: body } = matter(content);

    return {
      slug,
      title: data.title || 'Untitled',
      category: data.category || 'Uncategorized',
      date: data.date || '',
      image: data.image || '',
      body
    };
  });

  // Você pode adicionar ordenação por data aqui se preferir
  return posts;
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}
