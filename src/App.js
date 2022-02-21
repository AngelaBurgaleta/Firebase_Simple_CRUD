import React, { useEffect, useState } from "react";
import "./App.css";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
//import { db } from "./firebase-config";
//https://www.youtube.com/watch?v=jCY6DH8F4oc

import {db} from "./firebase/firebaseConfig"

function App() {
  //inicializamos la coleccion con un array vacio
  const [users, setUsers] = useState([]);

  //referencia a la colección de la que queremos leer
  const usersCollectionRef = collection(db, "usuarios");

  //nuevo nombre yedad de usuario
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  //crear un nuevo usuario
  const createUser = async () => {
    await addDoc(usersCollectionRef, { nombre: newName, edad: Number(newAge) });
  };

  //editar un usuario
  const updateUser = async (id, edad, nombre) => {
    //instancia del Doc
    const userDoc = doc(db, "usuarios", id);

    //nuevos campos que vamos a actualizar
    const newFields = { nombre, edad: edad + 1 };

    //especificamos el documento espicifico que queremos modificar NO toda la coleccion
    await updateDoc(userDoc, newFields);
  };

  //DELETE
  const deleteUser = async (id) => {
    const userDoc = doc(db, "usuarios", id);

    await deleteDoc(userDoc);
  };

  //READ
  //para que nos aparezca la colección cuando renderice la pagina
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  //creación del nuevo nombre cuando le damos al botón
  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  //creación de la nueva edad cuando le damos al botón
  const handleChangeAge = (event) => {
    setNewAge(event.target.value);
  };

  return (
    <div className="App">
      <input placeholder="Name..." onChange={handleChangeName} />
      <input type="number" placeholder="Age..." onChange={handleChangeAge} />

      <button onClick={createUser}>Create User</button>
      {users.map((usuario) => {
        return (
          <>
            <div>
              <h1>Name: {usuario.nombre}</h1>
            </div>
            <div>
              <h1>Age: {usuario.edad}</h1>
            </div>
            <button onClick={() => updateUser(usuario.id, usuario.edad, usuario.nombre)}>
              Update User
            </button>
            <button onClick={() => deleteUser(usuario.id)}> Delete User </button>
          </>
        );
      })}
    </div>
  );
}

export default App;
