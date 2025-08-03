import { Container, Logo, LogoutBtn } from "../Index"
import { Link, useNavigate  } from "react-router-dom"
import { useSelector } from "react-redux";

export const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => { return state.auth.status })
    const navItems = [
        { name: 'Home', url: '/', active: true },
        { name: 'Login', url: '/login', active: !authStatus },
        { name: 'Signup', url: '/signup', active: !authStatus },
        { name: 'All Posts', url: '/all-posts', active: authStatus },
        { name: 'Add Post', url: '/add-post', active: authStatus }]
    return (
        <header className="py-3 shadow bg-gray-500 ">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width="w-10" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {
                            navItems.map((item) => (
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={ () => navigate(item.url)}
                                            className="inline-block px-6 py-2 duration-500 hover:bg-blue-100 rounded-full"
                                        >{item.name}</button>
                                    </li>
                                ) : null
                            ))
                        }
                       { (authStatus) && (
                        <li >
                            <LogoutBtn />
                        </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}