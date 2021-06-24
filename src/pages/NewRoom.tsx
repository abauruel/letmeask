import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg' 
import '../styles/auth.scss'



import {Link, useHistory} from 'react-router-dom'


import { Button } from '../components/Button'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'



export function NewRoom(){
 const { user } = useAuth()
 const history = useHistory()
 const [newRoom, setNewRoom] = useState("")

async function handleCreateRoom(event : FormEvent){
    event.preventDefault();

    if(newRoom.trim()===""){
        return;
    }

    const roomRef = database.ref('rooms')
    
    const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)

    }
   

    return(
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                
                       <h2>Criar uma nova sala</h2>
                        <form onSubmit={handleCreateRoom}>
                            <input 
                                type="text" 
                                placeholder="Digite o código da sala"
                                value={newRoom}
                                onChange={event => setNewRoom(event.target.value)}
                                />
                            <Button type='submit'>
                                Criar na sala
                            </Button>
                        </form>
                        <p>Quer entrar em uma sala existente <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}