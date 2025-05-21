import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-cream font-sans flex flex-col items-center justify-center px-6 py-12 sm:px-20 gap-16 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-cream opacity-10 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cream opacity-10 rounded-full blur-3xl z-0 animate-pulse"></div>

      {/* Hero Heading */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-center z-10">
        Welcome to <span className="text-cream/80">AI JobVerse</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl text-center max-w-2xl text-cream/70 z-10">
        Smart AI-powered job recommendations tailored to your skills and career goals.
      </p>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-6 z-10">
        <Link
          href="/components/signup"
          className="border border-cream text-cream font-semibold px-6 py-3 rounded-xl transition-colors duration-300
            bg-transparent hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-1"
        >
          Register as Job Seeker
        </Link>
        <Link
          href="/components/signin"
          className="border border-cream text-cream font-semibold px-6 py-3 rounded-xl transition-colors duration-300
            bg-transparent hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-1"
        >
          Login as Job Seeker
        </Link>
      </div>

      {/* Auth Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl z-10">
        {/* Sign Up Card */}
        <div className="bg-black/30 backdrop-blur-xl border border-cream/20 shadow-[0_0_30px_rgba(245,245,220,0.1)] hover:shadow-[0_0_40px_rgba(245,245,220,0.3)] rounded-3xl p-10 transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-center border-b border-cream/30 pb-2">
            Create Your Profile
          </h2>
          <p className="text-sm text-cream/60 mb-6 text-center">
            Sign up and let our AI analyze your skills to recommend the best job matches.
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-black/30 backdrop-blur-xl border border-cream/20 shadow-[0_0_30px_rgba(245,245,220,0.1)] hover:shadow-[0_0_40px_rgba(245,245,220,0.3)] rounded-3xl p-10 transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-center border-b border-cream/30 pb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-cream/60 mb-6 text-center">
            Log in to view AI-curated job recommendations and manage your applications.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-sm text-cream/50 mt-12 z-10 text-center">
        © 2025 AI JobVerse Inc. Empowering your career with AI and Next.js.
      </footer>
    </div>
  );
}
