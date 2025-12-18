import { Link } from 'react-router-dom';
import { useState } from 'react';

const BlogListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Blog posts data - matching the posts in BlogPostPage
  const blogPosts = [
    {
      id: 'data-democratization',
      title: 'Unlocking Value at Scale: Data Democratization as the Cornerstone of Modern Financial Services',
      excerpt: 'Data democratization has emerged as a critical enabler for organizations seeking to unlock new revenue streams, drive operational efficiency, and foster innovation.',
      date: 'December 2025',
      category: 'Strategy',
      readTime: '8 min read',
    },
    {
      id: 'pipeline-to-power',
      title: 'Pipeline to Power: Building Trustworthy Data in the Age of Modernization',
      excerpt: 'Modern data pipelines are the unsung heroes of transformation, orchestrating the flow from messy, disparate sources to clean, actionable insights.',
      date: 'December 2025',
      category: 'Engineering',
      readTime: '10 min read',
    },
    {
      id: 'legacy-modernization',
      title: 'Breaking the Chains: Legacy Modernization for the Digital Age',
      excerpt: 'Legacy modernization has become a strategic imperative for organizations across industries. Learn how to navigate the challenges and unlock value.',
      date: 'December 2025',
      category: 'Transformation',
      readTime: '7 min read',
    },
    {
      id: 'database-migration',
      title: 'Beyond Boundaries: Mastering Database Migration in the Modern Enterprise',
      excerpt: 'Database migration is no longer just a technical upgrade—it\'s a strategic move that can unlock agility, scalability, and cost savings.',
      date: 'December 2025',
      category: 'Engineering',
      readTime: '9 min read',
    },
  ];

  const categories = ['All', 'Strategy', 'Engineering', 'Transformation'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(0, 217, 255, 0.08), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06), transparent 50%)
            `
          }}
        />
        
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero font-extrabold mb-6 text-white">
              Blog & <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-body-large text-[#a0aec0] mb-8 max-w-2xl mx-auto leading-relaxed">
              Insights, thought leadership, and practical guidance on data, AI, and digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-[#0f1625] border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg text-body-small font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#00b8d4] text-[#0a0f1c]'
                    : 'bg-[#151b2e] text-[#a0aec0] hover:text-white hover:bg-[#1c2438] border border-[rgba(255,255,255,0.1)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-body text-[#a0aec0]">No posts found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="card group hover:border-[rgba(0,217,255,0.3)] transition-all"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[rgba(0,217,255,0.1)] text-[#00d9ff] text-caption font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-h3 font-bold text-white mb-3 group-hover:text-[#00d9ff] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-body-small text-[#a0aec0] mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-caption text-[#718096] pt-4 border-t border-[rgba(255,255,255,0.1)]">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-4 text-[#00d9ff] text-body-small font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="card max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-extrabold mb-4 text-white">Stay Updated</h2>
            <p className="text-body text-[#a0aec0] mb-6 leading-relaxed">
              Subscribe to our newsletter to receive the latest insights, thought leadership, and updates on data, AI, and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#718096] focus:outline-none focus:border-[#00d9ff] transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;
