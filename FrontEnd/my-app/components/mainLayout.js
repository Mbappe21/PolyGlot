import Navbar from "./navbar"

const MainLayout = (props) => {

    return (
      <div>
        <Navbar/>
        <div>
          {props.children}
        </div>
      </div>
    )
}

export default MainLayout