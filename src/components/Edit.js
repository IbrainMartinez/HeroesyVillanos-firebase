import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc, collection, getDocs, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

const Edit = () => {

  const [products, setProducts] = useState([])

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "superheroes")

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    //console.log(data.docs)
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "superheroes", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "Se borrara el registro completo",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la fcion para eliminar   
        deleteProduct(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  //6 - usamos useEffect
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])

  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [years, setyears] = useState('')
  const [ciudad, setciudad] = useState('')
  const [afiliacion, setafiliacion] = useState('')
  const [descripcion, setdescripcion] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "superheroes", id)
    const data = { description: description, stock: stock, years: years, ciudad: ciudad, afiliacion: afiliacion, descripcion: descripcion }
    await updateDoc(product, data)
    navigate('/')
  }

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "superheroes", id))
    if (product.exists()) {
      //console.log(product.data())
      setDescription(product.data().description)
      setStock(product.data().stock)
      setyears(product.data().years)
      setciudad(product.data().ciudad)
      setafiliacion(product.data().afiliacion)
      setdescripcion(product.data().descripcion)
    } else {
      console.log('El producto no existe')
    }
  }

  useEffect(() => {
    getProductById(id)
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container'>
      <div className='row'>

        <div className='col'>
          <br />
          <h1>Editar Heroe</h1>
          <form onSubmit={update}>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className='form-control'
                required />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Stock</label>
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="text"
                className='form-control'
                required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Edad:</label>
              <input
                value={years}
                onChange={(e) => setyears(e.target.value)}
                type="text"
                className='form-control'
                required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Ciudad:</label>
              <input
                value={ciudad}
                onChange={(e) => setciudad(e.target.value)}
                type="text"
                className='form-control'
                required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Selecciona tu afiliacion:</label>
              <select value={afiliacion} onChange={(e) => setafiliacion(e.target.value)} className='form-select' required>
                <option default>Selecciona</option>
                <option>Marvel</option>
                <option>Dc</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Descripcion:</label>
              <textarea value={descripcion} onChange={(e) => setdescripcion(e.target.value)} className='form-control' required>
              </textarea>
            </div>
            <button type='submit' className='btn btn-primary'>Update</button>
          </form>
        </div>
        <div className="col">
          <br />
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Nombre Real</th>
                <th>Nombre superheroe</th>
                <th>Edad</th>
                <th>Ciudad</th>
                <th>Afilicacion</th>
                <th>Descripcion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-active">
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>{product.years}</td>
                  <td>{product.ciudad}</td>
                  <td>{product.afiliacion}</td>
                  <td>{product.descripcion}</td>
                  <td>
                    {/* <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link> */}
                    <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Edit