import LoginForm from '@/components/LoginForm'
import Navbar from '@/components/NavBar'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  )
}

