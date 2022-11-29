import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Create from './Create'
import { async } from '@firebase/util'
import plantilla from '../plantilla'

const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configuramos los hooks
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
  //7 - devolvemos vista de nuestro componente
  return (
    <>
    <plantilla/>
      <div className='container'>

        <div className='row'>
          <div className='col'>
            <Create getProducts={getProducts()} />
          </div>
          <div className='col'>
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
                      <Link to={`/edit/${product.id}`} className="btn btn-light">Editar</Link>
                      <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show