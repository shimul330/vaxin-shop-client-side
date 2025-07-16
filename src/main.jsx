import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './router/Router.jsx'
import { LanguageProvider } from './Context/LanguageContext.jsx'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { CartProvider } from './Context/CartContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className='font-roboto'>
          <AuthProvider>
            <CartProvider>

              <RouterProvider router={router}></RouterProvider>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              ></ToastContainer>

            </CartProvider>
          </AuthProvider>


        </div>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>,
)
