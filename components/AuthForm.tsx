import { ErrorMessage, Field } from 'formik'
import React from 'react'

const AuthForm = () => {
  return (
    <>
    <div>
    <Field
      name="email"
      type="email"
      placeholder="Email"
      className="w-full border border-gray-300 rounded p-2"
    />
    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
  </div>

  <div>
    <Field
      name="password"
      type="password"
      placeholder="Password"
      className="w-full border border-gray-300 rounded p-2"
    />
    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
  </div>
  </>
  )
}

export default AuthForm
