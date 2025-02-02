'use client'
import Link from 'next/link';

export default function Dashboard() {
    return (
      <div>
        <main className="form-signin text-center mt-5">
          <h1>BIENVENIDO AL CHATBOT DE EL BANCO DE LOJA</h1>
<hr />
        </main>
        <div className="d-flex justify-content-center mt-5">
          <Link href="/chatbot">
            <button className="btn btn-success">INICIAR CHAT</button>
          </Link>
        </div>
      </div>
    );
  }