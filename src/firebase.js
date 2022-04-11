import db from './config'
import { collection, getDocs, query, where, orderBy, limit, startAt, doc, getDoc } from "firebase/firestore"; 

async function getQuery(collectionName, filters = {}) {
    let q = query(collection(db, collectionName));
    for (let key in filters) {
        if (Array.isArray(filters[key])) {
            q = query(q, where(key, filters[key][0], filters[key][1]))
        } else {
            q = query(q, where(key, '==', filters[key]))
        }
    }
    return q
}

export async function getList(type, community, tag, order="bulletinMeta.popularity", limitNo, startNo=0) {
    let q = query(collection(db, "articles"), where("community", "==", community), where("bulletinMeta.type", "==", type))
    if (tag) q = query(q, where('tags', 'array-contains', tag))
    if (order == 'bulletinMeta.date') {
        q = query(q, orderBy(order, "asc"), limit(limitNo))
        // q = query(q, orderBy(order, "asc"), limit(limitNo), startAt(startNo))
    } else {
        q = query(q, orderBy(order, "desc"), limit(limitNo))
        // q = query(q, orderBy(order, "desc"), limit(limitNo), startAt(startNo))
    }
    return getDocs(q)
}

export async function getItem(collection, id) {
    const docRef = doc(db, collection, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}


