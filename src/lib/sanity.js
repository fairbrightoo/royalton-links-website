import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// --- SANITY CONFIGURATION ---
// You will replace these with your actual Sanity project details later
export const client = createClient({
    projectId: 'your-project-id', // e.g. 'a1b2c3d4'
    dataset: 'production',
    useCdn: true, // set to false if you want to bypass the edge cache
    apiVersion: '2024-03-01', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
};

// --- MOCK DATA FOR UI DEVELOPMENT ---
// This will be used until you connect your actual Sanity project
export const mockPosts = [
    {
        _id: '1',
        title: 'The Future of Strategic Land Banking in Nigeria',
        slug: { current: 'future-of-land-banking-nigeria' },
        publishedAt: '2026-06-15T10:00:00Z',
        mainImage: 'https://images.unsplash.com/photo-1575422896593-c4083a21bb01?q=80&w=2400&auto=format&fit=crop',
        excerpt: 'Discover why early acquisition in emerging corridors represents the most secure wealth-building strategy for the next decade.',
        body: [
            {
                _type: 'block',
                children: [{ _key: 'a', _type: 'span', text: 'Land banking remains one of the most reliable strategies for wealth preservation and aggressive capital appreciation in emerging markets. At Royalton Links Ltd, we have identified key infrastructure corridors that are primed for exponential growth.' }]
            },
            {
                _type: 'block',
                children: [{ _key: 'b', _type: 'span', text: 'By securing positions ahead of government infrastructure rollouts, our investors consistently see premium ROI that outperforms traditional financial instruments.' }]
            }
        ]
    },
    {
        _id: '2',
        title: 'Designing for Tomorrow: Sustainable Architecture',
        slug: { current: 'sustainable-architecture' },
        publishedAt: '2026-05-22T14:30:00Z',
        mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop',
        excerpt: 'How Royalton Properties is integrating smart technologies and sustainable materials into luxury real estate.',
        body: [
            {
                _type: 'block',
                children: [{ _key: 'c', _type: 'span', text: 'Luxury is no longer just about aesthetics; it is about harmony with the environment. Our latest developments incorporate solar integration, smart-home energy management, and sustainable materials.' }]
            }
        ]
    },
    {
        _id: '3',
        title: 'Navigating Diaspora Investments in Real Estate',
        slug: { current: 'diaspora-investments' },
        publishedAt: '2026-04-10T09:15:00Z',
        mainImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2400&auto=format&fit=crop',
        excerpt: 'A comprehensive guide for Nigerians abroad looking to securely and profitably invest back home.',
        body: [
            {
                _type: 'block',
                children: [{ _key: 'd', _type: 'span', text: 'For many in the diaspora, investing back home can be fraught with uncertainty. We have built a transparent, structured investment corridor that guarantees peace of mind.' }]
            }
        ]
    }
];

// Helper function to fetch posts (uses mock data for now)
export async function getPosts() {
    // UNCOMMENT THIS ONCE SANITY IS SETUP:
    // return await client.fetch('*[_type == "post"] | order(publishedAt desc)');
    
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockPosts), 500); // Simulate network delay
    });
}

export async function getPostBySlug(slug) {
    // UNCOMMENT THIS ONCE SANITY IS SETUP:
    // return await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug });

    return new Promise((resolve) => {
        const post = mockPosts.find(p => p.slug.current === slug);
        setTimeout(() => resolve(post), 500);
    });
}
