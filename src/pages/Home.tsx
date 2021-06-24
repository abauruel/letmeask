import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'




export function Home() {
    const { signInWithGoogle, user } = useAuth()
    const history = useHistory()

    const [roomcode, setRoomCode] = useState("")

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')

    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()
        if (roomcode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomcode}`).get()
        if (!roomRef.exists()) {
            alert('Room does not exists')
            return
        }

        history.push(`/rooms/${roomcode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button 
                    className="create-room"
                     onClick={handleCreateRoom}>
                        <img src={googleImg} alt="Logo do Google" />
                        Crie sua sala com o Google</button>
                    <div className="separator">ou entre na sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            value={roomcode}
                            onChange={event => setRoomCode(event.target.value)}
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}