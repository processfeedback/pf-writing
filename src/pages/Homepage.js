import MyEditorComponent from "../components/MyEditor";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

export const Homepage = () => {
    const localStorageName = "pf_prototype_answer";
    return (
        <div id="home-page" className="flex flex-col w-screen h-screen bg-background no-scrollbar text-primaryText">
            <div id="header" className="h-[8vh] justify-center items-center no-scrollbar">
                <Header />
            </div>
            <div className="h-[82vh] justify-center items-center no-scrollbar">
                <MyEditorComponent localStorageName={localStorageName}/>
            </div>
            <div id="footer" className='h-[10vh] w-full bg-background no-scrollbar'>
                <Footer />
            </div>
        </div>
    )
}
