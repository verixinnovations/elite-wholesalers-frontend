export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string;
  author?: string;
}

export function useSEO(config: SEOConfig) {
  const baseUrl = 'https://nakanaki.com';
  const url = config.url || baseUrl;
  const image = config.image || `${baseUrl}/og-image.jpg`;

  useHead({
    title: config.title,
    meta: [
      {
        name: 'description',
        content: config.description,
      },
      ...(config.keywords ? [{ name: 'keywords', content: config.keywords }] : []),
      ...(config.author ? [{ name: 'author', content: config.author }] : []),
      {
        property: 'og:title',
        content: config.title,
      },
      {
        property: 'og:description',
        content: config.description,
      },
      {
        property: 'og:image',
        content: image,
      },
      {
        property: 'og:url',
        content: url,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: config.title,
      },
      {
        name: 'twitter:description',
        content: config.description,
      },
      {
        name: 'twitter:image',
        content: image,
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
  });
}

export function useStructuredData(data: any) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(data),
      },
    ],
  });
}
