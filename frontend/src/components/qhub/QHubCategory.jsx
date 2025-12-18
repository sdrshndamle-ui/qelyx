// QHub Category Component
// Renders a category section with its tiles

const QHubCategory = ({ category, catIndex, setActiveModal }) => {
  return (
    <section className={`py-12 ${catIndex % 2 === 1 ? 'bg-[#0f1625]' : ''}`}>
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
          <p className="text-[#a0aec0] text-sm">{category.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
          {category.items.map((item) => (
            <div
              key={item.id}
              className="bg-[#151b2e] rounded-xl p-5 hover:bg-[#1c2438] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,217,255,0.3)] transition-all group flex flex-col h-full"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-[#a0aec0] text-sm mb-4 leading-relaxed flex-grow">{item.description}</p>
              <button
                onClick={() => setActiveModal(item.id)}
                className="w-full text-center px-4 py-2 text-sm font-medium rounded-lg border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.05)] transition group-hover:border-[#00d9ff] group-hover:text-[#00d9ff] mt-auto"
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

