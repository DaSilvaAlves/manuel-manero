import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8 text-slate-300">Página não encontrada</p>
        <Link
          href="/"
          className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-slate-900 hover:bg-yellow-300 transition"
        >
          Voltar à Home
        </Link>
      </div>
    </div>
  )
}
