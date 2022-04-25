import { NextPage } from "next";
import Content from './content';
import PersistentDrawerLeft from "./side-drawer";

const Home: NextPage = () => {
  return (
    <>
      <PersistentDrawerLeft>
        <Content/>
      </PersistentDrawerLeft>
    </>
  )
}

export default Home