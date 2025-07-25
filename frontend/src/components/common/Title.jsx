import { useEffect } from 'react'

export default function Title( { title } ) {
    useEffect( () => { document.title = `A R T I S A N A L E | ${title}` }, [ title ] )
    return null;
}
