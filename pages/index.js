import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Home() {
  const [certificateId, setCertificateId] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (certificateId.trim()) {
      router.push(`/verify/${certificateId.trim()}`)
    }
  }

  return (
    <>
      <Head>
        <title>CertiWall - Certificate Verification</title>
        <meta name="description" content="Verify certificates with CertiWall" />
      </Head>

      <nav className="navbar">
        <div className="container">
          <h1>🎓 CertiWall</h1>
          <div>
            <a href="/">Home</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <h1>Certificate Verification</h1>
          <p>Verify the authenticity of certificates</p>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="card">
            <h2>Verify Certificate</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="certificateId">Certificate ID</label>
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID"
                  required
                />
              </div>
              <button type="submit" className="btn">
                Verify Certificate
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 <a style="color:white;" href="https://github.com/certiwall/">CertiWall</a> - Made with ❤️</p>
        </div>
      </footer>
    </>
  )
}
