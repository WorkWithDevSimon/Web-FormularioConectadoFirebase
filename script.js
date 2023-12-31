import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2JQoMuxqk7DWskNOrp0Da5Nf9JiKbUwo",
    authDomain: "formulario-f361c.firebaseapp.com",
    databaseURL: "https://formulario-f361c-default-rtdb.firebaseio.com",
    projectId: "formulario-f361c",
    storageBucket: "formulario-f361c.appspot.com",
    messagingSenderId: "968157130571",
    appId: "1:968157130571:web:0985c358685c1cb99002ce",
    measurementId: "G-1ZTDRZ55WE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
    // Validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() == '') {
        errorNombre.textContent = 'Por favor, ingrese un nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }
    // Validar correo electrónico
    let emailEntrada = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(emailEntrada.value)) {
        errorEmail.textContent = 'Por favor, ingrese un email válido';
        errorEmail.classList.add('error-message');
    } else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }

    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    if (contrasenaEntrada.value.length < 8) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }


    // Si todos los campos son válidos, enviar formulario
    if (!errorNombre.textContent && !errorEmail.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        // Backend que reciba la información
        alert("El formulario se ha enviado con éxito");

        // Esto lo que hace es limpiar las cajas de los input de los formularios
        // Si se cumple obviamente
        document.getElementById('formulario').reset();
    }
});
