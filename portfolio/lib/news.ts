export async function fetchLatestNews() {
  const apiKey = process.env.HOMESPH_NEWS_API_KEY;
  const apiUrl = process.env.HOMESPH_NEWS_API_URL;

  const mockArticles = [
    {
      id: '1',
      title: 'Philippine Property Sector Set for Steady Growth in 2026',
      summary: 'Market analysts project a 5.6% GDP growth driven by strong demand in the residential and commercial property sectors.',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      published_at: '2026-03-09T08:00:00Z',
      author: 'HomesPh News',
      slug: 'philippine-property-growth-2026',
      category: 'Market Trends'
    },
    {
      id: '2',
      title: 'Meta Business Verification Scam Targets Filipino Users',
      summary: 'Cybersecurity watchdogs warn local business owners against a sophisticated phishing campaign impersonating Meta support.',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
      published_at: '2026-03-28T10:00:00Z',
      author: 'HomesPh News',
      slug: 'meta-business-scam-warning',
      category: 'Security'
    },
    {
      id: '3',
      title: 'PH House Targets Approval of 17 Priority Bills',
      summary: 'Legislative updates including the Digital Payments Act and Universal Access to Quality Education amendments are set for final reading.',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1470&auto=format&fit=crop',
      published_at: '2026-03-16T14:30:00Z',
      author: 'HomesPh News',
      slug: 'ph-priority-bills-update',
      category: 'Legislative'
    }
  ];

  if (!apiKey || !apiUrl) {
    return mockArticles;
  }

  try {
    const response = await fetch(`${apiUrl}/api/external/articles`, {
      headers: {
        'X-Site-Api-Key': apiKey,
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return mockArticles;

    const json = await response.json();
    const articles = json.data?.data || [];
    
    // If API returns no articles, use the realistic news data
    return articles.length > 0 ? articles : mockArticles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return mockArticles;
  }
}
