import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='h-full bg-base-200'>
      <Component {...pageProps} />
    </div>)

}

export default MyApp
