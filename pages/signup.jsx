import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword } from "firebase/auth"
import Link  from 'next/link'


const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSignup = async (event) => {
    event.preventDefault()

    try {
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const uid = userCredential.user.uid;
        router.push('/')
      })
    } catch (error) {
      setError(error.message)
    }
  }
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        router.push('/')
      })
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setError(errorMessage)
    }
  }

  return (
    <div>
      <form className='form' onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">Email</label><br></br>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label><br></br>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button><br></br>Already signed in ?
      <Link role="button" className="fancy-button"href="/login"><button>Log In</button></Link>or
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Signup
