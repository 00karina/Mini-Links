'use client'

import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import AuthForm from '@/components/AuthForm'

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Too Short!').required('Password is required'),
})

export default function RegisterPage() {
  const [registerError, setRegisterError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Clear error after 3s
  useEffect(() => {
    if (registerError) {
      const timer = setTimeout(() => setRegisterError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [registerError])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => router.push('/login'), 3000)
      return () => clearTimeout(timer)
    }
  }, [message, router])
  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (submitting: boolean) => void }
  ) => {
    setRegisterError('')
    setMessage('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        setMessage('You have been registered! Redirecting to login...')
      } else {
        const data = await res.json()
        setRegisterError(data.message || 'Registration failed')
      }
    } catch (err) {
      setRegisterError('Something went wrong')
    }

    setSubmitting(false)
  }

    
  

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-6 text-center">Register</h1>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex flex-col gap-4">
            <AuthForm />

            <Button
              type="submit"
              varient="PRIMARY"
              label={isSubmitting ? 'Registering...' : 'Register'}
              disabled={!(isValid && dirty) || isSubmitting}
            />
          </Form>
        )}
      </Formik>

      {registerError && (
        <div className="text-red-600 text-sm text-center mt-2">{registerError}</div>
      )}
        {message && (
        <div className="text-green-600 text-sm text-center mt-2">{message}</div>
      )}
    </div>
  )
}
