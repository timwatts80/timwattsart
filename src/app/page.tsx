export default function LinksPage() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/timwatts.art",
      icon: "📸",
      description: "Art and photography"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/timwattsart",
      icon: "🐦",
      description: "Updates and thoughts"
    },
    {
      name: "Portfolio",
      url: "https://timwatts.art",
      icon: "🎨",
      description: "Full portfolio"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/timwatts",
      icon: "💼",
      description: "Professional network"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              🎨
            </div>
            <h1 className="text-3xl font-bold mb-2">Tim Watts</h1>
            <p className="text-gray-400">Artist & Creative</p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{link.icon}</span>
                    <div>
                      <h3 className="font-semibold">{link.name}</h3>
                      <p className="text-sm text-gray-400">{link.description}</p>
                    </div>
                  </div>
                  <span className="text-white/60">→</span>
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>© 2024 Tim Watts. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
