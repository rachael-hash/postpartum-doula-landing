import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download } from "lucide-react"

export default function Success() {
  return (
    <div className="min-h-screen bg-[#F8FAF6] flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-[#4A9B5E] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2C5F41] mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your guide is ready for download.</p>
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-[#4A9B5E] hover:bg-[#2C5F41]">
            <Download className="mr-2 h-4 w-4" />
            Download Your Guide
          </Button>

          <p className="text-sm text-muted-foreground">A download link has also been sent to your email address.</p>

          <Link href="/">
            <Button variant="outline" className="w-full border-[#4A9B5E] text-[#4A9B5E] bg-transparent">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
