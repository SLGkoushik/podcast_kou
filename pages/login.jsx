import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { user } from '../lib/auth'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword, GoogleAuthProvider , signInWithPopup } from 'firebase/auth'
import Link  from 'next/link'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await signInWithEmailAndPassword(auth , email, password).then((userCredential) => {
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
      <form className='form' onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <br></br>Dont have an account ?
      <Link role="button" className="fancy-button"href="/signup"><button>Sign Up</button></Link>or
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
