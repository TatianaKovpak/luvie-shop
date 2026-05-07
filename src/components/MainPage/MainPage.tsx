import BestSellers from "../BestSellers/BestSellers";
import GiftCardBanner from "../GiftCardBanner/GiftCardBanner";
import Header from "../Header/Header";
import MainSlider from "../MainSlider/MainSlider";
import PromoBanner from "../PromoBanner/PromoBanner";

const MainPage = () => {
    return (
        <>
            <div >
                <MainSlider/>
                <PromoBanner/>
                <BestSellers/>
                <GiftCardBanner/>
            </div>
        </>
    )
}

export default MainPage