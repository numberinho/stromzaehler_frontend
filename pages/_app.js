import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='h-screen bg-base-200'>
      <Component {...pageProps} />
    </div>)

}

export default MyApp
