import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import { db } from "./firebase";

// Utilidad para obtener una referencia a cualquier colección
const col = (nombre) => collection(db, nombre);

// CREATE
export async function crear(COLL, data) {
    const ref = col(COLL);
    const nuevo = await addDoc(ref, data);
    return { id: nuevo.id };
}

// READ ALL
export async function obtenerTodos(COLL) {
    const ref = col(COLL);
    const snap = await getDocs(ref);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// READ ONE
export async function obtenerUno(COLL, id) {
    const ref = doc(db, COLL, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
}

// UPDATE
export async function actualizar(COLL, id, data) {
    const ref = doc(db, COLL, id);
    await updateDoc(ref, data);
}

// DELETE
export async function eliminar(COLL, id) {
    const ref = doc(db, COLL, id);
    await deleteDoc(ref);
}
