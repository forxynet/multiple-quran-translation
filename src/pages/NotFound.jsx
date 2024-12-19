import { NavLink } from 'react-router-dom';

export default function Natfound() {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>Go to the <NavLink to='/'>Home</NavLink></p>
    </div>
  )
}
