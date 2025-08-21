import URLHistory from '@/components/URLHistory'

export default function HistoryPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Your History</h1>
      <URLHistory />
    </main>
  )
}