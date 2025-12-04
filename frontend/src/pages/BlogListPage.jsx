import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const blogPosts = [
    {
      id: 'data-democratization',
      title: 'Unlocking Value at Scale: Data Democratization as the Cornerstone of Modern Financial Services',
      excerpt: 'In 2025, financial services and insurance organizations are at a crossroads. The relentless pace of digital transformation has made data not just an asset, but the foundation for competitive differentiation.',
      category: 'DATA STRATEGY',
      author: 'Qelyx Insights',
      date: 'December 2025',
      color: '#2A2A2A'
    },
    {
      id: 'pipeline-to-power',
      title: 'Pipeline to Power: Building Trustworthy Data in the Age of Modernization',
      excerpt: 'In today\'s digital-first world, data is the fuel for innovation, analytics, and AI. But raw data alone is not enough. The real value is unlocked only when data is trustworthy, curated, standardized, and transformed.',
      category: 'DATA ENGINEERING',
      author: 'Qelyx Insights',
      date: 'December 2025',
      color: '#4b9fe1'
    },
    {
      id: 'legacy-modernization',
      title: 'Breaking the Chains: Legacy Modernization for the Digital Age',
      excerpt: 'In a world where digital agility defines winners and laggards, legacy modernization has become a strategic imperative for organizations across industries.',
      category: 'MODERNIZATION',
      author: 'Qelyx Insights',
      date: 'December 2025',
      color: '#28559a'
    },
    {
      id: 'database-migration',
      title: 'Beyond Boundaries: Mastering Database Migration in the Modern Enterprise',
      excerpt: 'Database migration is no longer just a technical upgrade—it\'s a strategic move that can unlock agility, scalability, and cost savings for organizations.',
      category: 'DATA ENGINEERING',
      author: 'Qelyx Insights',
      date: 'December 2025',
      color: '#2A2A2A'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Insights & Perspectives
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Thought leadership and practical guidance on data strategy, analytics, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundColor: post.color }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-white">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-4 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-white/80 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white">{post.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;

