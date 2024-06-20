import getSession from '@/lib/session'
import { Button } from '../ui/button'
import Logout from './Logout'
import Link from 'next/link'

const LogoutAndLogin = async () => {
    const session = await getSession()
    return (
        <div>
            {
                session
                    ? <Logout />
                    : <Link href="/login"><Button size="sm">Login</Button></Link>
            }
        </div>
    )
}

export default LogoutAndLogin


