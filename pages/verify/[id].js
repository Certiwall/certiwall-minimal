import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function VerifyCertificate() {
  const router = useRouter()
  const { id } = router.query
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchCertificate(id)
    }
  }, [id])

  const fetchCertificate = async (certificateId) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/verify/${certificateId}`)
      const data = await response.json()

      if (data.valid) {
        setCertificate(data.certificate)
      } else {
        setError(data.message || 'Certificate not found')
      }
    } catch (error) {
      setError('Unable to verify certificate')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Verifying Certificate - CertiWall</title>
        </Head>
        <div>
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
              <p>Verifying certificate authenticity</p>
            </div>
          </section>

          <main className="main">
            <div className="container">
              <div className="card loading">
                <div className="spinner"></div>
                <p>Verifying certificate...</p>
              </div>
            </div>
          </main>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Certificate Not Found - CertiWall</title>
        </Head>
        <div>
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
              <p>Certificate verification result</p>
            </div>
          </section>

          <main className="main">
            <div className="container">
              <div className="card">
                <div className="alert alert-danger">
                  <h3>❌ Certificate Invalid</h3>
                  <p>{error}</p>
                </div>
                <button onClick={() => router.push('/')} className="btn">
                  Back to Home
                </button>
              </div>
            </div>
          </main>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{`${certificate.recipientName} - Certificate Verified | CertiWall`}</title>
      </Head>

      <div>
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
            <h1>Certificate Verified</h1>
            <p>✅ This certificate is authentic</p>
          </div>
        </section>

        <main className="main">
          <div className="container">
            <div className="card">
              <div className="alert alert-success">
                <h3>✅ Certificate Valid</h3>
                <p>This certificate has been verified as authentic.</p>
              </div>

              <div className="certificate-details">
                <div>
                  <div className="detail-item">
                    <div className="detail-label">Certificate ID</div>
                    <div className="detail-value">{certificate.certificateId}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Recipient Name</div>
                    <div className="detail-value">{certificate.recipientName}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Course/Event</div>
                    <div className="detail-value">{certificate.courseName}</div>
                  </div>
                </div>

                <div>
                  <div className="detail-item">
                    <div className="detail-label">Issue Date</div>
                    <div className="detail-value">
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Issuer</div>
                    <div className="detail-value">{certificate.issuer}</div>
                  </div>
                  
                  {certificate.grade && (
                    <div className="detail-item">
                      <div className="detail-label">Grade</div>
                      <div className="detail-value">{certificate.grade}</div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <button onClick={() => window.print()} className="btn btn-success">
                  🖨️ Print Certificate
                </button>
                <button 
                  onClick={() => router.push('/')} 
                  className="btn" 
                  style={{marginLeft: '1rem'}}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 CertiWall - Made with ❤️</p>
          </div>
        </footer>
      </div>
    </>
  )
}
