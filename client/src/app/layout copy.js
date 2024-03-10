import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "./providers";
const inter = Inter({ subsets: ['latin'] })
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '../redux/reduxProvider';
import GraphQLProvider from './graphqlProvider'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
import { AntdRegistry } from '@ant-design/nextjs-registry';
export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <ReduxProvider>
        <AntdRegistry>
      <Providers>
      <ToastContainer
        hideProgressBar
        theme="dark"
        />
        <GraphQLProvider>
        {children}
        </GraphQLProvider>
        </Providers>
        </AntdRegistry>
        </ReduxProvider>
        </body>
    </html>
  )
}
