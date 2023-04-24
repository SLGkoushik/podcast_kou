import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPodcast } from '@fortawesome/free-solid-svg-icons'
// import { user } from '../lib/auth'
export default function NavBar() {
    return (
        <div className='navbar'>
            <FontAwesomeIcon href='/' icon={faPodcast} />
            <title>Podcasts</title>
        </div>
    )
}
