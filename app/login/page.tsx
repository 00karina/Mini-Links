'use client'

import { signIn } from 'next-auth/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/Button'
import { useEffect, useState } from 'react'
import AuthForm from '@/components/AuthForm'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Too Short!').required('Password is required'),
})

export default function LoginPage() {
  const [loginError, setLoginError] = useState('')
  useEffect(() => {
    if (loginError) {
      const timer = setTimeout(() => setLoginError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [loginError])
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-6 text-center">Login</h1>


              <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoginError('') 

          const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false, 
          })

          if (res?.error) {
            setLoginError('Invalid Credentials')
          } else if (res?.ok) {
            window.location.href = '/' 
          }

          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex flex-col gap-4">
         <AuthForm/>

      
            <Button
            type="submit"
            varient="PRIMARY"
            label= {isSubmitting ? 'Logging in...' : 'Login'}
            disabled={!(isValid && dirty) || isSubmitting}
          />
  <p className="text-sm text-center mt-4">
  Not registered?{' '}
  <a href="/register" className="text-blue-600 hover:underline">
    Register Now
  </a>
</p>

          </Form>
          
        )}
       
      </Formik>
      {loginError && (
              <div className="text-red-600 text-sm text-center mt-2">
                {loginError}
              </div>
            )}
    </div>
  )
}
