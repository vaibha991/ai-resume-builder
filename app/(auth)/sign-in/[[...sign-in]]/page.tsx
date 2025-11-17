"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push('/sign-up');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-indigo-600 opacity-30 blur-[150px] rounded-full"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-700 opacity-20 blur-[200px] rounded-full"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600 opacity-20 blur-[200px] rounded-full"></div>

      {/* Clerk Sign-In Card and custom button wrapper */}
      <div className="z-10">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            layout: {
              logoImageUrl: "",
              socialButtonsVariant: "blockButton",
            },
            variables: {
              borderRadius: "16px",
              colorPrimary: "#6366f1",
              colorText: "white",
              colorBackground: "rgba(255,255,255,0.05)",
              colorInputBackground: "rgba(255,255,255,0.15)",
              colorInputText: "white",
              colorShimmer: "rgba(255,255,255,0.2)",
            },
            elements: {
              rootBox:
                "shadow-2xl backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl",
              card:
                "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl",

              headerTitle: "text-white text-3xl font-bold",
              headerSubtitle: "text-gray-300",

              formFieldLabel: "text-gray-200",
              formFieldInput:
                "bg-white/10 border-white/20 text-white placeholder-gray-400",

              socialButtonsBlockButton:
                "bg-white/10 text-white border-white/20 transition-all duration-300 ease-out " +
                "hover:bg-white/20 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] " +
                "hover:scale-[1.03] active:scale-[0.98]",

              formButtonPrimary:
                "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-xl",

              // ⭐ HIDES the entire white footer section (sign-up prompt, secured by, dev mode)
              footer: "!hidden",
              
              // These are technically hidden by the 'footer' rule above, but kept for specificity in case the rule is ever changed:
              footerAction: "!hidden",
              footerActionText: "!hidden",
              footerActionLink: "!hidden",
              devModeNotice: "!hidden",
            },

          }}
        />

        {/* Dedicated Sign Up Button remains visible */}
        <div className="w-full mt-4 max-w-[400px] mx-auto">
          <button
            onClick={handleSignUpClick}
            className="w-full py-3 px-4 text-lg font-medium rounded-xl text-indigo-400 bg-white/5 border border-indigo-400/50 hover:bg-white/10 transition-colors shadow-lg"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}