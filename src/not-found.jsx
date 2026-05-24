import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black text-primary mb-2">404</div>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। হয়তো সরানো হয়েছে বা URL ভুল।
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition"
      >
        ← হোমে ফিরে যাও
      </Link>
    </div>
  );
}