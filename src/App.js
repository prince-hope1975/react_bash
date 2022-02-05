import "./styles/App.css";
import { Link } from "react-router-dom";
import Header from "./components/Header"
import { Footer } from "./components/footer";
import { Reward } from "./components/rewards";


function App() {
  return (
    <div className="App">
      <Header />
      <main className={` ${styles.main} space-y-6`}>
        <h1 className={`mt-8 text-4xl text-center`}>
          Welcome to <Link href="/new/proposals">Choice Rewards </Link>
        </h1>
        <h2
          className={`text-lg text-center font-mono mt-2 max-w-md ${styles.descriptio}`}
        >
          A way to reward Outstanding members of the DAO
        </h2>
        <p className={styles.description}>
          Fill in info
          <Link href={"/new/reward"}>
            <a
              className={`${styles.code} block rounded mt text-gray-900 bg-gray-100 border-2 hover:text-blue-500 hover:bg-white hover:border-blue-500`}
            >
              Here
            </a>
          </Link>
        </p>
      </main>
      <Rewards />
      <Footer />{" "}
    </div>
  );
}

export default App;
