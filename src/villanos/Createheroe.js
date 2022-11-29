import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { getpersonas } from './villanos'

const CreateVillanos = () => {
    
    useEffect( () => {
    getpersonadata()
    }, [])
    const [heroe,sethoroe] = useState(null);

    const getpersonadata = async() =>{
        const p = await getpersonas();
        sethoroe(p.docs)
    }

  const [ description, setDescription ] = useState('')
  const [ stock, setStock ] = useState('')
  const [ years, setyears ] = useState('')
  const [ ciudad, setciudad ] = useState('')
  const [ afiliacion, setafiliacion ] = useState('')
  const [ enemigo, setenemigo ] = useState('')
  const [ descripcion, setdescripcion ] = useState('')
  const navigate = useNavigate()

  const productsCollection = collection(db, "villanos")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( productsCollection, { description: description, stock: stock, years: years,ciudad:ciudad,afiliacion:afiliacion,enemigo:enemigo,descripcion:descripcion } )
    navigate('/')
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <br />  
                <h1>Villanos</h1>
                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre Real:</label>
                        <input
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)} 
                            type="text"
                            className='form-control'
                        required/>
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Nombre de villano:</label>
                        <input
                            value={stock}
                            onChange={ (e)=> setStock(e.target.value)} 
                            type="text"
                            className='form-control'
                        required/>                 
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Edad:</label>
                        <input
                            value={years}
                            onChange={ (e)=> setyears(e.target.value)} 
                            type="text"
                            className='form-control'
                        required/>                 
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Ciudad:</label>
                        <input
                            value={ciudad}
                            onChange={ (e)=> setciudad(e.target.value)} 
                            type="text"
                            className='form-control'
                        required/>                 
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Selecciona tu Villano:</label>
                        <select className='form-control' required>
                                <option value={enemigo} onChange={ (e)=> setenemigo(e.target.value)} default>Selecciona</option>
                                {
                                heroe && heroe.map(p => <option>{p.data().stock}</option>)
                            }  
                        </select>          
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Selecciona tu afiliacion:</label>
                        <select value={afiliacion} onChange={ (e)=> setafiliacion(e.target.value)} className='form-control' required>
                            <option default>Selecciona</option>
                            <option>Marvel</option>
                            <option>Dc</option>
                        </select>          
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Descripcion:</label>
                        <textarea value={descripcion} onChange={ (e)=> setdescripcion(e.target.value)} className='form-control' required>
                        </textarea>          
                    </div> 
                    <button type='submit' className='btn btn-success'>AGREGAR</button>
                    <br /><br />
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default CreateVillanos