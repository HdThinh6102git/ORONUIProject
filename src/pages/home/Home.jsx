import Posts from "../../components/posts/Posts"
import "./home.scss"
import ShareBox from "../../components/sharebox/ShareBox"
const Home = () => {
  return (
    <div className="home">
        <ShareBox/>
        <Posts/>
      </div>
  )
}

export default Home