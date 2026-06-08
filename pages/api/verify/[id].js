import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'Certificate ID is required' })
  }

  try {
    const client = await clientPromise
    const db = client.db('certiwall')

    const certificate = await db.collection('certificates').findOne({
      certificateId: id,
    })

    if (!certificate) {
      return res.status(404).json({
        message: 'Certificate not found',
        valid: false,
      })
    }

    const { _id, ...certificateData } = certificate

    return res.status(200).json({
      valid: true,
      certificate: certificateData,
    })
  } catch (error) {
    console.error('Database error:', error)

    return res.status(500).json({
      message: 'Server error',
      valid: false,
    })
  }
}
