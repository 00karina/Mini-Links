'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import Button from './Button'

export default function URLForm() {
  const [short, setShort] = useState('')
  const [copied, setCopied] = useState(false)
  const [apiError, setApiError] = useState('')

  const formik = useFormik({
    initialValues: {
      url: '',
      alias: '',
    },
    validationSchema: Yup.object({
      url: Yup.string()
        .url('Enter a valid URL')
        .required('URL is required'),
      alias: Yup.string().optional(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setApiError('')
      setShort('')
      try {
        const res = await fetch('/api/shorten', {
          method: 'POST',
          body: JSON.stringify({
            originalUrl: values.url,
            customAlias: values.alias,
          }),
        })
    
        const data = await res.json()
    
        if (res.ok && data.shortId) {
          setShort(`${window.location.origin}/${data.shortId}`)
          resetForm()
        } else {
          
          setApiError(data.error || data.message || 'Something went wrong')
        }
      } catch (err) {
        console.error(err)
        setApiError('Something went wrong. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
    
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(short)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }
const {handleSubmit,errors,touched,handleChange,values,handleBlur,isSubmitting}=formik
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-12 lg:gap-0 flex-col md:flex-row justify-between px-4 md:px-10"
    >
      <div className="flex flex-col w-full lg:w-[800px] gap-2">
        <input
          name="url"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter URL"
          className={`outline-none text-[20px] font-mono bg-white px-5 w-full h-[100px] rounded-md ${
            touched.url && errors.url
              ? 'border-2 border-red-500'
              : ''
          }`}
        />
        {touched.url && errors.url && (
          <p className="text-red-500 text-sm">{errors.url}</p>
        )}

        <input
          name="alias"
          value={values.alias}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Custom alias (optional)"
          className="border p-2 my-2 rounded-md"
        />

        {apiError && (
          <p className="text-red-600 font-medium mt-2">{apiError}</p>
        )}

        <div className="mt-6 w-full">
          <Button
            type="submit"
            varient="PRIMARY"
            label={isSubmitting ? 'Shortening...' : 'Shorten'}
            disabled={!values.url || isSubmitting}
          />
        </div>

        {copied && (
          <div className="bg-green-400 text-white font-medium px-4 py-2 rounded mb-4">
            Copied to clipboard.
          </div>
        )}

        {short && (
          <div className="flex items-center gap-2 mt-4">
            <a
              href={short}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {short}
            </a>
            <button
      onClick={() => {
        setShort('');
      
        setCopied(false);
      }}
      className="text-gray-500 hover:text-red-600 text-xl font-bold cursor-pointer"
      title="Clear"
    >
      ×
    </button>
            <button
              onClick={handleCopy}
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm cursor-pointer"
            >
              Copy
            </button>
          </div>
        )}
      </div>

      <div className="w-full">
        <Image
          src="/image/landing.png"
          alt="image"
          width={400}
          height={100}
          className="mx-auto"
        />
      </div>
    </form>
  )
}
