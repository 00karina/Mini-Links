'use client'

import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import QRCode from 'react-qr-code'
 
interface IUrl{
createdAt:string
originalUrl:string
shortId:string
userId:string
_id: string
}
export default function URLHistory() {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => setUrls(data.urls || []))
  }, [])

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(urls, null, 2)], { type: 'application/json' })
    saveAs(blob, 'url-history.json')
  }

  const downloadCSV = () => {

    const headers = ['Original URL', 'Short ID']
    const rows = urls.map((u: IUrl) => [u.originalUrl, u.shortId])
    const csvContent =
      [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'url-history.csv')
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-end gap-4 mb-4">
        <button onClick={downloadCSV} disabled={urls.length === 0} className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded">Download CSV</button>
        <button onClick={downloadJSON} disabled={urls.length === 0} className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded">Download JSON</button>
      </div>

      {urls.length > 0 ? (
        <ul className="space-y-4">
          {urls.map((u: IUrl) => {
            const fullUrl = `${window.location.origin}/${u.shortId}`
            return (
              <li key={u._id} className="bg-white p-4 rounded shadow">
                <a href={u.originalUrl} target="_blank" className="text-blue-600 underline">
                  {fullUrl}
                </a>

                <div className="mt-2">
                  <QRCode value={fullUrl} size={100} />
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No history found</p>
      )}
    </div>
  )
}
