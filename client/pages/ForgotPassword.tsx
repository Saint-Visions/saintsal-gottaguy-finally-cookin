import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
            alt="SaintVisionAI Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text font-dialien">
              SaintVisionAI™
            </h1>
            <p className="text-xs text-gold-300 -mt-1">Password Reset</p>
          </div>
        </div>

        <Link to="/signin">
          <Button className="text-white hover:text-gold-300 bg-transparent border-none shadow-none">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Sign In
          </Button>
        </Link>
      </nav>

      <div className="relative z-40 flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-md w-full">
          <div className="glass-morphism p-8 rounded-xl">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-300" />
                  </div>
                  <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
                  <p className="text-white/80">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 bg-charcoal-800 border-charcoal-600 text-white placeholder:text-white/70 focus:border-gold-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow h-12 text-lg font-semibold"
                  >
                    Send Reset Link
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-white/70">
                    Remember your password?{" "}
                    <Link to="/signin" className="text-gold-300 hover:text-gold-200 font-semibold">
                      Sign In
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-300" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-green-300">Check Your Email</h1>
                <p className="text-white/80 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-white/70 text-sm mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-gold-500 text-charcoal-900 hover:bg-gold-400"
                  >
                    Try Again
                  </Button>
                  <Link to="/signin">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
