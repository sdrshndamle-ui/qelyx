// QHub Category Component
// Renders a category section with its tiles

const QHubCategory = ({ category, index, onTileClick }) => {
  return (
    <section className={`py-12 ${index % 2 === 1 ? 'bg-[#0F1E2E]' : ''}`}>
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
          <p className="text-gray-400 text-sm">{category.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
          {category.items.map((item) => (
            <div
              key={item.id}
              className="bg-[#1E2A38] rounded-xl p-5 hover:bg-[#243447] transition-colors group flex flex-col h-full"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow">{item.description}</p>
              <button
                onClick={() => onTileClick(item.id)}
                className="w-full text-center px-4 py-2 text-sm font-medium rounded-lg border border-white/20 text-white hover:bg-white/10 transition group-hover:border-accent-aqua group-hover:text-accent-aqua mt-auto"
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QHubCategory;

